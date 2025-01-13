import { z } from 'zod'
import { baseSchema } from '../base'

export const articleCategorySchema = z.enum([
  'training_method',
  'nutrition',
  'mobility',
  'recovery',
  'programming',
  'technique'
])

export const articleTagSchema = z.enum([
  'conjugate',
  'powerlifting',
  'olympic_lifting',
  'bodybuilding',
  'conditioning',
  'rehab',
  'prehab',
  'diet',
  'meal_prep',
  'supplements'
])

export const articleSchema = baseSchema.extend({
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  content: z.string().min(1, 'Content is required'),
  category: articleCategorySchema,
  tags: z.array(articleTagSchema).min(1, 'Must have at least one tag'),
  source: z.object({
    url: z.string().url().optional(),
    author: z.string().optional(),
    publishedAt: z.date().optional()
  }).optional(),
  relatedExercises: z.array(z.string()).default([]), // Exercise IDs
  relatedMealPlans: z.array(z.string()).default([]), // MealPlan IDs
})

export type ArticleCategory = z.infer<typeof articleCategorySchema>
export type ArticleTag = z.infer<typeof articleTagSchema>
export type Article = z.infer<typeof articleSchema>
export type NewArticle = Omit<Article, keyof z.infer<typeof baseSchema>> 