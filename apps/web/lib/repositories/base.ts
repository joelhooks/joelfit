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

export class SlugGenerationError extends RepositoryError {
  constructor(message: string) {
    super(message, 'SLUG_GENERATION_ERROR')
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
export abstract class BaseRepository<
  T extends Entity,
  TSchema extends z.ZodObject<any>
> implements Repository<T> {
  protected items: T[] = []

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
    try {
      // Generate slug first
      const slug = this.generateSlug(data)

      // Then validate input data
      const inputSchema = this.schema.omit({
        id: true,
        slug: true,
        createdAt: true,
        updatedAt: true
      })
      const result = inputSchema.safeParse(data)
      if (!result.success) {
        throw new ValidationError(`Invalid ${this.entityName.toLowerCase()}: ${result.error.message}`)
      }

      // Create the complete item
      const now = new Date()
      const tempItem = {
        ...data,
        id: crypto.randomUUID(),
        slug,
        createdAt: now,
        updatedAt: now
      } as T

      // Save the item
      const items = await this.getData()
      await this.setData([...items, tempItem])
      return tempItem
    } catch (error) {
      if (error instanceof Error && error.name === 'SlugGenerationError') {
        throw error
      }
      if (error instanceof z.ZodError) {
        throw new ValidationError(`Invalid ${this.entityName.toLowerCase()}: ${error.message}`)
      }
      throw error
    }
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

    const result = this.schema.safeParse(updatedItem)
    if (!result.success) {
      throw new ValidationError(`Invalid ${this.entityName.toLowerCase()}: ${result.error.message}`)
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

  public generateSlug(data: any): string {
    // Subclasses should implement their own slug generation logic
    throw new Error('generateSlug not implemented')
  }
} 