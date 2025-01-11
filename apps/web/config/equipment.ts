import { z } from 'zod'

export const equipmentSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  link: z.string().url(),
  price: z.number(),
  category: z.enum(['storage', 'accessories', 'appliances', 'measurement']),
  required: z.boolean().optional(),
  maintenance: z.string().optional()
})

export type Equipment = z.infer<typeof equipmentSchema>
export type EquipmentSlug = Equipment['slug']

export const equipment = [
  {
    slug: 'meal-containers',
    title: 'PrepNaturals 5 Pack 34 Oz Glass Meal Prep Containers',
    description: 'Multi-compartment glass containers with lids, dishwasher/microwave/freezer/oven safe',
    link: 'https://amzn.to/3ZWylEa',
    price: 34.99,
    category: 'storage' as const,
    required: true,
    maintenance: 'Hand wash lids, glass containers are dishwasher safe'
  },
  {
    slug: 'mason-jars',
    title: 'Ball Wide Mouth Mason Jars (32 oz)',
    description: 'Perfect for overnight oats and food storage',
    link: 'https://amzn.to/3PjL4vT',
    price: 22.99,
    category: 'storage' as const,
    required: true,
    maintenance: 'Dishwasher safe, replace lids yearly'
  },
  {
    slug: 'mason-jar-lids',
    title: 'Ball Wide Mouth Plastic Storage Caps',
    description: 'Reusable plastic lids for mason jars',
    link: 'https://amzn.to/405PT0y',
    price: 9.99,
    category: 'storage' as const,
    required: true,
    maintenance: 'Hand wash, replace yearly'
  },
  {
    slug: 'smoothie-bags',
    title: 'OXO Good Grips Silicone Reusable Bag',
    description: 'Perfect for freezing smoothie ingredients',
    link: 'https://amzn.to/3C7pM1g',
    price: 18.99,
    category: 'storage' as const,
    required: true,
    maintenance: 'Dishwasher safe'
  },
  {
    slug: 'chalk-markers',
    title: 'Chalk Markers',
    description: 'For labeling containers and jars',
    link: 'https://amzn.to/40kYAWq',
    price: 6.70,
    category: 'accessories' as const,
    required: false,
    maintenance: 'Wipe clean with damp cloth'
  },
  {
    slug: 'rice-cooker',
    title: 'Zojirushi NS-TSC10 5-1/2-Cup (Uncooked) Micom Rice Cooker and Warmer',
    description: 'Fuzzy logic rice cooker with multiple settings',
    link: 'https://amzn.to/3DA5cXN',
    price: 199.99,
    category: 'appliances' as const,
    required: true,
    maintenance: 'Clean after each use, wipe exterior with damp cloth'
  },
  {
    slug: 'food-scale',
    title: 'OXO Good Grips 11-Pound Stainless Steel Food Scale',
    description: 'Digital scale with pull-out display for easy reading under large plates',
    link: 'https://amzn.to/3Wb3BhJ',
    price: 48.41,
    category: 'measurement' as const,
    required: true,
    maintenance: 'Wipe clean with damp cloth, replace batteries as needed'
  }
] as const;

class EquipmentRepository {
  private equipmentRecord: Record<EquipmentSlug, Equipment>

  constructor(equipment: readonly Equipment[]) {
    this.equipmentRecord = equipment.reduce<Record<EquipmentSlug, Equipment>>(
      (acc, item) => ({ ...acc, [item.slug]: item }),
      {} as Record<EquipmentSlug, Equipment>
    )
  }

  get(slug: EquipmentSlug): Equipment {
    const item = this.equipmentRecord[slug]
    if (!item) {
      throw new Error(`Equipment with slug ${slug} not found`)
    }
    return item
  }

  getAll(): Equipment[] {
    return Object.values(this.equipmentRecord)
  }

  getByCategory(category: Equipment['category']): Equipment[] {
    return this.getAll().filter(item => item.category === category)
  }

  getRequired(): Equipment[] {
    return this.getAll().filter(item => item.required)
  }

  getWithMaintenance(): Equipment[] {
    return this.getAll().filter(item => item.maintenance)
  }

  has(slug: EquipmentSlug): boolean {
    return slug in this.equipmentRecord
  }
}

export const equipmentRepo = new EquipmentRepository(equipment)

// Storage and maintenance guides
export const storageGuide = {
  containers: {
    cleaning: 'Hand wash lids, dishwasher safe for glass',
    rotation: 'Replace annually or if damaged',
    storage: 'Store lids separately to prevent odors'
  },
  bags: {
    cleaning: 'Dishwasher safe',
    drying: 'Air dry completely before storing',
    storage: 'Store flat or rolled'
  }
}

export const maintenanceSchedule = {
  daily: ['Wipe containers after use', 'Clean rice cooker'],
  weekly: ['Deep clean containers', 'Check container seals'],
  monthly: ['Deep clean rice cooker', 'Check all equipment for damage'],
  quarterly: ['Calibrate scale', 'Replace damaged items'],
  yearly: ['Replace container lids', 'Replace mason jar lids']
} 