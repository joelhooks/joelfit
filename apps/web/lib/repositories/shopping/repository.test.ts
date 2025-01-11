import { describe, it, expect, beforeEach } from 'vitest'
import { ShoppingRepository } from './repository'
import { type ShoppingList, type Unit, type Category } from './schema'
import { NotFoundError, ValidationError } from '../base'

describe('ShoppingRepository', () => {
  let repo: ShoppingRepository

  beforeEach(() => {
    repo = new ShoppingRepository()
  })

  const validShoppingList = {
    name: 'Weekly Groceries',
    items: [
      {
        name: 'Chicken Breast',
        quantity: 2,
        unit: 'lb' as Unit,
        category: 'protein' as Category,
        purchased: false
      },
      {
        name: 'Broccoli',
        quantity: 1,
        unit: 'kg' as Unit,
        category: 'produce' as Category,
        purchased: false
      }
    ],
    startDate: new Date().toISOString(),
    completed: false
  }

  describe('create', () => {
    it('should create a new shopping list', async () => {
      const created = await repo.create(validShoppingList)
      expect(created.name).toBe('Weekly Groceries')
      expect(created.slug).toBe('weekly-groceries')
      expect(created.items).toHaveLength(2)
      expect(created.id).toBeDefined()
      expect(created.createdAt).toBeInstanceOf(Date)
      expect(created.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw ValidationError for invalid data', async () => {
      const invalidList = {
        ...validShoppingList,
        items: [
          {
            name: 'Invalid Item',
            quantity: -1, // Invalid: negative quantity
            unit: 'lb' as Unit,
            category: 'protein' as Category,
            purchased: false
          }
        ]
      }

      await expect(repo.create(invalidList)).rejects.toThrow(ValidationError)
    })
  })

  describe('markItemPurchased', () => {
    it('should mark an item as purchased', async () => {
      const list = await repo.create(validShoppingList)
      const updated = await repo.markItemPurchased(list.id, 'Chicken Breast')
      
      const purchasedItem = updated.items.find(i => i.name === 'Chicken Breast')
      expect(purchasedItem?.purchased).toBe(true)
    })

    it('should throw NotFoundError for non-existent list', async () => {
      await expect(
        repo.markItemPurchased('999', 'Chicken Breast')
      ).rejects.toThrow(NotFoundError)
    })
  })

  describe('markListCompleted', () => {
    it('should mark a list as completed', async () => {
      const list = await repo.create(validShoppingList)
      const updated = await repo.markListCompleted(list.id)
      
      expect(updated.completed).toBe(true)
      expect(updated.endDate).toBeDefined()
    })

    it('should throw NotFoundError for non-existent list', async () => {
      await expect(
        repo.markListCompleted('999')
      ).rejects.toThrow(NotFoundError)
    })
  })

  describe('findById', () => {
    it('should return a shopping list by id', async () => {
      const created = await repo.create(validShoppingList)
      const found = await repo.findById(created.id)
      expect(found.name).toBe('Weekly Groceries')
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.findById('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should return a shopping list by slug', async () => {
      const created = await repo.create(validShoppingList)
      const found = await repo.findBySlug('weekly-groceries')
      expect(found.name).toBe('Weekly Groceries')
    })

    it('should throw NotFoundError for non-existent slug', async () => {
      await expect(repo.findBySlug('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all shopping lists', async () => {
      await repo.create(validShoppingList)
      const lists = await repo.findAll()
      expect(lists).toHaveLength(1)
      expect(lists[0]?.name).toBe('Weekly Groceries')
    })
  })

  describe('update', () => {
    it('should update an existing shopping list', async () => {
      const created = await repo.create(validShoppingList)
      const updates = {
        name: 'Updated List',
        items: [
          {
            name: 'New Item',
            quantity: 1,
            unit: 'piece' as Unit,
            category: 'other' as Category,
            purchased: false
          }
        ]
      }

      const updated = await repo.update(created.id, updates)
      expect(updated.name).toBe('Updated List')
      expect(updated.items).toHaveLength(1)
      expect(updated.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(
        repo.update('999', { name: 'New Name' })
      ).rejects.toThrow(NotFoundError)
    })
  })

  describe('delete', () => {
    it('should delete an existing shopping list', async () => {
      const created = await repo.create(validShoppingList)
      await repo.delete(created.id)
      await expect(repo.findById(created.id)).rejects.toThrow(NotFoundError)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.delete('999')).rejects.toThrow(NotFoundError)
    })
  })
}) 