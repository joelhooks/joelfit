import { z } from 'zod'
import { contentSchema } from '../schema'

export type StreamProgress = {
  message: string
  timestamp: number
}

export type StreamedResponseItem = {
  id: string
  status: 'pending' | 'fulfilled' | 'rejected'
  data: z.infer<typeof contentSchema> | null
  progress: StreamProgress[]
}

export type StreamedResponse = {
  id: string
  items: StreamedResponseItem[]
  next: ((id: string) => Promise<StreamedResponse>) | null
} 