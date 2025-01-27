import { describe, it, expect, beforeEach } from 'vitest'
import { z } from 'zod'
import { BaseRepository, Entity, NotFoundError, ValidationError, SlugGenerationError } from './base'

// Test entity schema
const testSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string().min(1),
  value: z.number().min(0)
})

// Test entity type
type TestEntity = z.infer<typeof testSchema> & Entity

// Test repository implementation
class TestRepository extends BaseRepository<TestEntity, typeof testSchema> {
  private items: TestEntity[]

  constructor() {
    super(testSchema, 'Test')
    // Initialize with test data
    this.items = [
      {
        id: crypto.randomUUID(),
        slug: 'test-1',
        name: 'Test 1',
        value: 42,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ]
  }

  protected async getData(): Promise<TestEntity[]> {
    return this.items
  }

  protected async setData(data: TestEntity[]): Promise<void> {
    this.items = data
  }

  public generateSlug(data: Partial<TestEntity>): string {
    if (!data.name) throw new SlugGenerationError('Name is required to generate slug')
    return data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }

  // Helper for tests
  getDefaultId(): string {
    return this.items[0]?.id ?? ''
  }
}

describe('BaseRepository', () => {
  let repo: TestRepository
  let defaultId: string

  beforeEach(() => {
    repo = new TestRepository()
    defaultId = repo.getDefaultId()
  })

  describe('findById', () => {
    it('should return an entity by id', async () => {
      const entity = await repo.findById(defaultId)
      expect(entity.name).toBe('Test 1')
      expect(entity.value).toBe(42)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.findById('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should return an entity by slug', async () => {
      const entity = await repo.findBySlug('test-1')
      expect(entity.name).toBe('Test 1')
      expect(entity.value).toBe(42)
    })

    it('should throw NotFoundError for non-existent slug', async () => {
      await expect(repo.findBySlug('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all entities', async () => {
      const entities = await repo.findAll()
      expect(entities).toHaveLength(1)
      expect(entities[0]?.name).toBe('Test 1')
    })

    it('should return empty array when no entities exist', async () => {
      await repo.delete(defaultId)
      const entities = await repo.findAll()
      expect(entities).toHaveLength(0)
    })
  })

  describe('create', () => {
    it('should create a new entity', async () => {
      const newEntity = {
        name: 'Test 2',
        value: 100
      }

      const created = await repo.create(newEntity)
      expect(created.name).toBe('Test 2')
      expect(created.value).toBe(100)
      expect(created.slug).toBe('test-2')
      expect(created.id).toBeDefined()
      expect(created.createdAt).toBeInstanceOf(Date)
      expect(created.updatedAt).toBeInstanceOf(Date)

      // Verify it was actually saved
      const found = await repo.findById(created.id)
      expect(found).toEqual(created)
    })

    it('should throw ValidationError for invalid data', async () => {
      const invalidEntity = {
        name: 'Test 2',
        value: -1 // Invalid: negative value
      }

      await expect(repo.create(invalidEntity)).rejects.toThrow(ValidationError)
    })

    it('should throw SlugGenerationError if slug generation fails', async () => {
      const invalidEntity = {
        value: 100 // Missing name for slug generation
      }

      // @ts-expect-error Testing invalid input
      await expect(repo.create(invalidEntity)).rejects.toThrow(SlugGenerationError)
    })
  })

  describe('update', () => {
    it('should update an existing entity', async () => {
      const updates = {
        name: 'Updated Test',
        value: 200
      }

      const updated = await repo.update(defaultId, updates)
      expect(updated.name).toBe('Updated Test')
      expect(updated.value).toBe(200)
      expect(updated.updatedAt).toBeInstanceOf(Date)
      expect(updated.updatedAt.getTime()).toBeGreaterThan(updated.createdAt.getTime())

      // Verify it was actually saved
      const found = await repo.findById(defaultId)
      expect(found).toEqual(updated)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.update('999', { name: 'New Name' })).rejects.toThrow(NotFoundError)
    })

    it('should throw ValidationError for invalid updates', async () => {
      const invalidUpdates = {
        value: -1 // Invalid: negative value
      }

      await expect(repo.update(defaultId, invalidUpdates)).rejects.toThrow(ValidationError)
    })

    it('should only update specified fields', async () => {
      const original = await repo.findById(defaultId)
      const updates = { value: 200 }

      const updated = await repo.update(defaultId, updates)
      expect(updated.value).toBe(200)
      expect(updated.name).toBe(original.name)
      expect(updated.slug).toBe(original.slug)
    })
  })

  describe('delete', () => {
    it('should delete an existing entity', async () => {
      await repo.delete(defaultId)
      await expect(repo.findById(defaultId)).rejects.toThrow(NotFoundError)

      // Verify it was actually deleted from the list
      const all = await repo.findAll()
      expect(all).toHaveLength(0)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.delete('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('error handling', () => {
    it('should include entity name in NotFoundError message', async () => {
      let error: unknown
      try {
        await repo.findById('999')
        expect.fail('Expected error to be thrown')
      } catch (e) {
        error = e
      }
      expect(error).toBeInstanceOf(NotFoundError)
      expect((error as NotFoundError).message).toContain('Test')
      expect((error as NotFoundError).message).toContain('999')
    })

    it('should include validation details in ValidationError message', async () => {
      const invalidData = { name: 'Test', value: -1 }
      let error: unknown
      try {
        await repo.create(invalidData)
        expect.fail('Should have thrown error')
      } catch (e) {
        error = e
      }
      expect(error).toBeInstanceOf(ValidationError)
      expect((error as ValidationError).message).toContain('Invalid')
      expect((error as ValidationError).code).toBe('VALIDATION_ERROR')
    })

    it('should include slug generation details in SlugGenerationError message', async () => {
      let error: unknown
      try {
        // @ts-expect-error Testing invalid input
        await repo.create({ value: 100 })
        expect.fail('Expected error to be thrown')
      } catch (e) {
        error = e
      }
      expect(error).toBeInstanceOf(SlugGenerationError)
      expect((error as SlugGenerationError).message).toContain('Name is required')
      expect((error as SlugGenerationError).code).toBe('SLUG_GENERATION_ERROR')
    })
  })
}) 