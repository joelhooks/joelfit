import { z } from 'zod'
import { baseSchema, Entity } from '../base'

export const unitSchema = z.enum([
  'g',
  'kg',
  'lb',
  'oz',
  'ml',
  'l',
  'cup',
  'tbsp',
  'tsp',
  'piece',
  'package'
])

export const categorySchema = z.enum([
  'protein',
  'produce',
  'dairy',
  'pantry',
  'frozen',
  'other'
])

export const itemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().min(0),
  unit: unitSchema,
  category: categorySchema,
  purchased: z.boolean().default(false),
  notes: z.string().optional()
})

export const shoppingListSchema = baseSchema.extend({
  name: z.string().min(1),
  items: z.array(itemSchema),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  completed: z.boolean().default(false)
})

export type Unit = z.infer<typeof unitSchema>
export type Category = z.infer<typeof categorySchema>
export type ShoppingItem = z.infer<typeof itemSchema>
export type ShoppingList = z.infer<typeof shoppingListSchema> & Entity 