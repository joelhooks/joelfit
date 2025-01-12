import { BaseRepository, ValidationError } from '../base'
import { Exercise, exerciseSchema, type NewExercise } from './schema'
import { initialExercises } from './data'

export class ExerciseRepository extends BaseRepository<Exercise, typeof exerciseSchema> {
  private initialized = false
  protected items: Exercise[] = []
  private shouldLoadInitialData = true

  constructor() {
    super(exerciseSchema, 'exercise')
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      if (this.items.length === 0 && this.shouldLoadInitialData) {
        const now = new Date()
        this.items = initialExercises.map((item: NewExercise) => ({
          ...item,
          id: crypto.randomUUID(),
          slug: this.generateSlug(item),
          createdAt: now,
          updatedAt: now
        }))
      }
      this.initialized = true
    }
  }

  public generateSlug(data: Partial<Exercise>): string {
    if (!data.title) throw new ValidationError('Title is required')
    return data.title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  async getByCategory(category: Exercise['category']): Promise<Exercise[]> {
    await this.ensureInitialized()
    return this.items.filter(item => item.category === category)
  }

  async getByTarget(target: Exercise['targetArea'][number]): Promise<Exercise[]> {
    await this.ensureInitialized()
    return this.items.filter(item => item.targetArea.includes(target))
  }

  async getByEquipment(equipment: string): Promise<Exercise[]> {
    await this.ensureInitialized()
    return this.items.filter(item => item.equipment.includes(equipment))
  }

  async search(query: string): Promise<Exercise[]> {
    await this.ensureInitialized()
    const searchTerms = query.toLowerCase().split(/\s+/)
    return this.items.filter(item => {
      const searchText = [
        item.title,
        ...item.execution,
        item.keyPoints,
        ...item.equipment,
        ...item.targetArea
      ].join(' ').toLowerCase()
      
      return searchTerms.every(term => searchText.includes(term))
    })
  }

  protected async getData(): Promise<Exercise[]> {
    await this.ensureInitialized()
    return this.items
  }

  protected async setData(data: Exercise[]): Promise<void> {
    this.items = data
    this.initialized = true
  }

  // For testing only
  async reset(): Promise<void> {
    this.items = []
    this.initialized = false
    this.shouldLoadInitialData = false
  }
} 