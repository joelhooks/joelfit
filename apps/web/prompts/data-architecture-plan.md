# Data Architecture Plan

## Current State Analysis

`joel.ts` currently serves as a monolithic configuration file containing:
- Personal metrics and targets
- Shopping list data
- Meal plan data
- Emergency backup data

Issues:
- No clear separation of concerns
- Hard-coded for a single user
- No relationships between data
- Mixed runtime/config data
- No clear data ownership
- Lacks extensibility

## Implementation Progress

### ✅ Phase 1.1: Core Infrastructure - Base Repository
- Created base entity interface and schema
- Implemented repository interface with CRUD operations
- Added custom error handling
- Added Zod schema validation
- Added type-safe data operations

### ✅ Phase 1.2: Core Infrastructure - Profile Repository
- Implemented profile schema with Zod validation
- Created ProfileRepository with proper types
- Added slug generation for profiles
- Set up initial hardcoded data
- Created singleton instance

### 🚧 Phase 1.3: Core Infrastructure - Next Steps
- Implement proper data persistence
- Add tests for base repository
- Add tests for profile repository
- Document repository pattern usage

## Proposed Repository Structure

### Core Repositories

#### ProfileRepository (`/repositories/profile`)
```typescript
interface Profile {
  id: string
  slug: string
  name: string
  metrics: {
    height: number
    weight: number
    age: number
    activityLevel: 'sedentary' | 'moderate' | 'active' | 'very-active'
    exerciseLevel: 'beginner' | 'intermediate' | 'advanced'
  }
  targets: {
    androidFat: number
    gynoidFat: number
    agRatio: number
    visceralFat: number
    totalBodyFat: number
    rsmi: number
  }
  createdAt: Date
  updatedAt: Date
}
```

#### MealPlanRepository (`/repositories/meal-plan`)
```typescript
interface MealPlan {
  id: string
  profileId: string // references Profile
  calories: number
  timeline: MealTimeline[]
  mealStructure: MealStructure
  emergencyBackup: EmergencyBackup
  createdAt: Date
  updatedAt: Date
}

interface MealTimeline {
  id: string
  mealPlanId: string
  time: string
  slot: string
  meal: string
  calories: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
  container: string // references Equipment slug
}
```

#### ShoppingRepository (`/repositories/shopping`)
```typescript
interface ShoppingList {
  id: string
  profileId: string // references Profile
  weeklyItems: {
    meat: string[]
    dairy: string[]
    produce: string[]
    frozen: string[]
    bulk: string[]
  }
  pantryStaples: {
    oils: string[]
    seasonings: string[]
    sauces: string[]
    dryGoods: string[]
  }
  tips: {
    buying: string[]
    storage: string[]
  }
  createdAt: Date
  updatedAt: Date
}
```

### Supporting Repositories

#### EquipmentRepository (`/repositories/equipment`)
```typescript
interface Equipment {
  id: string
  slug: string
  title: string
  description: string
  link: string
  price: number
  category: 'storage' | 'accessories' | 'appliances' | 'measurement'
  required: boolean
  maintenance?: string
  createdAt: Date
  updatedAt: Date
}
```

#### RecipeRepository (`/repositories/recipe`)
```typescript
interface Recipe {
  id: string
  slug: string
  title: string
  category: 'protein' | 'carb' | 'vegetable' | 'sauce'
  ingredients: string[]
  instructions: string[]
  macros: {
    protein: number
    carbs: number
    fat: number
    calories: number
  }
  equipment: string[] // references Equipment slugs
  createdAt: Date
  updatedAt: Date
}
```

## Implementation Strategy

### Phase 1: Core Infrastructure
1. Create repository base class with common CRUD operations
2. Implement Zod schemas for all entities
3. Set up proper TypeScript types and interfaces
4. Create repository instances with proper DI

### Phase 2: Data Migration
1. Move profile data to ProfileRepository
2. Move meal plan data to MealPlanRepository
3. Move shopping data to ShoppingRepository
4. Establish relationships between repositories

### Phase 3: API Layer
1. Create type-safe server actions for each repository
2. Implement proper error handling
3. Add validation middleware
4. Set up caching strategy

### Phase 4: UI Updates
1. Update components to use new repository pattern
2. Implement loading and error states
3. Add optimistic updates where appropriate
4. Ensure type safety throughout

## Impact Analysis

### Affected Components
- Profile page
- Meal plan page
- Shopping page
- Equipment page
- Framework page
- Recipe pages

### Benefits
1. **Extensibility**
   - Easy to add new profiles
   - Modular data structure
   - Clear relationships

2. **Type Safety**
   - Runtime validation with Zod
   - Compile-time checks
   - Clear data ownership

3. **Performance**
   - Granular caching
   - Optimistic updates
   - Proper data loading

4. **Maintainability**
   - Clear separation of concerns
   - Testable repositories
   - Consistent patterns

### Considerations
1. **Data Migration**
   - Need strategy for existing data
   - Version control for schemas
   - Backward compatibility

2. **Performance Impact**
   - Additional network requests
   - Cache invalidation
   - Bundle size

3. **Development Workflow**
   - More boilerplate initially
   - Clear patterns to follow
   - Better long-term maintainability

## Next Steps

1. Create repository base class and core interfaces
2. Start with ProfileRepository as proof of concept
3. Gradually migrate other repositories
4. Update components one at a time
5. Add comprehensive tests
6. Document patterns and best practices 