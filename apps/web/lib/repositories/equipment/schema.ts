import { z } from 'zod'
import { baseSchema } from '../base'

export const equipmentCategorySchema = z.enum(['storage', 'accessories', 'appliances', 'measurement'])

export const equipmentSchema = baseSchema.extend({
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  price: z.number().positive(),
  category: equipmentCategorySchema,
  required: z.boolean().optional(),
  maintenance: z.string().optional()
})

export type EquipmentCategory = z.infer<typeof equipmentCategorySchema>
export type Equipment = z.infer<typeof equipmentSchema>

export const maintenanceScheduleSchema = z.object({
  daily: z.array(z.string()),
  weekly: z.array(z.string()),
  monthly: z.array(z.string()),
  quarterly: z.array(z.string()),
  yearly: z.array(z.string())
})

export type MaintenanceSchedule = z.infer<typeof maintenanceScheduleSchema>

export const storageGuideSchema = z.object({
  containers: z.object({
    cleaning: z.string(),
    rotation: z.string(),
    storage: z.string()
  }),
  bags: z.object({
    cleaning: z.string(),
    drying: z.string(),
    storage: z.string()
  })
})

export type StorageGuide = z.infer<typeof storageGuideSchema> 