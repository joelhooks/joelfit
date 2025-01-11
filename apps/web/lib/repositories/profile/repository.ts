import { BaseRepository, Entity } from '../base'
import { Profile, profileSchema } from './schema'

export class ProfileRepository extends BaseRepository<Profile, typeof profileSchema> {
  constructor() {
    super(profileSchema, 'Profile')
  }

  protected async getData(): Promise<Profile[]> {
    // For now, return hardcoded data. Later we'll implement proper storage
    return [
      {
        id: '1',
        slug: 'joel',
        name: 'Joel Hooks',
        metrics: {
          height: 75, // 6'3"
          weight: 251,
          age: 46,
          activityLevel: 'active',
          exerciseLevel: 'advanced'
        },
        targets: {
          androidFat: 24.0,
          gynoidFat: 18.0,
          agRatio: 1.0,
          visceralFat: 2.0,
          totalBodyFat: 20.0,
          rsmi: 10.0
        },
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ]
  }

  protected async setData(data: Profile[]): Promise<void> {
    // For now, just log the data. Later we'll implement proper storage
    console.log('Saving profiles:', data)
  }

  protected generateSlug(data: Partial<Profile>): string {
    if (!data.name) throw new Error('Name is required to generate slug')
    
    // Generate a URL-friendly slug from the name
    return data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
} 