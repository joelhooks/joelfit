import { BaseRepository, Entity, SlugGenerationError } from '../base'
import { Equipment, equipmentSchema } from './schema'

export class EquipmentRepository extends BaseRepository<Equipment, typeof equipmentSchema> {
  protected items: Equipment[] = [
    {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      slug: 'meal-containers',
      title: '3-Compartment Glass Containers',
      description: 'Glass meal prep containers with 3 compartments for portion control and food separation.',
      link: 'https://amzn.to/3ZWylEa',
      price: 52.99,
      category: 'storage',
      required: true,
      maintenance: 'Hand wash recommended, dishwasher safe on top rack.',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 'b9a87e89-1234-4567-8901-abcdef123456',
      slug: 'mason-jars',
      title: 'Wide Mouth Mason Jars',
      description: 'Wide mouth mason jars for overnight oats and smoothie prep.',
      link: 'https://amzn.to/3PjL4vT',
      price: 22.99,
      category: 'storage',
      required: true,
      maintenance: 'Dishwasher safe, replace lids yearly.',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 'c9b98f90-9876-5432-1098-fedcba987654',
      slug: 'food-scale',
      title: 'OXO Good Grips 11-Pound Stainless Steel Food Scale',
      description: 'Digital food scale with pull-out display and precise measurements.',
      link: 'https://amzn.to/3Wb3BhJ',
      price: 48.41,
      category: 'measurement',
      required: true,
      maintenance: 'Wipe clean with damp cloth, replace batteries as needed.',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    }
  ]

  constructor() {
    super(equipmentSchema, 'equipment')
  }

  protected generateSlug(data: Partial<Equipment>): string {
    if (!data.title) throw new SlugGenerationError('Title is required to generate slug')
    return data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }

  async getByCategory(category: Equipment['category']): Promise<Equipment[]> {
    const items = await this.findAll()
    return items.filter(item => item.category === category)
  }

  async getRequired(): Promise<Equipment[]> {
    const items = await this.findAll()
    return items.filter(item => item.required)
  }

  async getWithMaintenance(): Promise<Equipment[]> {
    const items = await this.findAll()
    return items.filter(item => item.maintenance)
  }

  protected async getData(): Promise<Equipment[]> {
    return this.items
  }

  protected async setData(data: Equipment[]): Promise<void> {
    this.items = data
    console.log('Saved equipment:', this.items)
  }

  getDefaultEquipmentId(): string {
    return this.items[0]?.id ?? ''
  }
} 