import { describe, it, expect, beforeEach } from 'vitest'
import { ProfileRepository } from './repository'
import { type Profile, type ActivityLevel, type ExerciseLevel } from './schema'
import { NotFoundError, ValidationError, SlugGenerationError } from '../base'

describe('ProfileRepository', () => {
  let repo: ProfileRepository

  beforeEach(() => {
    repo = new ProfileRepository()
  })

  const validProfile = {
    name: 'Test User',
    metrics: {
      height: '5\'10" (70 inches)',
      weight: '180 lbs',
      age: 30,
      activity: 'moderate' as ActivityLevel,
      exercise: '3-4 sessions per week',
      experience: {
        lifting: 'intermediate' as ExerciseLevel,
        cardio: 'intermediate' as ExerciseLevel
      },
      androidFat: 20,
      gynoidFat: 15,
      agRatio: 1.2,
      visceralFat: 1.5,
      totalBodyFat: 18,
      rsmi: 8
    },
    targets: {
      androidFat: 20,
      gynoidFat: 15,
      agRatio: 1.2,
      visceralFat: 1.5,
      totalBodyFat: 18,
      rsmi: 8
    },
    strengthAreas: [
      {
        title: "Test Strength",
        metric: "Test Metric",
        details: "Test Details"
      }
    ],
    actionPlan: [
      {
        category: "Test Category",
        items: [
          {
            title: "Test Action",
            description: "Test Description",
            detail: "Test Detail"
          }
        ]
      }
    ],
    nutritionProfile: {
      targets: {
        calories: "2000-2200",
        protein: "180g",
        carbs: "220g",
        fat: "60g"
      },
      meals: [
        {
          name: "Breakfast",
          time: "8:00 AM",
          calories: 500,
          protein: 40,
          carbs: 60,
          fat: 15,
          container: "1A"
        }
      ],
      portions: {
        protein: "6-8oz",
        carbs: "1 cup",
        vegetables: "2 cups",
        fats: "1 tbsp"
      },
      weeklyPrep: {
        proteins: ["Chicken", "Fish"],
        carbs: ["Rice", "Sweet Potato"],
        vegetables: ["Broccoli", "Spinach"],
        sauces: ["Teriyaki", "Lemon Herb"]
      }
    }
  }

  describe('findById', () => {
    it('should return a profile by id', async () => {
      const created = await repo.create(validProfile)
      const profile = await repo.findById(created.id)
      expect(profile.name).toBe('Test User')
      expect(profile.metrics.height).toBe('5\'10" (70 inches)')
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.findById('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should return a profile by slug', async () => {
      const created = await repo.create(validProfile)
      const profile = await repo.findBySlug('test-user')
      expect(profile.name).toBe('Test User')
      expect(profile.metrics.height).toBe('5\'10" (70 inches)')
    })

    it('should throw NotFoundError for non-existent slug', async () => {
      await expect(repo.findBySlug('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all profiles', async () => {
      await repo.create(validProfile)
      const profiles = await repo.findAll()
      expect(profiles.length).toBeGreaterThan(0)
      expect(profiles[0]?.name).toBeDefined()
    })
  })

  describe('create', () => {
    it('should create a new profile', async () => {
      const created = await repo.create(validProfile)
      expect(created.name).toBe('Test User')
      expect(created.slug).toBe('test-user')
      expect(created.id).toBeDefined()
      expect(created.createdAt).toBeInstanceOf(Date)
      expect(created.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw ValidationError for invalid data', async () => {
      const invalidProfile = {
        ...validProfile,
        metrics: {
          ...validProfile.metrics,
          age: -1 // Invalid: negative age
        }
      }

      await expect(repo.create(invalidProfile)).rejects.toThrow(ValidationError)
    })
  })

  describe('update', () => {
    it('should update an existing profile', async () => {
      const created = await repo.create(validProfile)
      const updates = {
        metrics: {
          ...validProfile.metrics,
          weight: '175 lbs'
        }
      }

      const updated = await repo.update(created.id, updates)
      expect(updated.metrics.weight).toBe('175 lbs')
      expect(updated.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.update('999', { name: 'New Name' })).rejects.toThrow(NotFoundError)
    })

    it('should throw ValidationError for invalid updates', async () => {
      const created = await repo.create(validProfile)
      const invalidUpdates = {
        metrics: {
          ...validProfile.metrics,
          age: -1 // Invalid: negative age
        }
      }

      await expect(repo.update(created.id, invalidUpdates)).rejects.toThrow(ValidationError)
    })
  })

  describe('delete', () => {
    it('should delete an existing profile', async () => {
      const created = await repo.create(validProfile)
      await repo.delete(created.id)
      await expect(repo.findById(created.id)).rejects.toThrow(NotFoundError)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.delete('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('generateSlug', () => {
    it('should generate a URL-friendly slug from name', async () => {
      const profile = {
        ...validProfile,
        name: 'Test User 123!@#'
      }

      const created = await repo.create(profile)
      expect(created.slug).toBe('test-user-123')
    })

    it('should throw SlugGenerationError if name is missing', async () => {
      const profile = {
        ...validProfile,
        name: undefined
      }

      // @ts-expect-error Testing invalid input
      await expect(repo.create(profile)).rejects.toThrow(SlugGenerationError)
    })
  })
}) 