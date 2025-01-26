import { z } from 'zod'
import { baseSchema } from '../base'

export const servingSuggestionSchema = z.object({
  title: z.string(),
  description: z.string()
})

export const recipeSchema = baseSchema.extend({
  title: z.string(),
  description: z.string(),
  category: z.enum(['proteins', 'sauces', 'vegetables']),
  prepTime: z.string(),
  cookTime: z.string(),
  restTime: z.string().optional(),
  servings: z.string(),
  equipment: z.array(z.string()),
  ingredients: z.array(z.string()),
  method: z.array(z.string()),
  mealPrepNotes: z.array(z.string()),
  proTips: z.array(z.string()),
  servingSuggestions: z.array(servingSuggestionSchema),
  nutrition: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number()
  }).optional()
})

export type ServingSuggestion = z.infer<typeof servingSuggestionSchema>
export type Recipe = z.infer<typeof recipeSchema>

// Helper type for creating new recipes without base entity fields
export type NewRecipe = Omit<Recipe, keyof z.infer<typeof baseSchema>> 