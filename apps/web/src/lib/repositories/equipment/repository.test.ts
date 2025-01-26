import { describe, it, expect, beforeEach } from 'vitest'
import { EquipmentRepository } from './repository'
import { type EquipmentCategory } from './schema'
import { NotFoundError, ValidationError, SlugGenerationError } from '../base'

describe('EquipmentRepository', () => {
  let repo: EquipmentRepository

  beforeEach(() => {
    repo = new EquipmentRepository()
  })

  const validEquipment = {
    title: 'Test Container',
    description: 'A test container for meal prep',
    link: 'https://example.com/container',
    price: 29.99,
    category: 'storage' as EquipmentCategory,
    required: true,
    maintenance: 'Clean after each use'
  }

  describe('create', () => {
    it('should create new equipment', async () => {
      await repo.create(validEquipment)
      const equipment = await repo.findAll()
      expect(equipment[0]?.title).toBe('Test Container')
      expect(equipment[0]?.slug).toBe('test-container')
      expect(equipment[0]?.id).toBeDefined()
      expect(equipment[0]?.createdAt).toBeInstanceOf(Date)
      expect(equipment[0]?.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw SlugGenerationError if title is missing', async () => {
      const invalidEquipment = { ...validEquipment, title: undefined }
      // @ts-expect-error Testing invalid input
      await expect(repo.create(invalidEquipment)).rejects.toThrow(SlugGenerationError)
    })

    it('should throw ValidationError if data is invalid', async () => {
      const invalidEquipment = {
        ...validEquipment,
        price: -1 // Invalid: negative price
      }

      await expect(repo.create(invalidEquipment)).rejects.toThrow(ValidationError)
    })
  })

  describe('findById', () => {
    it('should find equipment by id', async () => {
      await repo.create(validEquipment)
      const equipment = await repo.findAll()
      const found = await repo.findById(equipment[0]!.id)
      expect(found.title).toBe('Test Container')
    })

    it('should throw NotFoundError if equipment not found', async () => {
      await expect(repo.findById('non-existent-id')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should find equipment by slug', async () => {
      await repo.create(validEquipment)
      const found = await repo.findBySlug('test-container')
      expect(found.title).toBe('Test Container')
    })

    it('should throw NotFoundError if equipment not found', async () => {
      await expect(repo.findBySlug('non-existent-slug')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all equipment', async () => {
      await repo.create(validEquipment)
      const equipment = await repo.findAll()
      expect(equipment.length).toBeGreaterThan(0)
      expect(equipment[0]?.title).toBeDefined()
    })
  })

  describe('update', () => {
    it('should update existing equipment', async () => {
      const created = await repo.create(validEquipment)
      const updates = {
        title: 'Updated Container',
        price: 39.99
      }

      const updated = await repo.update(created.id, updates)
      expect(updated.title).toBe('Updated Container')
      expect(updated.price).toBe(39.99)
      expect(updated.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw NotFoundError if equipment not found', async () => {
      await expect(
        repo.update('non-existent-id', { title: 'New Title' })
      ).rejects.toThrow(NotFoundError)
    })

    it('should throw ValidationError if update data is invalid', async () => {
      const created = await repo.create(validEquipment)
      const invalidUpdates = {
        price: -1 // Invalid: negative price
      }

      await expect(repo.update(created.id, invalidUpdates)).rejects.toThrow(ValidationError)
    })
  })

  describe('delete', () => {
    it('should delete existing equipment', async () => {
      const created = await repo.create(validEquipment)
      await repo.delete(created.id)
      await expect(repo.findById(created.id)).rejects.toThrow(NotFoundError)
    })

    it('should throw NotFoundError if equipment not found', async () => {
      await expect(repo.delete('non-existent-id')).rejects.toThrow(NotFoundError)
    })
  })

  describe('getByCategory', () => {
    it('should return equipment by category', async () => {
      await repo.create(validEquipment)
      const equipment = await repo.getByCategory('storage')
      expect(equipment.length).toBeGreaterThan(0)
      expect(equipment[0]?.category).toBe('storage')
    })
  })

  describe('getRequired', () => {
    it('should return required equipment', async () => {
      await repo.create(validEquipment)
      const equipment = await repo.getRequired()
      expect(equipment.length).toBeGreaterThan(0)
      expect(equipment[0]?.required).toBe(true)
    })
  })

  describe('getWithMaintenance', () => {
    it('should return equipment with maintenance', async () => {
      await repo.create(validEquipment)
      const equipment = await repo.getWithMaintenance()
      expect(equipment.length).toBeGreaterThan(0)
      expect(equipment[0]?.maintenance).toBeDefined()
    })
  })

  describe('getStorageGuide', () => {
    it('should return storage guide', () => {
      const guide = repo.getStorageGuide()
      expect(guide.containers).toBeDefined()
      expect(guide.bags).toBeDefined()
    })
  })

  describe('getMaintenanceSchedule', () => {
    it('should return maintenance schedule', () => {
      const schedule = repo.getMaintenanceSchedule()
      expect(schedule.daily).toBeDefined()
      expect(schedule.weekly).toBeDefined()
      expect(schedule.monthly).toBeDefined()
      expect(schedule.quarterly).toBeDefined()
      expect(schedule.yearly).toBeDefined()
    })
  })
}) 