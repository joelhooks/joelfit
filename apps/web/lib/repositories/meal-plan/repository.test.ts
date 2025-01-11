import { describe, it, expect, beforeEach } from 'vitest'
import { MealPlanRepository } from './repository'
import { MealPlan } from './schema'
import { NotFoundError, SlugGenerationError, ValidationError, Entity } from '../base'

const newMealPlan: Omit<MealPlan, keyof Entity> = {
  name: 'Test Meal Plan',
  totalCalories: 2000,
  timeline: [
    {
      time: '8:00 AM',
      slot: 'Breakfast',
      meal: 'Test Breakfast',
      calories: 400,
      protein: 30,
      carbs: 45,
      fat: 12,
      container: 'Mason Jar'
    }
  ],
  structure: {
    breakfast: [
      { name: 'Test Item', amount: '1 cup', container: 'Mason Jar' }
    ],
    lunch: [],
    midDayMeal: [],
    dinner: [],
    nightSnack: []
  },
  emergencyBackup: ['Test Backup']
}

describe('MealPlanRepository', () => {
  let repo: MealPlanRepository
  let defaultMealPlanId: string

  beforeEach(() => {
    repo = new MealPlanRepository()
    defaultMealPlanId = repo.getDefaultMealPlanId()
  })

  describe('findById', () => {
    it('should find meal plan by id', async () => {
      const mealPlan = await repo.findById(defaultMealPlanId)
      expect(mealPlan).toBeDefined()
      expect(mealPlan?.name).toBe('Joel\'s Meal Plan')
    })

    it('should throw NotFoundError if meal plan not found', async () => {
      await expect(repo.findById('invalid-id')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should find meal plan by slug', async () => {
      const mealPlan = await repo.findBySlug('joel')
      expect(mealPlan).toBeDefined()
      expect(mealPlan?.name).toBe('Joel\'s Meal Plan')
    })

    it('should throw NotFoundError if meal plan not found', async () => {
      await expect(repo.findBySlug('invalid-slug')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all meal plans', async () => {
      const mealPlans = await repo.findAll()
      expect(mealPlans).toHaveLength(1)
      expect(mealPlans[0]?.name).toBe('Joel\'s Meal Plan')
    })
  })

  describe('create', () => {
    it('should create a new meal plan', async () => {
      const created = await repo.create(newMealPlan)
      expect(created).toBeDefined()
      expect(created.name).toBe('Test Meal Plan')
      expect(created.slug).toBe('test-meal-plan')
      expect(created.id).toBeDefined()
      expect(created.createdAt).toBeDefined()
      expect(created.updatedAt).toBeDefined()
    })

    it('should throw SlugGenerationError if name is missing', async () => {
      const invalidMealPlan = { ...newMealPlan, name: '' }
      await expect(repo.create(invalidMealPlan)).rejects.toThrow(SlugGenerationError)
    })

    it('should throw ValidationError if data is invalid', async () => {
      const invalidMealPlan = { ...newMealPlan, totalCalories: -1 }
      await expect(repo.create(invalidMealPlan)).rejects.toThrow(ValidationError)
    })
  })

  describe('update', () => {
    it('should update an existing meal plan', async () => {
      const updates = {
        name: 'Updated Meal Plan',
        totalCalories: 2200
      }

      const updated = await repo.update(defaultMealPlanId, updates)
      expect(updated.name).toBe('Updated Meal Plan')
      expect(updated.totalCalories).toBe(2200)
      expect(updated.updatedAt).toBeDefined()
    })

    it('should throw NotFoundError if meal plan not found', async () => {
      await expect(repo.update('invalid-id', { name: 'Test' })).rejects.toThrow(NotFoundError)
    })

    it('should throw ValidationError if updates are invalid', async () => {
      const invalidUpdates = { totalCalories: -1 }
      await expect(repo.update(defaultMealPlanId, invalidUpdates)).rejects.toThrow(ValidationError)
    })
  })

  describe('delete', () => {
    it('should delete an existing meal plan', async () => {
      await repo.delete(defaultMealPlanId)
      await expect(repo.findById(defaultMealPlanId)).rejects.toThrow(NotFoundError)
    })

    it('should throw NotFoundError if meal plan not found', async () => {
      await expect(repo.delete('invalid-id')).rejects.toThrow(NotFoundError)
    })
  })

  describe('generateSlug', () => {
    it('should generate a valid slug from name', async () => {
      const mealPlan = await repo.create({
        ...newMealPlan,
        name: 'Test & Special Characters!'
      })
      expect(mealPlan.slug).toBe('test-special-characters')
    })

    it('should throw SlugGenerationError if name is missing', async () => {
      const invalidMealPlan = { ...newMealPlan, name: '' }
      await expect(repo.create(invalidMealPlan)).rejects.toThrow(SlugGenerationError)
    })
  })
}) 