# JoelFit Eat Route Improvement Plan

## Current State Analysis
The `/eat` route serves as the core of the meal prep system, with a solid foundation but room for refinement:
- Good information architecture
- Clean but inconsistent component patterns
- Mixed typography patterns
- Some redundant layouts
- Opportunity for better interactivity

## 🎯 Phase 1: Structure & Types

### Information Architecture
```typescript
/eat
├── page.tsx (Landing/Overview)
├── framework/ (Core System)
├── meal-plan/ (Meal Structure)
├── shopping/ (Lists & Inventory)
├── equipment/ (Container System)
├── preparation/ (Workflow)
├── recipes/ (Base Components)
└── tracking/ (Progress & QC)
```

### Core Type System
```typescript
// Meal System Types
interface MealSlot {
  id: string
  timing: string
  macros: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  portions: {
    protein: string
    carbs: string
    vegetables: string
  }
}

// Container System Types
interface Container {
  type: 'main' | 'breakfast' | 'smoothie' | 'sauce'
  capacity: string
  sections: Section[]
  features: string[]
  quantity: number
}

// Shopping System Types
interface ShoppingItem {
  name: string
  category: 'protein' | 'carb' | 'vegetable' | 'pantry'
  quantity: string
  frequency: 'weekly' | 'monthly' | 'quarterly'
  notes?: string
}

// Framework Types
interface ScheduleDay {
  title: string
  type: 'prep' | 'planning' | 'maintenance'
  tasks: Array<{
    task: string
    time: string
    isRequired: boolean
  }>
}

interface PrepWave {
  title: string
  time: string
  tasks: string[]
  equipment: string[]
  dependencies: string[]
}

interface ContainerSpec {
  type: ContainerType
  equipment: Equipment
  capacity: string
  sections: Section[]
  quantity: number
  features: Feature[]
  notes: string[]
  maintenance: MaintenanceSchedule
}
```

## 🎯 Phase 2: Component Architecture

### Shared Components
```typescript
/components/eat
├── metric-card.tsx      // Stats & numbers
├── process-step.tsx     // Workflow steps
├── ingredient-list.tsx  // Shopping/recipes
├── meal-slot.tsx       // Meal plan display
└── container-guide.tsx // Equipment guides

/components/eat/framework
├── schedule-card.tsx    // Day schedules
├── container-card.tsx   // Container layouts
├── storage-card.tsx     // Storage info
└── scaling-card.tsx     // Scaling info
```

### Typography System
- Section Headers: `text-2xl font-semibold tracking-tight`
- Card Titles: `text-lg font-medium`
- Body Text: `text-sm text-muted-foreground leading-relaxed`
- Metadata: `text-xs text-muted-foreground`
- Lists: `space-y-1.5 leading-relaxed`

### Layout Patterns
- Cards: `p-3 rounded-lg border bg-card`
- Sections: `space-y-8`
- Grids: `grid gap-4 sm:gap-6 md:grid-cols-2`
- Lists: `space-y-1.5 list-disc pl-4`

## 🎯 Phase 3: Repository Improvements

### Repository Structure
```typescript
/lib/repositories
├── meal-plan/
├── shopping/
├── equipment/
├── framework/
│   ├── types.ts
│   ├── repository.ts
│   ├── data/
│   │   ├── schedule.ts
│   │   ├── containers.ts
│   │   └── storage.ts
│   └── schemas/
│       ├── schedule.schema.ts
│       ├── container.schema.ts
│       └── storage.schema.ts
└── recipes/
```

### Data Flow Improvements
```typescript
// Split into domain-specific repos
const scheduleRepo = new ScheduleRepository()
const containerRepo = new ContainerRepository()
const storageRepo = new StorageRepository()

// Add proper validation and error handling
const [schedule, containers, storage] = await Promise.all([
  scheduleRepo.getWeeklySchedule(),
  containerRepo.getContainerSystem(),
  storageRepo.getStorageLayout()
]).catch(handleFrameworkError)
```

### Repository Features
- Strong typing with proper interfaces
- Zod validation for runtime safety
- Proper error boundaries
- Data caching strategy
- Clear domain separation

## 🎯 Phase 4: Interactive Elements

### Framework Page Improvements
1. **Card Patterns**
   - Extract common card layouts
   - Create consistent header patterns
   - Standardize list styling
   - Add collapsible sections

2. **Data Loading**
   - Add proper loading states
   - Implement error boundaries
   - Cache repository results
   - Add retry mechanisms

3. **User Interaction**
   - Collapsible sections
   - Progress tracking
   - Equipment quick links
   - Container packing guides

4. **Visual Enhancements**
   - Container packing visualizations
   - Meal rotation diagrams
   - Prep timeline visualization
   - Storage layout diagrams

## Implementation Priority

1. **Component Extraction (High Impact)**
   - Extract shared card patterns
   - Create framework-specific components
   - Standardize list components
   - Implement consistent headers

2. **Repository Refactor (High Impact)**
   - Split monolithic framework repo
   - Add proper type definitions
   - Implement Zod validation
   - Add error handling

3. **Interactive Elements (Medium Impact)**
   - Add collapsible sections
   - Implement progress tracking
   - Add visual guides
   - Create packing diagrams

4. **Data Structure (Low Impact)**
   - Clean up type system
   - Organize repositories
   - Implement caching
   - Add data validation

## Success Metrics
- Consistent component patterns
- Type-safe data flow
- Better error handling
- Improved user interaction
- Maintainable repository structure
- Clear visual hierarchy
- Better mobile experience 