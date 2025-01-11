import { BaseRepository, SlugGenerationError } from '../base'
import { MealPlan, mealPlanSchema } from './schema'

export class MealPlanRepository extends BaseRepository<MealPlan, typeof mealPlanSchema> {
  constructor() {
    super(mealPlanSchema, 'MealPlan')
    // Initialize with hardcoded data
    this.items = [
      {
        id: crypto.randomUUID(),
        slug: 'joel',
        name: 'Joel\'s Meal Plan',
        totalCalories: 2400,
        timeline: [
          {
            time: '7:00 AM',
            slot: 'Breakfast',
            meal: 'Overnight Oats',
            calories: 400,
            protein: 30,
            carbs: 45,
            fat: 12,
            container: 'Mason Jar'
          },
          {
            time: '10:00 AM',
            slot: 'Mid-Morning',
            meal: 'Protein Shake',
            calories: 200,
            protein: 25,
            carbs: 15,
            fat: 5,
            container: 'Shaker Bottle'
          },
          {
            time: '1:00 PM',
            slot: 'Lunch',
            meal: 'Chicken & Rice Bowl',
            calories: 600,
            protein: 45,
            carbs: 60,
            fat: 20,
            container: '3-Compartment Container'
          },
          {
            time: '4:00 PM',
            slot: 'Mid-Afternoon',
            meal: 'Greek Yogurt & Berries',
            calories: 300,
            protein: 20,
            carbs: 30,
            fat: 10,
            container: 'Mason Jar'
          },
          {
            time: '7:00 PM',
            slot: 'Dinner',
            meal: 'Salmon & Vegetables',
            calories: 700,
            protein: 50,
            carbs: 45,
            fat: 35,
            container: '3-Compartment Container'
          },
          {
            time: '9:00 PM',
            slot: 'Night Snack',
            meal: 'Protein Pudding',
            calories: 200,
            protein: 25,
            carbs: 15,
            fat: 5,
            container: 'Mason Jar'
          }
        ],
        structure: {
          breakfast: [
            { name: 'Rolled Oats', amount: '1 cup', container: 'Mason Jar' },
            { name: 'Protein Powder', amount: '1 scoop' },
            { name: 'Chia Seeds', amount: '1 tbsp' },
            { name: 'Almond Milk', amount: '1 cup' }
          ],
          lunch: [
            { name: 'Chicken Breast', amount: '6 oz', container: '3-Compartment Container' },
            { name: 'Brown Rice', amount: '1 cup' },
            { name: 'Mixed Vegetables', amount: '2 cups' }
          ],
          midDayMeal: [
            { name: 'Greek Yogurt', amount: '1 cup', container: 'Mason Jar' },
            { name: 'Mixed Berries', amount: '1 cup' },
            { name: 'Granola', amount: '1/4 cup' }
          ],
          dinner: [
            { name: 'Salmon', amount: '8 oz', container: '3-Compartment Container' },
            { name: 'Sweet Potato', amount: '1 medium' },
            { name: 'Broccoli', amount: '2 cups' }
          ],
          nightSnack: [
            { name: 'Protein Powder', amount: '1 scoop', container: 'Mason Jar' },
            { name: 'Almond Milk', amount: '1 cup' },
            { name: 'Chia Seeds', amount: '1 tbsp' }
          ]
        },
        emergencyBackup: [
          'Protein Bars',
          'Mixed Nuts',
          'Beef Jerky',
          'Frozen Turkey Meatballs',
          'Frozen Rice',
          'Frozen Vegetables'
        ],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ]
  }

  // Helper method for tests
  getDefaultMealPlanId(): string {
    return this.items[0]?.id ?? ''
  }

  protected async getData(): Promise<MealPlan[]> {
    return this.items
  }

  protected async setData(data: MealPlan[]): Promise<void> {
    this.items = data
    // For now, just log the data. Later we'll implement proper storage
    console.log('Saving meal plans:', data)
  }

  protected generateSlug(data: Partial<MealPlan>): string {
    if (!data.name) throw new SlugGenerationError('Name is required to generate slug')
    
    // Generate a URL-friendly slug from the name
    return data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
} 