# Exercise System Plan

## Phase 1: Repository Implementation ✅

### 1.1 Schema Definition ✅
- [x] Define exercise category enum
- [x] Define target area enum
- [x] Create exercise schema with Zod
- [x] Export types
- [x] Add validation rules

### 1.2 Repository Implementation ✅
- [x] Implement ExerciseRepository class
- [x] Add category/target filtering
- [x] Add slug generation
- [x] Set up initialization
- [x] Add search functionality
- [x] Add equipment filtering

### 1.3 Initial Data Migration ✅
- [x] Create shoulder exercises data file
- [x] Add proper typing with NewExercise
- [x] Add target areas
- [x] Add equipment info

## Phase 2: Route Updates 🚧

### 2.1 Exercise Routes (Next)
```typescript
/app
├── exercises/
│   ├── page.tsx         // Exercise library
│   ├── [id]/page.tsx    // Individual exercise
│   └── category/
│       └── [slug]/page.tsx  // Category view
```

### 2.2 Features
- [ ] Exercise library view
- [ ] Filter by category
- [ ] Search functionality
- [ ] Individual exercise pages
- [ ] Category pages

## Phase 3: Component Updates 🚧

### 3.1 Exercise Components
```typescript
/components/exercise
├── card.tsx          // Exercise card (current)
├── list.tsx          // Exercise list view
├── filters.tsx       // Category/target filters
├── search.tsx        // Search component
└── set-tracker.tsx   // Set tracking (current)
```

### 3.2 Features
- [ ] List/grid toggle
- [ ] Filter sidebar
- [ ] Search bar
- [ ] Sort options
- [ ] Category chips

## Phase 4: Program Builder 🚧

### 4.1 Features
- [ ] Create custom programs
- [ ] Add/remove exercises
- [ ] Set custom frequencies
- [ ] Save programs
- [ ] Share programs

### 4.2 Data Structure
```typescript
interface Program {
  id: string
  title: string
  description?: string
  exercises: {
    exerciseId: string
    sets?: Partial<Exercise['sets']>
    frequency?: Partial<Exercise['frequency']>
  }[]
  targetAreas: string[]
  duration: number // weeks
}
```

## Phase 5: Future Enhancements 🚧

### 5.1 Progress Tracking
- [ ] Track completed sets
- [ ] Track weight/resistance
- [ ] Progress charts
- [ ] Streak tracking
- [ ] Export data

### 5.2 Social Features
- [ ] Share programs
- [ ] Exercise notes
- [ ] Form check videos
- [ ] Progress sharing 