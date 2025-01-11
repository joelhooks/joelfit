import { BaseRepository, NotFoundError, SlugGenerationError } from '../base'
import { Framework, frameworkSchema } from './schema'
import { initialFramework } from './data'
import { randomUUID } from 'crypto'

export class FrameworkRepository extends BaseRepository<Framework, typeof frameworkSchema> {
  private initialized = false
  protected items: Framework[] = []

  constructor() {
    super(frameworkSchema, 'framework')
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      if (this.items.length === 0) {
        const now = new Date()
        const id = randomUUID()
        this.items = [{
          ...initialFramework,
          id,
          slug: this.generateSlug({ id }),
          createdAt: now,
          updatedAt: now
        }]
      }
      this.initialized = true
    }
  }

  protected async getData(): Promise<Framework[]> {
    await this.ensureInitialized()
    return this.items
  }

  protected async setData(data: Framework[]): Promise<void> {
    this.items = data
    this.initialized = true
  }

  protected generateSlug(data: Partial<Framework>): string {
    // For framework, we'll use a simple slug since it's a singleton
    return 'core-framework'
  }

  // Helper method for tests
  getDefaultFrameworkId(): string {
    return this.items[0]?.id ?? ''
  }

  // Override base methods to ensure initialization
  async findById(id: string): Promise<Framework> {
    await this.ensureInitialized()
    return super.findById(id)
  }

  async findBySlug(slug: string): Promise<Framework> {
    await this.ensureInitialized()
    return super.findBySlug(slug)
  }

  async findAll(): Promise<Framework[]> {
    await this.ensureInitialized()
    return super.findAll()
  }

  // Get the default framework (since it's a singleton)
  async getFramework(): Promise<Framework> {
    await this.ensureInitialized()
    const frameworks = await this.findAll()
    if (!frameworks[0]) throw new NotFoundError('framework', 'default')
    return frameworks[0]
  }
} 