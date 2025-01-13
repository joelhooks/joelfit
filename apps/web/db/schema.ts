import { mysqlTable } from '@/db/mysql-table'
import { 
  varchar, 
  text, 
  timestamp, 
  json 
} from 'drizzle-orm/mysql-core'

export const articles = mysqlTable('articles', {
  id: varchar('id', { length: 36 }).primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  summary: text('summary').notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  tags: json('tags').$type<string[]>().notNull(),
  source: json('source').$type<{
    url: string
    author: string
    publishedAt: string
  }>().notNull(),
  relatedExercises: json('related_exercises').$type<string[]>().notNull(),
  relatedMealPlans: json('related_meal_plans').$type<string[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})


