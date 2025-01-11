import { z } from 'zod'
import { baseSchema, Entity } from '../base'

export const activityLevelSchema = z.enum(['sedentary', 'moderate', 'moderately-active', 'active', 'very-active'])
export const exerciseLevelSchema = z.enum(['beginner', 'intermediate', 'advanced'])

export const experienceSchema = z.object({
  lifting: exerciseLevelSchema,
  cardio: exerciseLevelSchema
})

export const metricsSchema = z.object({
  height: z.string(),
  weight: z.string(),
  age: z.number().min(0),
  activity: activityLevelSchema,
  exercise: z.string(),
  experience: experienceSchema,
  androidFat: z.number().min(0),
  gynoidFat: z.number().min(0),
  agRatio: z.number().min(0),
  visceralFat: z.number().min(0),
  totalBodyFat: z.number().min(0),
  rsmi: z.number().min(0)
})

export const targetsSchema = z.object({
  androidFat: z.number().min(0),
  gynoidFat: z.number().min(0),
  agRatio: z.number().min(0),
  visceralFat: z.number().min(0),
  totalBodyFat: z.number().min(0),
  rsmi: z.number().min(0)
})

export const strengthAreaSchema = z.object({
  title: z.string(),
  metric: z.string(),
  details: z.string()
})

export const actionItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  detail: z.string()
})

export const actionCategorySchema = z.object({
  category: z.string(),
  items: z.array(actionItemSchema)
})

export const profileSchema = baseSchema.extend({
  name: z.string().min(1),
  metrics: metricsSchema,
  targets: targetsSchema,
  strengthAreas: z.array(strengthAreaSchema),
  actionPlan: z.array(actionCategorySchema)
})

export type ActivityLevel = z.infer<typeof activityLevelSchema>
export type ExerciseLevel = z.infer<typeof exerciseLevelSchema>
export type Experience = z.infer<typeof experienceSchema>
export type Metrics = z.infer<typeof metricsSchema>
export type Targets = z.infer<typeof targetsSchema>
export type StrengthArea = z.infer<typeof strengthAreaSchema>
export type ActionItem = z.infer<typeof actionItemSchema>
export type ActionCategory = z.infer<typeof actionCategorySchema>
export type Profile = z.infer<typeof profileSchema> & Entity 