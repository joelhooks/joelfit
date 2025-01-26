import { z } from 'zod'
import { baseSchema } from '../base'

const taskSchema = z.object({
  task: z.string(),
  time: z.string()
})

const waveSchema = z.object({
  title: z.string(),
  time: z.string(),
  tasks: z.array(z.string())
})

const weeklyScheduleSchema = z.object({
  saturday: z.object({
    title: z.string(),
    tasks: z.array(taskSchema)
  }),
  sunday: z.object({
    title: z.string(),
    totalTime: z.string(),
    waves: z.array(waveSchema)
  }),
  wednesday: z.object({
    title: z.string(),
    tasks: z.array(z.string())
  })
})

const storageSchema = z.object({
  fridge: z.array(z.string()),
  freezer: z.array(z.string())
})

const containerSchema = z.object({
  mainMeals: z.object({
    sections: z.array(z.string())
  })
})

export const frameworkSchema = baseSchema.extend({
  weeklySchedule: weeklyScheduleSchema,
  storage: storageSchema,
  containers: containerSchema,
  scaling: z.record(z.string(), z.array(z.string())),
  troubleshooting: z.record(z.string(), z.array(z.string()))
})

export type Framework = z.infer<typeof frameworkSchema> 