import { z } from 'zod'

export const metricSchema = z.object({
  androidFat: z.number().min(0).max(100),
  gynoidFat: z.number().min(0).max(100),
  agRatio: z.number().min(0),
  visceralFat: z.number().min(0),
  totalBodyFat: z.number().min(0).max(100),
  rsmi: z.number().min(0)
})

export type Metrics = z.infer<typeof metricSchema>

export const targetSchema = z.object({
  androidFat: z.number().max(24),
  agRatio: z.number().max(1),
  visceralFat: z.number().max(2)
})

export type Targets = z.infer<typeof targetSchema>

export const strengthAreaSchema = z.object({
  title: z.string(),
  metric: z.string(),
  details: z.string()
})

export type StrengthArea = z.infer<typeof strengthAreaSchema>

export const personalStatsSchema = z.object({
  name: z.string(),
  age: z.number(),
  height: z.string(),
  weight: z.string(),
  activity: z.string(),
  exercise: z.string(),
  experience: z.object({
    lifting: z.string(),
    cardio: z.string()
  })
})

export type PersonalStats = z.infer<typeof personalStatsSchema>

export const actionItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  detail: z.string()
})

export type ActionItem = z.infer<typeof actionItemSchema>

export const actionPlanSchema = z.object({
  category: z.string(),
  items: z.array(actionItemSchema)
})

export type ActionPlan = z.infer<typeof actionPlanSchema>

export const mealSchema = z.object({
  name: z.string(),
  time: z.string(),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fat: z.number(),
  container: z.string()
})

export const nutritionTargetsSchema = z.object({
  calories: z.string(),
  protein: z.string(),
  carbs: z.string(),
  fat: z.string()
})

export const portionsSchema = z.object({
  protein: z.string(),
  carbs: z.string(),
  vegetables: z.string(),
  fats: z.string()
})

export const weeklyPrepSchema = z.object({
  proteins: z.array(z.string()),
  carbs: z.array(z.string()),
  vegetables: z.array(z.string()),
  sauces: z.array(z.string())
})

export const nutritionProfileSchema = z.object({
  targets: nutritionTargetsSchema,
  meals: z.array(mealSchema),
  portions: portionsSchema,
  weeklyPrep: weeklyPrepSchema
})

export type Meal = z.infer<typeof mealSchema>
export type NutritionTargets = z.infer<typeof nutritionTargetsSchema>
export type Portions = z.infer<typeof portionsSchema>
export type WeeklyPrep = z.infer<typeof weeklyPrepSchema>
export type NutritionProfile = z.infer<typeof nutritionProfileSchema> 