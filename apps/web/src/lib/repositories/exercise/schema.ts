import { z } from 'zod'
import { baseSchema } from '../base'

export const exerciseCategorySchema = z.enum([
  'warmup',
  'strength',
  'mobility',
  'endurance'
])

export const exerciseTargetSchema = z.enum([
  'shoulder_anterior',
  'shoulder_lateral',
  'shoulder_posterior',
  'rotator_cuff',
  'scapula',
  'traps',
  'nerve',
  'lats',
  'shoulder_stability'
])

const exerciseSetBaseSchema = z.object({
  count: z.number().positive('Must have at least 1 set')
})

const standardSetSchema = exerciseSetBaseSchema.extend({
  reps: z.number().positive('Must have at least 1 rep'),
  hold: z.number().positive('Hold time must be positive').optional()
})

const distanceSetSchema = exerciseSetBaseSchema.extend({
  distance: z.string()
})

const durationSetSchema = exerciseSetBaseSchema.extend({
  duration: z.number().positive('Duration must be positive')
})

export const exerciseSchema = baseSchema.extend({
  title: z.string().min(1, 'Title is required'),
  sets: z.discriminatedUnion('type', [
    standardSetSchema.extend({ type: z.literal('standard') }),
    distanceSetSchema.extend({ type: z.literal('distance') }),
    durationSetSchema.extend({ type: z.literal('duration') })
  ]),
  frequency: z.object({
    times: z.number().positive('Must occur at least once'),
    period: z.enum(['day', 'week'])
  }),
  execution: z.array(z.string()).min(1, 'Must have at least one execution step'),
  keyPoints: z.string().optional(),
  category: exerciseCategorySchema,
  equipment: z.array(z.string()).default([]),
  targetArea: z.array(exerciseTargetSchema).min(1, 'Must target at least one area')
})

export type ExerciseCategory = z.infer<typeof exerciseCategorySchema>
export type ExerciseTarget = z.infer<typeof exerciseTargetSchema>
export type Exercise = z.infer<typeof exerciseSchema>

// Helper type for creating new exercises without base entity fields
export type NewExercise = Omit<Exercise, keyof z.infer<typeof baseSchema>> 