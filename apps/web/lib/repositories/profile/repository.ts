import { BaseRepository, SlugGenerationError } from '../base'
import { Profile, profileSchema } from './schema'
import { initialProfile } from './data'

export class ProfileRepository extends BaseRepository<Profile, typeof profileSchema> {
  private initialized = false
  protected items: Profile[] = []

  constructor() {
    super(profileSchema, 'profile')
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      if (this.items.length === 0) {
        const now = new Date()
        this.items = [{
          ...initialProfile,
          id: 'profile-1',
          slug: this.generateSlug(initialProfile),
          createdAt: now,
          updatedAt: now
        }]
      }
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

  protected generateSlug(data: Partial<Profile>): string {
    if (!data.name) throw new SlugGenerationError('Name is required to generate slug')
    
    // Generate a URL-friendly slug from the name
    return data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
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
} 