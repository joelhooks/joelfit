import { z } from 'zod'
import { baseSchema } from '../base'

// Non-empty string validation
const nonEmptyString = z.string().min(1)

// Weekly items schema
export const weeklyItemsSchema = z.object({
  meat: z.array(nonEmptyString),
  dairy: z.array(nonEmptyString),
  produce: z.array(nonEmptyString),
  frozen: z.array(nonEmptyString),
  bulk: z.array(nonEmptyString)
})

// Pantry staples schema
export const pantryStaplesSchema = z.object({
  oils: z.array(nonEmptyString),
  seasonings: z.array(nonEmptyString),
  sauces: z.array(nonEmptyString),
  dryGoods: z.array(nonEmptyString)
})

// Shopping tips schema
export const tipsSchema = z.object({
  buying: z.array(nonEmptyString),
  storage: z.array(nonEmptyString)
})

// Shopping list schema
export const shoppingListSchema = baseSchema.extend({
  name: nonEmptyString,
  weeklyItems: weeklyItemsSchema,
  pantryStaples: pantryStaplesSchema,
  tips: tipsSchema,
  lastUpdated: z.date().optional()
})

// Type inference
export type WeeklyItems = z.infer<typeof weeklyItemsSchema>
export type PantryStaples = z.infer<typeof pantryStaplesSchema>
export type ShoppingTips = z.infer<typeof tipsSchema>
export type ShoppingList = z.infer<typeof shoppingListSchema> 