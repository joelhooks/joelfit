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
      this.initialized = true
    }
  }

  public generateSlug(data: Partial<Equipment>): string {
    if (!data.title) throw new SlugGenerationError('Equipment title is required for slug generation')
    return data.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
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

  async reset(): Promise<void> {
    this.items = []
    this.initialized = false
  }
} 