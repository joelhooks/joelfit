import { describe, it, expect, beforeEach } from 'vitest'
import { ProfileRepository } from './repository'
import { Profile, ActivityLevel, ExerciseLevel } from './schema'
import { NotFoundError, ValidationError, SlugGenerationError } from '../base'

describe('ProfileRepository', () => {
  let repo: ProfileRepository
  let defaultProfileId: string

  beforeEach(() => {
    repo = new ProfileRepository()
    defaultProfileId = repo.getDefaultProfileId()
  })

  describe('findById', () => {
    it('should return a profile by id', async () => {
      const profile = await repo.findById(defaultProfileId)
      expect(profile.name).toBe('Joel Hooks')
      expect(profile.metrics.height).toBe(75)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.findById('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should return a profile by slug', async () => {
      const profile = await repo.findBySlug('joel')
      expect(profile.name).toBe('Joel Hooks')
      expect(profile.metrics.height).toBe(75)
    })

    it('should throw NotFoundError for non-existent slug', async () => {
      await expect(repo.findBySlug('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all profiles', async () => {
      const profiles = await repo.findAll()
      expect(profiles).toHaveLength(1)
      expect(profiles[0]?.name).toBe('Joel Hooks')
    })
  })

  describe('create', () => {
    it('should create a new profile', async () => {
      const newProfile = {
        name: 'Test User',
        metrics: {
          height: 70,
          weight: 180,
          age: 30,
          activityLevel: 'moderate' as ActivityLevel,
          exerciseLevel: 'intermediate' as ExerciseLevel
        },
        targets: {
          androidFat: 20,
          gynoidFat: 15,
          agRatio: 1.2,
          visceralFat: 1.5,
          totalBodyFat: 18,
          rsmi: 8
        }
      }

      const created = await repo.create(newProfile)
      expect(created.name).toBe('Test User')
      expect(created.slug).toBe('test-user')
      expect(created.id).toBeDefined()
      expect(created.createdAt).toBeInstanceOf(Date)
      expect(created.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw ValidationError for invalid data', async () => {
      const invalidProfile = {
        name: 'Test User',
        metrics: {
          height: -1,  // Invalid: negative height
          weight: 180,
          age: 30,
          activityLevel: 'moderate' as ActivityLevel,
          exerciseLevel: 'intermediate' as ExerciseLevel
        },
        targets: {
          androidFat: 20,
          gynoidFat: 15,
          agRatio: 1.2,
          visceralFat: 1.5,
          totalBodyFat: 18,
          rsmi: 8
        }
      }

      await expect(repo.create(invalidProfile)).rejects.toThrow(ValidationError)
    })
  })

  describe('update', () => {
    it('should update an existing profile', async () => {
      const updates = {
        metrics: {
          height: 75,
          weight: 245,
          age: 47,
          activityLevel: 'active' as ActivityLevel,
          exerciseLevel: 'advanced' as ExerciseLevel
        }
      }

      const updated = await repo.update(defaultProfileId, updates)
      expect(updated.metrics.weight).toBe(245)
      expect(updated.metrics.age).toBe(47)
      expect(updated.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.update('999', { name: 'New Name' })).rejects.toThrow(NotFoundError)
    })

    it('should throw ValidationError for invalid updates', async () => {
      const invalidUpdates = {
        metrics: {
          height: 75,
          weight: -1,  // Invalid: negative weight
          age: 47,
          activityLevel: 'active' as ActivityLevel,
          exerciseLevel: 'advanced' as ExerciseLevel
        }
      }

      await expect(repo.update(defaultProfileId, invalidUpdates)).rejects.toThrow(ValidationError)
    })
  })

  describe('delete', () => {
    it('should delete an existing profile', async () => {
      await repo.delete(defaultProfileId)
      await expect(repo.findById(defaultProfileId)).rejects.toThrow(NotFoundError)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.delete('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('generateSlug', () => {
    it('should generate a URL-friendly slug from name', async () => {
      const profile = {
        name: 'Test User 123!@#',
        metrics: {
          height: 70,
          weight: 180,
          age: 30,
          activityLevel: 'moderate' as ActivityLevel,
          exerciseLevel: 'intermediate' as ExerciseLevel
        },
        targets: {
          androidFat: 20,
          gynoidFat: 15,
          agRatio: 1.2,
          visceralFat: 1.5,
          totalBodyFat: 18,
          rsmi: 8
        }
      }

      const created = await repo.create(profile)
      expect(created.slug).toBe('test-user-123')
    })

    it('should throw SlugGenerationError if name is missing', async () => {
      const profile = {
        metrics: {
          height: 70,
          weight: 180,
          age: 30,
          activityLevel: 'moderate' as ActivityLevel,
          exerciseLevel: 'intermediate' as ExerciseLevel
        },
        targets: {
          androidFat: 20,
          gynoidFat: 15,
          agRatio: 1.2,
          visceralFat: 1.5,
          totalBodyFat: 18,
          rsmi: 8
        }
      }

      // @ts-expect-error Testing invalid input
      await expect(repo.create(profile)).rejects.toThrow(SlugGenerationError)
    })
  })
}) 