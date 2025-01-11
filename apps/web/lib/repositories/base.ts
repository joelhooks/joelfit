import { z } from 'zod'

// Base entity interface that all domain entities must implement
export interface Entity {
  id: string
  slug: string
  createdAt: Date
  updatedAt: Date
}

// Base schema that all Zod schemas must extend
export const baseSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

// Repository errors for consistent error handling
export class RepositoryError extends Error {
  constructor(message: string, public code: string) {
    super(message)
    this.name = 'RepositoryError'
  }
}

export class NotFoundError extends RepositoryError {
  constructor(entity: string, id: string) {
    super(`${entity} with id ${id} not found`, 'NOT_FOUND')
  }
}

export class ValidationError extends RepositoryError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR')
  }
}

// Base repository interface that all repositories must implement
export interface Repository<T extends Entity> {
  findById(id: string): Promise<T>
  findBySlug(slug: string): Promise<T>
  findAll(): Promise<T[]>
  create(data: Omit<T, keyof Entity>): Promise<T>
  update(id: string, data: Partial<Omit<T, keyof Entity>>): Promise<T>
  delete(id: string): Promise<void>
}

// Base repository implementation with common functionality
export abstract class BaseRepository<T extends Entity, TSchema extends z.ZodType<T>> implements Repository<T> {
  constructor(
    protected readonly schema: TSchema,
    protected readonly entityName: string
  ) {}

  protected abstract getData(): Promise<T[]>
  protected abstract setData(data: T[]): Promise<void>

  async findById(id: string): Promise<T> {
    const items = await this.getData()
    const item = items.find(i => i.id === id)
    if (!item) throw new NotFoundError(this.entityName, id)
    return item
  }

  async findBySlug(slug: string): Promise<T> {
    const items = await this.getData()
    const item = items.find(i => i.slug === slug)
    if (!item) throw new NotFoundError(this.entityName, `slug:${slug}`)
    return item
  }

  async findAll(): Promise<T[]> {
    return this.getData()
  }

  async create(data: Omit<T, keyof Entity>): Promise<T> {
    const items = await this.getData()
    
    const now = new Date()
    const newItem = {
      ...data,
      id: crypto.randomUUID(),
      slug: this.generateSlug(data),
      createdAt: now,
      updatedAt: now
    } as T

    try {
      this.schema.parse(newItem)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.message)
      }
      throw error
    }

    await this.setData([...items, newItem])
    return newItem
  }

  async update(id: string, data: Partial<Omit<T, keyof Entity>>): Promise<T> {
    const items = await this.getData()
    const index = items.findIndex(i => i.id === id)
    if (index === -1) throw new NotFoundError(this.entityName, id)

    const updatedItem = {
      ...items[index],
      ...data,
      updatedAt: new Date()
    } as T

    try {
      this.schema.parse(updatedItem)
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.message)
      }
      throw error
    }

    items[index] = updatedItem
    await this.setData(items)
    return updatedItem
  }

  async delete(id: string): Promise<void> {
    const items = await this.getData()
    const index = items.findIndex(i => i.id === id)
    if (index === -1) throw new NotFoundError(this.entityName, id)

    items.splice(index, 1)
    await this.setData(items)
  }

  protected generateSlug(data: any): string {
    // Subclasses should implement their own slug generation logic
    throw new Error('generateSlug not implemented')
  }
} 