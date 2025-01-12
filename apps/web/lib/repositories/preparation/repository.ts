import { Repository } from '../base'
import { type Preparation } from './schema'
import { preparationData } from './data'

export class PreparationRepository implements Repository<Preparation> {
  private data: Preparation[]

  constructor() {
    this.data = preparationData
  }

  async findById(id: string): Promise<Preparation> {
    const preparation = this.data.find((p) => p.id === id)
    if (!preparation) {
      throw new Error(`Preparation with id ${id} not found`)
    }
    return preparation
  }

  async findBySlug(slug: string): Promise<Preparation> {
    const preparation = this.data.find((p) => p.slug === slug)
    if (!preparation) {
      throw new Error(`Preparation with slug ${slug} not found`)
    }
    return preparation
  }

  async findAll(): Promise<Preparation[]> {
    return this.data
  }

  async create(data: Omit<Preparation, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Preparation> {
    throw new Error('Method not implemented.')
  }

  async update(id: string, data: Partial<Preparation>): Promise<Preparation> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
} 