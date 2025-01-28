import { BaseRepository, SlugGenerationError } from '../base'
import { Profile, profileSchema } from './schema'
import { initialProfile } from './data'
import { MealPlanRepository } from '../meal-plan/repository'
import { MealPlan } from '../meal-plan/schema'

export class ProfileRepository extends BaseRepository<Profile, typeof profileSchema> {
  private initialized = false
  protected items: Profile[] = [initialProfile]
  private mealPlanRepository: MealPlanRepository

  constructor(mealPlanRepository?: MealPlanRepository) {
    super(profileSchema, 'profile')
    this.mealPlanRepository = mealPlanRepository ?? new MealPlanRepository()
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      this.initialized = true
    }
  }

  protected async getData(): Promise<Profile[]> {
    await this.ensureInitialized()
    return this.items
  }

  protected async setData(data: Profile[]): Promise<void> {
    this.items = data
    this.initialized = true
  }

  public generateSlug(data: Partial<Profile>): string {
    if (!data.name) throw new SlugGenerationError('Profile name is required for slug generation')
    return data.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
  }

  // Helper method for tests
  getDefaultProfileId(): string {
    return this.items[0]?.id ?? ''
  }

  // Override base methods to ensure initialization
  async findById(id: string): Promise<Profile> {
    await this.ensureInitialized()
    return super.findById(id)
  }

  async findBySlug(slug: string): Promise<Profile> {
    await this.ensureInitialized()
    return super.findBySlug(slug)
  }

  async findAll(): Promise<Profile[]> {
    await this.ensureInitialized()
    return super.findAll()
  }

  async reset(): Promise<void> {
    this.items = []
    this.initialized = false
  }

  async findByIdWithMealPlan(id: string): Promise<Profile & { mealPlan: MealPlan }> {
    const profile = await this.findById(id)
    const mealPlan = await this.mealPlanRepository.findById(profile.mealPlanId)
    return { ...profile, mealPlan }
  }

  async findBySlugWithMealPlan(slug: string): Promise<Profile & { mealPlan: MealPlan }> {
    const profile = await this.findBySlug(slug)
    const mealPlan = await this.mealPlanRepository.findById(profile.mealPlanId)
    return { ...profile, mealPlan }
  }

  async updateMealPlan(profileId: string, mealPlanId: string): Promise<Profile> {
    const profile = await this.findById(profileId)
    const updatedProfile = await this.update(profileId, { ...profile, mealPlanId })
    return updatedProfile
  }
} 