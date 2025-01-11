import { describe, it, expect, beforeEach } from 'vitest'
import { EquipmentRepository } from './repository'
import { Equipment, EquipmentCategory } from './schema'
import { Entity, NotFoundError, SlugGenerationError, ValidationError } from '../base'

describe('EquipmentRepository', () => {
  let repo: EquipmentRepository
  let defaultEquipmentId: string

  // Complete test equipment with all required properties
  const testEquipment: Omit<Equipment, keyof Entity> = {
    title: 'Test Equipment',
    description: 'A test piece of equipment',
    link: 'https://example.com',
    price: 99.99,
    category: 'storage' as EquipmentCategory,
    required: true,
    maintenance: 'Clean after each use'
  }

  // Equipment without title for testing slug generation error
  const equipmentWithoutTitle = {
    description: testEquipment.description,
    link: testEquipment.link,
    price: testEquipment.price,
    category: testEquipment.category,
    required: testEquipment.required,
    maintenance: testEquipment.maintenance
  }

  // Updates with only changed properties
  const updates: Partial<Omit<Equipment, keyof Entity>> = {
    title: 'Updated Equipment',
    price: 149.99
  }

  beforeEach(() => {
    repo = new EquipmentRepository()
    defaultEquipmentId = repo.getDefaultEquipmentId()
  })

  describe('findById', () => {
    it('should find equipment by id', async () => {
      const equipment = await repo.findById(defaultEquipmentId)
      expect(equipment.id).toBe(defaultEquipmentId)
    })

    it('should throw NotFoundError if equipment not found', async () => {
      await expect(repo.findById('not-found')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should find equipment by slug', async () => {
      const equipment = await repo.findById(defaultEquipmentId)
      const found = await repo.findBySlug(equipment.slug)
      expect(found.id).toBe(equipment.id)
    })

    it('should throw NotFoundError if equipment not found', async () => {
      await expect(repo.findBySlug('not-found')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all equipment', async () => {
      const equipment = await repo.findAll()
      expect(equipment.length).toBeGreaterThan(0)
    })
  })

  describe('create', () => {
    it('should create new equipment', async () => {
      const created = await repo.create(testEquipment)
      expect(created.title).toBe(testEquipment.title)
      expect(created.slug).toBe('test-equipment')
    })

    it('should throw SlugGenerationError if title is missing', async () => {
      await expect(repo.create(equipmentWithoutTitle as any)).rejects.toThrow(SlugGenerationError)
    })

    it('should throw ValidationError if data is invalid', async () => {
      const invalidEquipment = { ...testEquipment, price: -1 }
      await expect(repo.create(invalidEquipment)).rejects.toThrow(ValidationError)
    })
  })

  describe('update', () => {
    it('should update existing equipment', async () => {
      const updated = await repo.update(defaultEquipmentId, updates)
      expect(updated.title).toBe(updates.title)
      expect(updated.price).toBe(updates.price)
    })

    it('should throw NotFoundError if equipment not found', async () => {
      await expect(repo.update('not-found', updates)).rejects.toThrow(NotFoundError)
    })

    it('should throw ValidationError if update data is invalid', async () => {
      const invalidUpdates = { price: -1 }
      await expect(repo.update(defaultEquipmentId, invalidUpdates)).rejects.toThrow(ValidationError)
    })
  })

  describe('delete', () => {
    it('should delete existing equipment', async () => {
      await repo.delete(defaultEquipmentId)
      await expect(repo.findById(defaultEquipmentId)).rejects.toThrow(NotFoundError)
    })

    it('should throw NotFoundError if equipment not found', async () => {
      await expect(repo.delete('not-found')).rejects.toThrow(NotFoundError)
    })
  })

  describe('getByCategory', () => {
    it('should return equipment by category', async () => {
      const equipment = await repo.getByCategory('storage')
      expect(equipment.length).toBeGreaterThan(0)
      equipment.forEach(item => expect(item.category).toBe('storage'))
    })
  })

  describe('getRequired', () => {
    it('should return required equipment', async () => {
      const equipment = await repo.getRequired()
      expect(equipment.length).toBeGreaterThan(0)
      equipment.forEach(item => expect(item.required).toBe(true))
    })
  })

  describe('getWithMaintenance', () => {
    it('should return equipment with maintenance', async () => {
      const equipment = await repo.getWithMaintenance()
      expect(equipment.length).toBeGreaterThan(0)
      equipment.forEach(item => expect(item.maintenance).toBeTruthy())
    })
  })
}) 