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