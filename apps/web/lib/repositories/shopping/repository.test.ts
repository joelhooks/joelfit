import { describe, it, expect, beforeEach } from 'vitest'
import { ShoppingRepository } from './repository'
import { type ShoppingList } from './schema'
import { NotFoundError, ValidationError } from '../base'

describe('ShoppingRepository', () => {
  let repo: ShoppingRepository

  beforeEach(() => {
    repo = new ShoppingRepository()
  })

  describe('findById', () => {
    it('should return a shopping list by id', async () => {
      const list = await repo.getShoppingList()
      const found = await repo.findById(list.id)
      expect(found).toBeDefined()
      expect(found.id).toBe(list.id)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.findById('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should return a shopping list by slug', async () => {
      const list = await repo.getShoppingList()
      const foundList = await repo.findBySlug(list.slug)
      expect(foundList).toBeDefined()
      expect(foundList.id).toBe(list.id)
    })

    it('should throw NotFoundError for non-existent slug', async () => {
      await expect(repo.findBySlug('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all shopping lists', async () => {
      const lists = await repo.findAll()
      expect(lists).toBeInstanceOf(Array)
      expect(lists.length).toBeGreaterThan(0)
    })
  })

  describe('create', () => {
    it('should create a new shopping list', async () => {
      const newList = {
        name: 'Test Shopping List',
        weeklyItems: {
          meat: [],
          dairy: [],
          produce: [],
          frozen: [],
          bulk: []
        },
        pantryStaples: {
          oils: [],
          seasonings: [],
          sauces: [],
          dryGoods: []
        },
        tips: {
          buying: [],
          storage: []
        }
      }

      const created = await repo.create(newList)
      expect(created).toBeDefined()
      expect(created.name).toBe(newList.name)
      expect(created.id).toBeDefined()
      expect(created.slug).toBeDefined()
      expect(created.createdAt).toBeDefined()
      expect(created.updatedAt).toBeDefined()
    })

    it('should throw ValidationError for invalid data', async () => {
      const invalidList = {
        name: 'Invalid List',
        weeklyItems: {
          meat: [''],
          dairy: [],
          produce: [],
          frozen: [],
          bulk: []
        },
        pantryStaples: {
          oils: [],
          seasonings: [],
          sauces: [],
          dryGoods: []
        },
        tips: {
          buying: [],
          storage: []
        }
      }
      await expect(repo.create(invalidList)).rejects.toThrow(ValidationError)
    })
  })

  describe('update', () => {
    it('should update an existing shopping list', async () => {
      const list = await repo.getShoppingList()
      const update = {
        name: 'Updated Shopping List'
      }

      const updated = await repo.update(list.id, update)
      expect(updated).toBeDefined()
      expect(updated.name).toBe(update.name)
      expect(updated.id).toBe(list.id)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(
        repo.update('non-existent', { name: 'Updated' })
      ).rejects.toThrow(NotFoundError)
    })
  })

  describe('delete', () => {
    it('should delete an existing shopping list', async () => {
      const newList = await repo.create({
        name: 'To Be Deleted',
        weeklyItems: {
          meat: [],
          dairy: [],
          produce: [],
          frozen: [],
          bulk: []
        },
        pantryStaples: {
          oils: [],
          seasonings: [],
          sauces: [],
          dryGoods: []
        },
        tips: {
          buying: [],
          storage: []
        }
      })

      await repo.delete(newList.id)
      await expect(repo.findById(newList.id)).rejects.toThrow(NotFoundError)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.delete('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('getShoppingList', () => {
    it('should return the default shopping list', async () => {
      const list = await repo.getShoppingList()
      expect(list).toBeDefined()
      expect(list.id).toBeDefined()
      expect(list.name).toBeDefined()
    })
  })
}) 