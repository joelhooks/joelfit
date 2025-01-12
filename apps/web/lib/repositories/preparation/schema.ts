import { z } from 'zod'
import { baseSchema } from '../base'

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
  day: z.string(),
  title: z.string(),
  totalTime: z.string().optional(),
  tasks: z.array(taskSchema).optional(),
  waves: z.array(waveSchema).optional()
})

export const tipsSchema = z.object({
  efficiency: z.array(z.string()),
  quality: z.array(z.string())
})

export const preparationSchema = baseSchema.extend({
  weeklyTimeline: z.array(daySchema),
  tips: tipsSchema
})

export type Task = z.infer<typeof taskSchema>
export type Wave = z.infer<typeof waveSchema>
export type Day = z.infer<typeof daySchema>
export type Tips = z.infer<typeof tipsSchema>
export type Preparation = z.infer<typeof preparationSchema>

// Helper type for creating new preparations without base entity fields
export type NewPreparation = Omit<Preparation, keyof z.infer<typeof baseSchema>> 