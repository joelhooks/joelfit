import { z } from 'zod'
import { baseSchema, Entity } from '../base'

export const activityLevelSchema = z.enum(['sedentary', 'moderate', 'active', 'very-active'])
export const exerciseLevelSchema = z.enum(['beginner', 'intermediate', 'advanced'])

export const metricsSchema = z.object({
  height: z.number().min(0),
  weight: z.number().min(0),
  age: z.number().min(0),
  activityLevel: activityLevelSchema,
  exerciseLevel: exerciseLevelSchema
})

export const targetsSchema = z.object({
  androidFat: z.number().min(0),
  gynoidFat: z.number().min(0),
  agRatio: z.number().min(0),
  visceralFat: z.number().min(0),
  totalBodyFat: z.number().min(0),
  rsmi: z.number().min(0)
})

export const profileSchema = baseSchema.extend({
  name: z.string().min(1),
  metrics: metricsSchema,
  targets: targetsSchema
})

export type ActivityLevel = z.infer<typeof activityLevelSchema>
export type ExerciseLevel = z.infer<typeof exerciseLevelSchema>
export type Metrics = z.infer<typeof metricsSchema>
export type Targets = z.infer<typeof targetsSchema>
export type Profile = z.infer<typeof profileSchema> & Entity 