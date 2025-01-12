import { describe, expect, it, beforeEach } from 'vitest'
import { ExerciseRepository } from './repository'
import { NotFoundError, ValidationError } from '../base'
import type { NewExercise } from './schema'

describe('ExerciseRepository', () => {
  let repo: ExerciseRepository

  beforeEach(async () => {
    repo = new ExerciseRepository()
    await repo.reset()
  })

  const mockExercise: NewExercise = {
    title: "Test Exercise",
    sets: {
      count: 3,
      reps: 10,
      hold: 5
    },
    frequency: {
      times: 3,
      period: 'week'
    },
    execution: [
      "Step 1",
      "Step 2"
    ],
    category: "strength",
    targetArea: ["shoulder_anterior"],
    equipment: ["dumbbells"]
  }

  describe('findAll', () => {
    it('should return all exercises', async () => {
      const exercise = await repo.create(mockExercise)
      const exercises = await repo.findAll()
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises.length).toBe(1)
      expect(exercises[0]).toEqual(exercise)
    })
  })

  describe('findById', () => {
    it('should find exercise by id', async () => {
      const exercise = await repo.create(mockExercise)
      const found = await repo.findById(exercise.id)
      expect(found).toEqual(exercise)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.findById('fake-id')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should find exercise by slug', async () => {
      const exercise = await repo.create(mockExercise)
      const found = await repo.findBySlug(exercise.slug)
      expect(found).toEqual(exercise)
    })

    it('should throw NotFoundError for non-existent slug', async () => {
      await expect(repo.findBySlug('fake-slug')).rejects.toThrow(NotFoundError)
    })
  })

  describe('create', () => {
    it('should create new exercise', async () => {
      const exercise = await repo.create(mockExercise)
      expect(exercise).toHaveProperty('id')
      expect(exercise).toHaveProperty('slug')
      expect(exercise.title).toBe(mockExercise.title)
      expect(exercise.category).toBe(mockExercise.category)
    })

    it('should generate correct slug', async () => {
      const exercise = await repo.create({
        ...mockExercise,
        title: "Test Exercise With Spaces!"
      })
      expect(exercise.slug).toBe('test-exercise-with-spaces')
    })

    it('should validate required fields', async () => {
      const invalidExercise = {
        ...mockExercise,
        title: ""
      }
      await expect(repo.create(invalidExercise)).rejects.toThrow(ValidationError)
      await expect(repo.create(invalidExercise)).rejects.toThrowError('Title is required')
    })

    it('should validate target area', async () => {
      const invalidExercise = {
        ...mockExercise,
        targetArea: []
      }
      await expect(repo.create(invalidExercise)).rejects.toThrow(ValidationError)
      await expect(repo.create(invalidExercise)).rejects.toThrowError('Must target at least one area')
    })
  })

  describe('update', () => {
    it('should update existing exercise', async () => {
      const exercise = await repo.create(mockExercise)
      const updated = await repo.update(exercise.id, {
        title: "Updated Title"
      })
      expect(updated.title).toBe("Updated Title")
      expect(updated.id).toBe(exercise.id)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.update('fake-id', { title: "New" })).rejects.toThrow(NotFoundError)
    })

    it('should validate updated fields', async () => {
      const exercise = await repo.create(mockExercise)
      await expect(repo.update(exercise.id, {
        title: "" // invalid title
      })).rejects.toThrow(ValidationError)
    })
  })

  describe('delete', () => {
    it('should delete existing exercise', async () => {
      const exercise = await repo.create(mockExercise)
      await expect(repo.delete(exercise.id)).resolves.not.toThrow()
      await expect(repo.findById(exercise.id)).rejects.toThrow(NotFoundError)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.delete('fake-id')).rejects.toThrow(NotFoundError)
    })
  })

  describe('getByCategory', () => {
    it('should return exercises by category', async () => {
      const exercise = await repo.create(mockExercise)
      const exercises = await repo.getByCategory('strength')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toContainEqual(exercise)
    })

    it('should return empty array for unused category', async () => {
      await repo.create(mockExercise) // strength category
      const exercises = await repo.getByCategory('mobility')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises.length).toBe(0)
    })
  })

  describe('getByTarget', () => {
    it('should return exercises by target area', async () => {
      const exercise = await repo.create(mockExercise)
      const exercises = await repo.getByTarget('shoulder_anterior')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toContainEqual(exercise)
    })

    it('should return empty array for unused target', async () => {
      await repo.create(mockExercise) // shoulder_anterior target
      const exercises = await repo.getByTarget('scapula')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises.length).toBe(0)
    })
  })

  describe('getByEquipment', () => {
    it('should return exercises by equipment', async () => {
      const exercise = await repo.create(mockExercise)
      const exercises = await repo.getByEquipment('dumbbells')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toContainEqual(exercise)
    })

    it('should return empty array for unused equipment', async () => {
      await repo.create(mockExercise) // dumbbells equipment
      const exercises = await repo.getByEquipment('barbell')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises.length).toBe(0)
    })
  })

  describe('search', () => {
    it('should find exercises by title', async () => {
      await repo.create({
        ...mockExercise,
        title: "Lateral Raise Exercise"
      })
      const exercises = await repo.search('lateral')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises.length).toBeGreaterThan(0)
      expect(exercises[0]!.title.toLowerCase()).toContain('lateral')
    })

    it('should find exercises by execution steps', async () => {
      await repo.create({
        ...mockExercise,
        execution: ["Squeeze shoulder blades together"]
      })
      const exercises = await repo.search('squeeze shoulder blades')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises.length).toBeGreaterThan(0)
      expect(exercises[0]!.execution.some(step => 
        step.toLowerCase().includes('squeeze shoulder blades')
      )).toBe(true)
    })

    it('should return empty array for no matches', async () => {
      await repo.create(mockExercise)
      const exercises = await repo.search('xyzabc123')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises.length).toBe(0)
    })
  })
}) 