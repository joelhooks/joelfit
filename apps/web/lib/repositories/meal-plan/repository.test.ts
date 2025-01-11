import { describe, it, expect, beforeEach } from 'vitest'
import { MealPlanRepository } from './repository'
import { type MealPlan } from './schema'
import { NotFoundError, ValidationError } from '../base'

describe('MealPlanRepository', () => {
  let repo: MealPlanRepository

  beforeEach(() => {
    repo = new MealPlanRepository()
  })

  describe('findById', () => {
    it('should return meal plan by id', async () => {
      const mealPlans = await repo.findAll()
      expect(mealPlans[0]).toBeDefined()
      const mealPlan = await repo.findById(mealPlans[0]!.id)
      expect(mealPlan.name).toBe("Joel's Meal Plan")
      expect(mealPlan.calories).toBe(2400)
      expect(mealPlan.timeline).toHaveLength(5)
      expect(mealPlan.mealStructure.breakfast.items).toHaveLength(4)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.findById('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should return meal plan by slug', async () => {
      const mealPlan = await repo.findBySlug('joels-meal-plan')
      expect(mealPlan.name).toBe("Joel's Meal Plan")
      expect(mealPlan.calories).toBe(2400)
      expect(mealPlan.timeline).toHaveLength(5)
      expect(mealPlan.mealStructure.breakfast.items).toHaveLength(4)
    })

    it('should throw NotFoundError for non-existent slug', async () => {
      await expect(repo.findBySlug('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all meal plans', async () => {
      const mealPlans = await repo.findAll()
      expect(mealPlans).toHaveLength(1)
      expect(mealPlans[0]?.name).toBe("Joel's Meal Plan")
    })
  })

  describe('getMealPlan', () => {
    it('should return the default meal plan', async () => {
      const mealPlan = await repo.getMealPlan()
      expect(mealPlan.name).toBe("Joel's Meal Plan")
      expect(mealPlan.calories).toBe(2400)
      expect(mealPlan.timeline).toHaveLength(5)
      expect(mealPlan.mealStructure.breakfast.items).toHaveLength(4)
    })
  })

  describe('update', () => {
    it('should update existing meal plan', async () => {
      const mealPlans = await repo.findAll()
      expect(mealPlans[0]).toBeDefined()
      const updates = {
        name: "Updated Meal Plan",
        calories: 2500,
        timeline: [
          { time: "8:00 AM", slot: "A", meal: "Updated Breakfast", calories: 500, protein: 35, carbs: 50, fat: 18, container: "Mason jar" }
        ],
        mealStructure: {
          breakfast: {
            title: "A: Updated Breakfast (500 cal)",
            items: [
              "1 cup oats (200 cal, 35g C)",
              "1.5 scoop protein powder (180 cal, 36g P)",
              "1.5 tbsp nut butter (147 cal, 12g F)",
              "1 banana (105 cal, 27g C)"
            ]
          },
          lunch: {
            title: "C: Lunch (650 cal)",
            items: ["Test item"]
          },
          midDay: {
            title: "D: Mid-day Meal (550 cal)",
            items: ["Test item"]
          },
          dinner: {
            title: "E: Dinner (400 cal)",
            items: ["Test item"]
          },
          nightSnack: {
            title: "F: Night Snack (200 cal)",
            items: ["Test item"]
          }
        },
        portions: {
          protein: "7-9 oz per main meal",
          carbs: "2-2.5 cups per main meal",
          vegetables: "2.5 cups per main meal",
          fats: "1.5-2 tbsp per main meal"
        },
        weeklyPrep: {
          proteins: ["2 lbs chicken"],
          carbs: ["3 cups dry rice"],
          vegetables: ["5 cups mixed vegetables"],
          sauces: ["Updated sauce"]
        },
        emergencyBackup: {
          items: ["Updated backup item"]
        }
      }

      const updated = await repo.update(mealPlans[0]!.id, updates)
      expect(updated.name).toBe("Updated Meal Plan")
      expect(updated.calories).toBe(2500)
      expect(updated.timeline).toHaveLength(1)
      expect(updated.mealStructure.breakfast.items[0]).toBe("1 cup oats (200 cal, 35g C)")
      expect(updated.portions.protein).toBe("7-9 oz per main meal")
      expect(updated.weeklyPrep.proteins[0]).toBe("2 lbs chicken")
      expect(updated.emergencyBackup.items[0]).toBe("Updated backup item")
      expect(updated.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      const updates = {
        name: "Test Plan",
        calories: 2000,
        timeline: [],
        mealStructure: {
          breakfast: { title: "Test", items: [] },
          lunch: { title: "Test", items: [] },
          midDay: { title: "Test", items: [] },
          dinner: { title: "Test", items: [] },
          nightSnack: { title: "Test", items: [] }
        },
        portions: {
          protein: "test",
          carbs: "test",
          vegetables: "test",
          fats: "test"
        },
        weeklyPrep: {
          proteins: [],
          carbs: [],
          vegetables: [],
          sauces: []
        },
        emergencyBackup: {
          items: []
        }
      }
      await expect(repo.update('999', updates)).rejects.toThrow(NotFoundError)
    })

    it('should throw ValidationError for invalid updates', async () => {
      const mealPlans = await repo.findAll()
      expect(mealPlans[0]).toBeDefined()
      const invalidUpdates = {
        name: 123, // Invalid: name should be string
        calories: -100, // Invalid: calories should be positive
        timeline: [],
        mealStructure: {
          breakfast: { title: "Test", items: [] },
          lunch: { title: "Test", items: [] },
          midDay: { title: "Test", items: [] },
          dinner: { title: "Test", items: [] },
          nightSnack: { title: "Test", items: [] }
        },
        portions: {
          protein: "test",
          carbs: "test",
          vegetables: "test",
          fats: "test"
        },
        weeklyPrep: {
          proteins: [],
          carbs: [],
          vegetables: [],
          sauces: []
        },
        emergencyBackup: {
          items: []
        }
      } as unknown as Partial<MealPlan>

      await expect(repo.update(mealPlans[0]!.id, invalidUpdates)).rejects.toThrow(ValidationError)
    })
  })
}) 