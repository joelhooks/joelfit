import { BaseRepository, NotFoundError, SlugGenerationError } from '../base'
import { MealPlan, mealPlanSchema } from './schema'
import { initialMealPlan } from './data'
import { randomUUID } from 'crypto'

export class MealPlanRepository extends BaseRepository<MealPlan, typeof mealPlanSchema> {
  private initialized = false
  protected items: MealPlan[] = []

  constructor() {
    super(mealPlanSchema, 'meal plan')
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      if (this.items.length === 0) {
        const now = new Date()
        const id = randomUUID()
        this.items = [{
          ...initialMealPlan,
          id,
          slug: this.generateSlug({ id, name: initialMealPlan.name }),
          createdAt: now,
          updatedAt: now
        }]
      }
      this.initialized = true
    }
  }

  protected async getData(): Promise<MealPlan[]> {
    await this.ensureInitialized()
    return this.items
  }

  protected async setData(data: MealPlan[]): Promise<void> {
    this.items = data
    this.initialized = true
  }

  protected generateSlug(data: Partial<MealPlan>): string {
    if (!data.name) throw new SlugGenerationError('Name is required for meal plan slug generation')
    return data.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')
  }

  // Helper method for tests
  getDefaultMealPlanId(): string {
    return this.items[0]?.id ?? ''
  }

  // Override base methods to ensure initialization
  async findById(id: string): Promise<MealPlan> {
    await this.ensureInitialized()
    return super.findById(id)
  }

  async findBySlug(slug: string): Promise<MealPlan> {
    await this.ensureInitialized()
    return super.findBySlug(slug)
  }

  async findAll(): Promise<MealPlan[]> {
    await this.ensureInitialized()
    return super.findAll()
  }

  // Get the default meal plan
  async getMealPlan(): Promise<MealPlan> {
    await this.ensureInitialized()
    const mealPlans = await this.findAll()
    if (!mealPlans[0]) throw new NotFoundError('meal plan', 'default')
    return mealPlans[0]
  }
} 