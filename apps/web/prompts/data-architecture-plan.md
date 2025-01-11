# JoelFit Data Architecture Plan

## Phase 1: Repository Pattern Implementation ✅

### 1.1 Base Repository ✅
- [x] Type-safe CRUD operations
- [x] Zod validation
- [x] Error handling
- [x] Slug support
- [x] Test coverage

### 1.2 Profile Repository ✅
- [x] Strong typing
- [x] Proper data structure
- [x] Slug generation
- [x] Initial data setup
- [x] Test coverage

### 1.3 Meal Plan Repository ✅
- [x] Strong typing with Zod schemas
- [x] Proper data structure for meal plans
- [x] Slug generation from names
- [x] Initial data setup
- [x] Test coverage
- [x] Clean error handling

### 1.4 Equipment Repository ✅
- [x] Strong typing with Zod schemas
- [x] Proper data structure for equipment
- [x] Slug generation from names
- [x] Initial data setup
- [x] Test coverage
- [x] Clean error handling

### 1.5 Shopping Repository ✅
- [x] Strong typing with Zod schemas
- [x] Proper data structure for shopping lists
- [x] Slug generation from names
- [x] Initial data setup
- [x] Test coverage
- [x] Clean error handling

## Phase 2: Config to Repository Migration 🚧

### 2.1 Route Analysis ✅
- [x] Audit /eat routes for config usage
  - equipment: uses equipmentRepo, storageGuide, maintenanceSchedule
  - framework: uses equipmentRepo, has inline data
  - meal-plan: uses mealPlan from joel config, has inline data
  - shopping: uses shoppingList from joel config
- [x] Map config data to repositories
- [x] Document data flow changes
- [x] Identify shared components needing updates

### 2.2 Equipment Migration ✅
- [x] Move equipment config to repository data
- [x] Update equipment routes
- [x] Update dependent components
- [x] Add tests for new implementations

### 2.3 Profile Migration ✅
- [x] Move profile config to repository data
- [x] Update schema to match config structure
- [x] Add support for strength areas and action plan
- [x] Update tests for new schema
- [x] Fix initialization logic

### 2.4 Framework Migration ✅
- [x] Create framework schema
- [x] Set up initial data structure
- [x] Implement repository with UUID support
- [x] Add comprehensive test coverage
- [x] Fix validation and error handling

### 2.5 Meal Plan Migration ✅
- [x] Update schema to match config structure
- [x] Add support for portions and weekly prep
- [x] Set up initial data from config
- [x] Implement repository with UUID support
- [x] Add comprehensive test coverage

### 2.6 Shopping Migration ✅
- [x] Move shopping config to repository data
- [x] Update shopping routes
- [x] Update dependent components
- [x] Add tests for new implementations

## Phase 3: UI Integration 🚧
### 3.1 Component Analysis ✅
- [x] Audit all components using config data
  - Equipment: using repository, needs loading/error states
  - Framework: partial repository usage, has hardcoded data
  - Meal Plan: using old config, needs full migration
  - Shopping: using old config, needs full migration
- [x] Map component data dependencies
  - Equipment -> EquipmentRepository
  - Framework -> FrameworkRepository + EquipmentRepository
  - Meal Plan -> MealPlanRepository
  - Shopping -> ShoppingRepository
- [x] Identify shared patterns
  - Async data fetching with loading states
  - Error boundary/fallback handling
  - Repository initialization pattern
  - Consistent UI for loading/error states
- [x] Document required changes
  - Add loading states to all pages
  - Add error handling to all pages
  - Migrate remaining config data to repositories
  - Create shared components for loading/error states

### 3.2 Component Updates 🚧

#### 3.2.1 Shared Components
- [x] Add loading components to @repo/ui ✅
  - Base Skeleton component for loading states ✅
  - PageSkeleton: for initial page load ✅
  - CardSkeleton: for individual card items ✅
  - ListSkeleton: for list items ✅
  - StatsSkeleton: for metric displays 🚧
- [x] Add error components to @repo/ui ✅
  - ErrorBoundary: catch and display errors ✅
  - NotFound: for missing data ✅
  - ErrorFallback: for generic errors ✅
  - RetryButton: for retrying failed operations ✅
- [x] Add repository components to @repo/core ✅
  - AsyncData: wrapper for loading/error states ✅
  - RepositoryProvider: context for repository instances ✅
  - useRepository: hook for accessing repositories ✅
  - REMOVED: Using server components with direct data loading instead

#### 3.2.2 Page Updates
- [x] Update Framework page ✅
  - [x] Convert to server component ✅
  - [x] Load data directly in server component ✅
  - [x] Keep consistent styling with shadcn/ui ✅
- [ ] Update Meal Plan page 🚧
  - [ ] Convert to server component
  - [ ] Load data directly from MealPlanRepository
  - [ ] Keep consistent styling with shadcn/ui
- [ ] Update Shopping page
  - [ ] Convert to server component
  - [ ] Load data directly from ShoppingRepository
  - [ ] Keep consistent styling with shadcn/ui
- [ ] Update Equipment page
  - [ ] Convert to server component
  - [ ] Load data directly from EquipmentRepository
  - [ ] Keep consistent styling with shadcn/ui

### 3.3 Testing & Cleanup
- [ ] Basic error handling where needed
- [ ] Remove old config files
- [ ] Clean up unused code 