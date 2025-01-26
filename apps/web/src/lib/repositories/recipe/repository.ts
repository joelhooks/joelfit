import { Repository } from '../base'
import { type Recipe } from './schema'
import { recipeData } from './data'

export class RecipeRepository implements Repository<Recipe> {
  private data: Recipe[]

  constructor() {
    this.data = recipeData
  }

  async findById(id: string): Promise<Recipe> {
    const recipe = this.data.find((r) => r.id === id)
    if (!recipe) {
      throw new Error(`Recipe with id ${id} not found`)
    }
    return recipe
  }

  async findBySlug(slug: string): Promise<Recipe> {
    const recipe = this.data.find((r) => r.slug === slug)
    if (!recipe) {
      throw new Error(`Recipe with slug ${slug} not found`)
    }
    return recipe
  }

  async findAll(): Promise<Recipe[]> {
    return this.data
  }

  async create(data: Omit<Recipe, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
    throw new Error('Method not implemented.')
  }

  async update(id: string, data: Partial<Recipe>): Promise<Recipe> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
} 