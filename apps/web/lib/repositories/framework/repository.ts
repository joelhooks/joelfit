import { BaseRepository, NotFoundError } from '../base'
import { type Framework, frameworkSchema } from './schema'
import { initialFramework } from './data'

export class FrameworkRepository extends BaseRepository<Framework, typeof frameworkSchema> {
  private initialized = false
  protected items: Framework[] = []

  constructor(schema = frameworkSchema, entityName = 'Framework') {
    super(schema, entityName)
  }

  private ensureInitialized() {
    if (!this.initialized && this.items.length === 0) {
      const now = new Date()
      this.items = [
        {
          id: crypto.randomUUID(),
          slug: 'core-framework',
          ...initialFramework,
          createdAt: now,
          updatedAt: now
        }
      ]
      this.initialized = true
    }
  }

  protected async getData(): Promise<Framework[]> {
    this.ensureInitialized()
    return this.items
  }

  protected async setData(data: Framework[]): Promise<void> {
    this.items = data
    this.initialized = true
  }

  public generateSlug(framework: Framework): string {
    return 'core-framework'
  }

  async findById(id: string): Promise<Framework> {
    this.ensureInitialized()
    const framework = this.items.find(f => f.id === id)
    if (!framework) {
      throw new NotFoundError('Framework', id)
    }
    return framework
  }

  async findBySlug(slug: string): Promise<Framework> {
    this.ensureInitialized()
    const framework = this.items.find(f => f.slug === slug)
    if (!framework) {
      throw new NotFoundError('Framework', `slug:${slug}`)
    }
    return framework
  }

  async getFramework(): Promise<Framework> {
    this.ensureInitialized()
    const framework = this.items[0]
    if (!framework) {
      throw new NotFoundError('Framework', 'default')
    }
    return framework
  }
} 