export * from './schema'
export * from './repository'

import { MealPlanRepository } from './repository'

// Create a singleton instance
export const mealPlanRepo = new MealPlanRepository() 