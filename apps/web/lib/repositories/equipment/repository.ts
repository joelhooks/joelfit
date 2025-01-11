import { BaseRepository, SlugGenerationError } from '../base'
import { Equipment, equipmentSchema, type MaintenanceSchedule, type StorageGuide } from './schema'
import { initialEquipment, initialMaintenanceSchedule, initialStorageGuide } from './data'

export class EquipmentRepository extends BaseRepository<Equipment, typeof equipmentSchema> {
  private storageGuide: StorageGuide = initialStorageGuide
  private maintenanceSchedule: MaintenanceSchedule = initialMaintenanceSchedule
  private initialized = false
  protected items: Equipment[] = []

  constructor() {
    super(equipmentSchema, 'equipment')
  }

  private async ensureInitialized() {
    if (!this.initialized) {
      if (this.items.length === 0) {
        const now = new Date()
        this.items = initialEquipment.map((item, index) => ({
          ...item,
          id: `equipment-${index + 1}`,
          slug: this.generateSlug(item),
          createdAt: now,
          updatedAt: now
        }))
      }
      this.initialized = true
    }
  }

  protected generateSlug(data: Partial<Equipment>): string {
    if (!data.title) throw new SlugGenerationError('Title is required to generate slug')
    return data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }

  async getByCategory(category: Equipment['category']): Promise<Equipment[]> {
    await this.ensureInitialized()
    return this.items.filter(item => item.category === category)
  }

  async getRequired(): Promise<Equipment[]> {
    await this.ensureInitialized()
    return this.items.filter(item => item.required)
  }

  async getWithMaintenance(): Promise<Equipment[]> {
    await this.ensureInitialized()
    return this.items.filter(item => item.maintenance)
  }

  getStorageGuide(): StorageGuide {
    return this.storageGuide
  }

  getMaintenanceSchedule(): MaintenanceSchedule {
    return this.maintenanceSchedule
  }

  protected async getData(): Promise<Equipment[]> {
    await this.ensureInitialized()
    return this.items
  }

  protected async setData(data: Equipment[]): Promise<void> {
    this.items = data
    this.initialized = true
  }

  // Override base methods to ensure initialization
  async findById(id: string): Promise<Equipment> {
    await this.ensureInitialized()
    return super.findById(id)
  }

  async findBySlug(slug: string): Promise<Equipment> {
    await this.ensureInitialized()
    return super.findBySlug(slug)
  }

  async findAll(): Promise<Equipment[]> {
    await this.ensureInitialized()
    return super.findAll()
  }
} 