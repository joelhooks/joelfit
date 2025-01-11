import { z } from 'zod'
import { baseSchema } from '../base'

// Meal timeline schema
export const mealTimelineSchema = z.object({
  time: z.string(),
  slot: z.string(),
  meal: z.string(),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fat: z.number().min(0),
  container: z.string()
})

// Meal structure schema
export const mealItemSchema = z.object({
  title: z.string(),
  items: z.array(z.string())
})

export const mealStructureSchema = z.object({
  breakfast: mealItemSchema,
  lunch: mealItemSchema,
  midDay: mealItemSchema,
  dinner: mealItemSchema,
  nightSnack: mealItemSchema
})

// Emergency backup schema
export const emergencyBackupSchema = z.object({
  items: z.array(z.string())
})

// Portions schema
export const portionsSchema = z.object({
  protein: z.string(),
  carbs: z.string(),
  vegetables: z.string(),
  fats: z.string()
})

// Weekly prep schema
export const weeklyPrepSchema = z.object({
  proteins: z.array(z.string()),
  carbs: z.array(z.string()),
  vegetables: z.array(z.string()),
  sauces: z.array(z.string())
})

// Meal plan schema
export const mealPlanSchema = baseSchema.extend({
  name: z.string(),
  calories: z.number().min(0),
  timeline: z.array(mealTimelineSchema),
  mealStructure: mealStructureSchema,
  portions: portionsSchema,
  weeklyPrep: weeklyPrepSchema,
  emergencyBackup: emergencyBackupSchema
})

// Type inference
export type MealTimeline = z.infer<typeof mealTimelineSchema>
export type MealItem = z.infer<typeof mealItemSchema>
export type MealStructure = z.infer<typeof mealStructureSchema>
export type Portions = z.infer<typeof portionsSchema>
export type WeeklyPrep = z.infer<typeof weeklyPrepSchema>
export type EmergencyBackup = z.infer<typeof emergencyBackupSchema>
export type MealPlan = z.infer<typeof mealPlanSchema> 