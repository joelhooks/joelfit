import { describe, it, expect, beforeEach } from 'vitest'
import { FrameworkRepository } from './repository'
import { type Framework } from './schema'
import { NotFoundError, ValidationError } from '../base'

describe('FrameworkRepository', () => {
  let repo: FrameworkRepository

  beforeEach(() => {
    repo = new FrameworkRepository()
  })

  describe('findById', () => {
    it('should return framework by id', async () => {
      const frameworks = await repo.findAll()
      expect(frameworks[0]).toBeDefined()
      const framework = await repo.findById(frameworks[0]!.id)
      expect(framework.weeklySchedule.saturday.title).toBe('Planning & Shopping')
      expect(framework.weeklySchedule.sunday.waves).toBeDefined()
      expect(framework.containers.mainMeals.sections).toHaveLength(3)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      await expect(repo.findById('999')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findBySlug', () => {
    it('should return framework by slug', async () => {
      const framework = await repo.findBySlug('core-framework')
      expect(framework.weeklySchedule.saturday.title).toBe('Planning & Shopping')
      expect(framework.weeklySchedule.sunday.waves).toBeDefined()
      expect(framework.containers.mainMeals.sections).toHaveLength(3)
    })

    it('should throw NotFoundError for non-existent slug', async () => {
      await expect(repo.findBySlug('non-existent')).rejects.toThrow(NotFoundError)
    })
  })

  describe('findAll', () => {
    it('should return all frameworks', async () => {
      const frameworks = await repo.findAll()
      expect(frameworks).toHaveLength(1)
      expect(frameworks[0]?.weeklySchedule).toBeDefined()
    })
  })

  describe('getFramework', () => {
    it('should return the default framework', async () => {
      const framework = await repo.getFramework()
      expect(framework.weeklySchedule.saturday.title).toBe('Planning & Shopping')
      expect(framework.weeklySchedule.sunday.waves).toBeDefined()
      expect(framework.containers.mainMeals.sections).toHaveLength(3)
    })
  })

  describe('update', () => {
    it('should update existing framework', async () => {
      const frameworks = await repo.findAll()
      expect(frameworks[0]).toBeDefined()
      const updates = {
        weeklySchedule: {
          saturday: {
            title: "Updated Planning & Shopping",
            tasks: [
              { task: "Updated inventory check", time: "45 min" }
            ]
          },
          sunday: {
            title: "Updated Prep Day",
            totalTime: "3-4 hours",
            waves: []
          },
          wednesday: {
            title: "Updated Mid-week Tasks",
            tasks: []
          }
        }
      }

      const updated = await repo.update(frameworks[0]!.id, updates)
      expect(updated.weeklySchedule.saturday.title).toBe('Updated Planning & Shopping')
      expect(updated.weeklySchedule.saturday.tasks?.[0]?.time).toBe('45 min')
      expect(updated.updatedAt).toBeInstanceOf(Date)
    })

    it('should throw NotFoundError for non-existent id', async () => {
      const updates = {
        weeklySchedule: {
          saturday: {
            title: "Test Title",
            tasks: []
          },
          sunday: {
            title: "Test Title",
            tasks: []
          },
          wednesday: {
            title: "Test Title",
            tasks: []
          }
        }
      }
      await expect(repo.update('999', updates)).rejects.toThrow(NotFoundError)
    })

    it('should throw ValidationError for invalid updates', async () => {
      const frameworks = await repo.findAll()
      expect(frameworks[0]).toBeDefined()
      const invalidUpdates = {
        weeklySchedule: {
          saturday: {
            title: "Test Title",
            tasks: [{ task: 123, time: "10 min" }]
          },
          sunday: {
            title: "Test Title",
            tasks: []
          },
          wednesday: {
            title: "Test Title",
            tasks: []
          }
        }
      } as unknown as Partial<Framework>

      await expect(repo.update(frameworks[0]!.id, invalidUpdates)).rejects.toThrow(ValidationError)
    })
  })
}) 