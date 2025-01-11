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
export const mealStructureItemSchema = z.object({
  name: z.string(),
  amount: z.string(),
  container: z.string().optional()
})

export const mealStructureSchema = z.object({
  breakfast: z.array(mealStructureItemSchema),
  lunch: z.array(mealStructureItemSchema),
  midDayMeal: z.array(mealStructureItemSchema),
  dinner: z.array(mealStructureItemSchema),
  nightSnack: z.array(mealStructureItemSchema)
})

// Pantry staples schema
export const pantryStaplesForMealSchema = z.object({
  oils: z.array(z.string()),
  sauces: z.array(z.string()),
  seasonings: z.array(z.string()),
  spreads: z.array(z.string())
})

// Emergency backup schema
export const emergencyBackupSchema = z.array(z.string())

// Meal plan schema
export const mealPlanSchema = baseSchema.extend({
  name: z.string(),
  totalCalories: z.number().min(0),
  timeline: z.array(mealTimelineSchema),
  structure: mealStructureSchema,
  emergencyBackup: emergencyBackupSchema
})

// Type inference
export type MealTimeline = z.infer<typeof mealTimelineSchema>
export type MealStructureItem = z.infer<typeof mealStructureItemSchema>
export type MealStructure = z.infer<typeof mealStructureSchema>
export type PantryStaplesForMeal = z.infer<typeof pantryStaplesForMealSchema>
export type EmergencyBackup = z.infer<typeof emergencyBackupSchema>
export type MealPlan = z.infer<typeof mealPlanSchema> 