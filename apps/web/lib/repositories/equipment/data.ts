import { type Equipment, type MaintenanceSchedule, type StorageGuide } from './schema'

export const initialEquipment: Omit<Equipment, keyof { id: string; slug: string; createdAt: Date; updatedAt: Date }>[] = [
  {
    title: 'PrepNaturals 5 Pack 34 Oz Glass Meal Prep Containers',
    description: 'Multi-compartment glass containers with lids, dishwasher/microwave/freezer/oven safe',
    link: 'https://amzn.to/3ZWylEa',
    price: 34.99,
    category: 'storage',
    required: true,
    maintenance: 'Hand wash lids, glass containers are dishwasher safe'
  },
  {
    title: 'Ball Wide Mouth Mason Jars (32 oz)',
    description: 'Perfect for overnight oats and food storage',
    link: 'https://amzn.to/3PjL4vT',
    price: 22.99,
    category: 'storage',
    required: true,
    maintenance: 'Dishwasher safe, replace lids yearly'
  },
  {
    title: 'Ball Wide Mouth Plastic Storage Caps',
    description: 'Reusable plastic lids for mason jars',
    link: 'https://amzn.to/405PT0y',
    price: 9.99,
    category: 'storage',
    required: true,
    maintenance: 'Hand wash, replace yearly'
  },
  {
    title: 'OXO Good Grips Silicone Reusable Bag',
    description: 'Perfect for freezing smoothie ingredients',
    link: 'https://amzn.to/3C7pM1g',
    price: 18.99,
    category: 'storage',
    required: true,
    maintenance: 'Dishwasher safe'
  },
  {
    title: 'Chalk Markers',
    description: 'For labeling containers and jars',
    link: 'https://amzn.to/40kYAWq',
    price: 6.70,
    category: 'accessories',
    required: false,
    maintenance: 'Wipe clean with damp cloth'
  },
  {
    title: 'Zojirushi NS-TSC10 5-1/2-Cup (Uncooked) Micom Rice Cooker and Warmer',
    description: 'Fuzzy logic rice cooker with multiple settings',
    link: 'https://amzn.to/3DA5cXN',
    price: 199.99,
    category: 'appliances',
    required: true,
    maintenance: 'Clean after each use, wipe exterior with damp cloth'
  },
  {
    title: 'OXO Good Grips 11-Pound Stainless Steel Food Scale',
    description: 'Digital scale with pull-out display for easy reading under large plates',
    link: 'https://amzn.to/3Wb3BhJ',
    price: 48.41,
    category: 'measurement',
    required: true,
    maintenance: 'Wipe clean with damp cloth, replace batteries as needed'
  }
]

export const initialStorageGuide: StorageGuide = {
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

export const initialMaintenanceSchedule: MaintenanceSchedule = {
  daily: ['Wipe containers after use', 'Clean rice cooker'],
  weekly: ['Deep clean containers', 'Check container seals'],
  monthly: ['Deep clean rice cooker', 'Check all equipment for damage'],
  quarterly: ['Calibrate scale', 'Replace damaged items'],
  yearly: ['Replace container lids', 'Replace mason jar lids']
} 