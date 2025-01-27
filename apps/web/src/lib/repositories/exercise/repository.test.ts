import { describe, it, expect, beforeEach } from 'vitest'
import { ExerciseRepository } from './repository'
import type { NewExercise } from './schema'
import { NotFoundError } from '../base'

describe('ExerciseRepository', () => {
  let repo: ExerciseRepository

  beforeEach(async () => {
    repo = new ExerciseRepository()
    await repo.reset()
  })

  const testExercise: NewExercise = {
    title: "Test Exercise",
    sets: {
      type: 'standard',
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
      const exercise = await repo.create(testExercise)
      const exercises = await repo.findAll()
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toContain(exercise)
    })
  })

  describe('findById', () => {
    it('should find exercise by id', async () => {
      const exercise = await repo.create(testExercise)
      const found = await repo.findById(exercise.id)
      expect(found).toEqual(exercise)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.findById('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should find exercise by slug', async () => {
      const exercise = await repo.create(testExercise)
      const found = await repo.findBySlug(exercise.slug)
      expect(found).toEqual(exercise)
    })

    it('should throw NotFoundError for non-existent slug', async () => {
      await expect(repo.findBySlug('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('create', () => {
    it('should create new exercise', async () => {
      const exercise = await repo.create(testExercise)
      expect(exercise).toHaveProperty('id')
      expect(exercise).toHaveProperty('slug')
      expect(exercise.title).toBe(testExercise.title)
      expect(exercise.category).toBe(testExercise.category)
    })

    it('should generate correct slug', async () => {
      const exercise = await repo.create({
        ...testExercise,
        title: "Test Exercise With Spaces!"
      })
      expect(exercise.slug).toBe('test-exercise-with-spaces')
    })

    it('should validate required fields', async () => {
      const invalidExercise = {
        ...testExercise,
        title: ""
      }
      await expect(repo.create(invalidExercise)).rejects.toThrow()
    })

    it('should validate target area', async () => {
      const invalidExercise = {
        ...testExercise,
        targetArea: []
      }
      await expect(repo.create(invalidExercise)).rejects.toThrow()
    })
  })

  describe('update', () => {
    it('should update existing exercise', async () => {
      const exercise = await repo.create(testExercise)
      const updated = await repo.update(exercise.id, {
        title: "Updated Title"
      })
      expect(updated.title).toBe("Updated Title")
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.update('999', { title: "Updated" })).rejects.toThrow(NotFoundError)
    })

    it('should validate updated fields', async () => {
      const exercise = await repo.create(testExercise)
      await expect(repo.update(exercise.id, {
        title: "" // invalid title
      })).rejects.toThrow()
    })
  })

  describe('delete', () => {
    it('should delete existing exercise', async () => {
      const exercise = await repo.create(testExercise)
      await expect(repo.delete(exercise.id)).resolves.not.toThrow()
      await expect(repo.findById(exercise.id)).rejects.toThrow(NotFoundError)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.delete('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('getByCategory', () => {
    it('should return exercises by category', async () => {
      const exercise = await repo.create(testExercise)
      const exercises = await repo.getByCategory('strength')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toContain(exercise)
    })

    it('should return empty array for unused category', async () => {
      await repo.create(testExercise) // strength category
      const exercises = await repo.getByCategory('mobility')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toHaveLength(0)
    })
  })

  describe('getByTarget', () => {
    it('should return exercises by target area', async () => {
      const exercise = await repo.create(testExercise)
      const exercises = await repo.getByTarget('shoulder_anterior')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toContain(exercise)
    })

    it('should return empty array for unused target', async () => {
      await repo.create(testExercise) // shoulder_anterior target
      const exercises = await repo.getByTarget('scapula')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toHaveLength(0)
    })
  })

  describe('getByEquipment', () => {
    it('should return exercises by equipment', async () => {
      const exercise = await repo.create(testExercise)
      const exercises = await repo.getByEquipment('dumbbells')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toContain(exercise)
    })

    it('should return empty array for unused equipment', async () => {
      await repo.create(testExercise) // dumbbells equipment
      const exercises = await repo.getByEquipment('barbell')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toHaveLength(0)
    })
  })

  describe('search', () => {
    it('should find exercises by title', async () => {
      const exercise = await repo.create({
        ...testExercise,
        title: "Lateral Raise Exercise"
      })
      const exercises = await repo.search('lateral raise')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises.length).toBeGreaterThan(0)
      expect(exercises[0]).toBeDefined()
      expect(exercises[0]?.title).toBe("Lateral Raise Exercise")
    })

    it('should find exercises by execution steps', async () => {
      const exercise = await repo.create({
        ...testExercise,
        execution: ["Squeeze shoulder blades together"]
      })
      const exercises = await repo.search('shoulder blades')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises.length).toBeGreaterThan(0)
      expect(exercises[0]).toBeDefined()
      expect(exercises[0]?.execution).toContain("Squeeze shoulder blades together")
    })

    it('should return empty array for no matches', async () => {
      await repo.create(testExercise)
      const exercises = await repo.search('xyzabc123')
      expect(exercises).toBeInstanceOf(Array)
      expect(exercises).toHaveLength(0)
    })
  })
}) 