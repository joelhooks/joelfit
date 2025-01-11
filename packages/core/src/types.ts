import { type z } from 'zod'

export interface Entity {
  id: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

export interface Repository<T extends Entity> {
  findById(id: string): Promise<T>
  findBySlug(slug: string): Promise<T>
  findAll(): Promise<T[]>
  create(data: Omit<T, keyof Entity>): Promise<T>
  update(id: string, data: Partial<Omit<T, keyof Entity>>): Promise<T>
  delete(id: string): Promise<void>
  generateSlug(name: string): string
  getData(): Promise<T[]>
  setData(data: T[]): Promise<void>
}

export type SchemaType<T extends z.ZodType> = z.infer<T> 