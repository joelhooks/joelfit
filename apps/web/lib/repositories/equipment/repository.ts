import { BaseRepository, SlugGenerationError } from '../base'
import { Equipment, equipmentSchema, type MaintenanceSchedule, type StorageGuide } from './schema'
import { initialEquipment, initialMaintenanceSchedule, initialStorageGuide } from './data'

export class EquipmentRepository extends BaseRepository<Equipment, typeof equipmentSchema> {
  private storageGuide: StorageGuide = initialStorageGuide
  private maintenanceSchedule: MaintenanceSchedule = initialMaintenanceSchedule
  protected items: Equipment[] = []

  constructor() {
    super(equipmentSchema, 'equipment')
    this.initializeData()
  }

  private async initializeData() {
    // Only initialize if no data exists
    const existingData = await this.findAll()
    if (existingData.length === 0) {
      await Promise.all(
        initialEquipment.map(item => this.create(item))
      )
    }
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

  getStorageGuide(): StorageGuide {
    return this.storageGuide
  }

  getMaintenanceSchedule(): MaintenanceSchedule {
    return this.maintenanceSchedule
  }

  protected async getData(): Promise<Equipment[]> {
    return this.items
  }

  protected async setData(data: Equipment[]): Promise<void> {
    this.items = data
  }
} 