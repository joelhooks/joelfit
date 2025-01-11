import { z } from 'zod'
import { baseSchema } from '../base'

// Schedule schemas
export const taskSchema = z.object({
  task: z.string(),
  time: z.string()
})

export const waveSchema = z.object({
  title: z.string(),
  time: z.string(),
  tasks: z.array(z.string())
})

export const daySchema = z.object({
  title: z.string(),
  tasks: z.array(taskSchema).optional(),
  totalTime: z.string().optional(),
  waves: z.array(waveSchema).optional()
})

export const weeklyScheduleSchema = z.object({
  saturday: daySchema,
  sunday: daySchema,
  wednesday: daySchema
})

// Container schemas
export const sectionSchema = z.object({
  name: z.string(),
  capacity: z.string()
})

export const containerSchema = z.object({
  sections: z.array(sectionSchema).optional(),
  quantity: z.string().optional(),
  note: z.string().optional(),
  features: z.array(z.string()).optional(),
  type: z.string().optional()
})

export const containersSchema = z.object({
  mainMeals: containerSchema,
  breakfast: containerSchema,
  smoothies: containerSchema,
  sauces: containerSchema
})

// Storage schemas
export const shelfSchema = z.object({
  shelf: z.string(),
  contents: z.string()
})

export const storageSchema = z.object({
  fridge: z.array(shelfSchema),
  freezer: z.array(z.string())
})

// Scaling schemas
export const baseScalingSchema = z.object({
  servings: z.string(),
  proteins: z.string(),
  carbs: z.string(),
  vegetables: z.string(),
  sauces: z.string()
})

export const multiplierSchema = z.object({
  people: z.number(),
  factor: z.string(),
  note: z.string().optional()
})

export const timeAdjustmentsSchema = z.object({
  base: z.string(),
  additional: z.string(),
  maximum: z.string()
})

export const scalingSchema = z.object({
  base: baseScalingSchema,
  multipliers: z.array(multiplierSchema),
  timeAdjustments: timeAdjustmentsSchema
})

// Troubleshooting schemas
export const issueSchema = z.object({
  issue: z.string(),
  solution: z.string()
})

export const troubleshootingSchema = z.object({
  foodSafety: z.array(issueSchema),
  containers: z.array(issueSchema),
  quality: z.array(issueSchema),
  timeManagement: z.array(issueSchema)
})

// Main framework schema
export const frameworkSchema = baseSchema.extend({
  weeklySchedule: weeklyScheduleSchema,
  containers: containersSchema,
  storage: storageSchema,
  scaling: scalingSchema,
  troubleshooting: troubleshootingSchema
})

// Export types
export type Task = z.infer<typeof taskSchema>
export type Wave = z.infer<typeof waveSchema>
export type Day = z.infer<typeof daySchema>
export type WeeklySchedule = z.infer<typeof weeklyScheduleSchema>
export type Section = z.infer<typeof sectionSchema>
export type Container = z.infer<typeof containerSchema>
export type Containers = z.infer<typeof containersSchema>
export type Shelf = z.infer<typeof shelfSchema>
export type Storage = z.infer<typeof storageSchema>
export type BaseScaling = z.infer<typeof baseScalingSchema>
export type Multiplier = z.infer<typeof multiplierSchema>
export type TimeAdjustments = z.infer<typeof timeAdjustmentsSchema>
export type Scaling = z.infer<typeof scalingSchema>
export type Issue = z.infer<typeof issueSchema>
export type Troubleshooting = z.infer<typeof troubleshootingSchema>
export type Framework = z.infer<typeof frameworkSchema> 