# JoelFit Codebase Consolidation Plan

## Progress Tracking

### ✅ Phase 1: Infrastructure Setup (Completed)
1. Base package setup
   - Added required dependencies
   - Set up package exports
   - Configured build tools
2. Styling Infrastructure
   - Created base Tailwind config
   - Set up CSS variables and globals
   - Added utility functions
3. Component Infrastructure
   - Added shadcn configuration
   - Set up component aliases
   - Configured build paths

### 🚀 Phase 2: Component Migration (Next)
1. Initial Components
   - [ ] ScrollArea
   - [ ] NavigationMenu
   - [ ] Card
2. Update apps to use new components
3. Test and verify functionality

### 🔜 Phase 3: Future Tasks
1. Clean up old component locations
2. Update documentation
3. Add proper testing infrastructure

## Component Architecture Patterns

### Current State
1. UI components are scattered between `apps/web/components` and `packages/ui`
2. Radix UI primitives are being wrapped individually
3. Common patterns in component structure:
   - `use client` directives
   - Radix imports
   - `cn` utility usage
   - `React.forwardRef` pattern
   - `displayName` assignments

### Action Items

1. **Component Library Consolidation**
   - Move all base UI components to `packages/ui`
   - Create a consistent export pattern
   - Implement proper workspace protocols

2. **Utility Functions**
   - Consolidate `cn` and other utilities into `packages/ui/lib`
   - Create shared type definitions
   - Implement proper barrel exports

3. **Component Generation**
   - Update Turbo generators to enforce new patterns
   - Include proper TypeScript types
   - Standardize component structure

4. **Type System**
   - Create shared type definitions for common props
   - Implement proper component prop interfaces
   - Use consistent naming conventions

## Implementation Phases

### Phase 1: Infrastructure
1. Set up proper workspace protocols
2. Create shared type system
3. Update build configuration

### Phase 2: Migration
1. Move components to proper locations
2. Update imports across the project
3. Implement new patterns

### Phase 3: Cleanup
1. Remove duplicate code
2. Update documentation
3. Add proper tests

## Standards

### Component Structure
```typescript
'use client'

import * as React from "react"
import * as ComponentPrimitive from "@radix-ui/react-component"
import { cn } from "@ui/lib/utils"

export interface ComponentProps extends React.ComponentPropsWithoutRef<typeof ComponentPrimitive.Root> {
  // Additional props
}

const Component = React.forwardRef<
  React.ElementRef<typeof ComponentPrimitive.Root>,
  ComponentProps
>((props, ref) => {
  // Implementation
})
Component.displayName = "Component"
```

### File Organization
- One component per file
- Consistent naming (kebab-case for files)
- Proper type exports
- Clear component interfaces

## Migration Strategy
1. Start with most commonly used components
2. Update one component at a time
3. Verify nothing breaks
4. Update documentation
5. Add tests as we go 

## Shadcn Component Migration Plan

### Current Setup Issues
1. Components generated in `apps/web/components/ui`
2. Tailwind config duplicated between packages
3. Utils scattered between packages
4. No centralized component registry

### Migration Steps

1. **Setup UI Package for Shadcn**
   ```bash
   # In packages/ui
   pnpm add -D @shadcn/ui tailwindcss-animate class-variance-authority clsx tailwind-merge
   pnpm add @radix-ui/react-* # Add all needed Radix primitives
   ```

2. **Create New Components Config**
   - Create `packages/ui/components.json`:
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "new-york",
     "rsc": true,
     "tsx": true,
     "tailwind": {
       "config": "tailwind.config.js",
       "css": "src/styles/globals.css",
       "baseColor": "zinc",
       "cssVariables": true,
       "prefix": ""
     },
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils"
     }
   }
   ```

3. **Centralize Tailwind Config**
   - Move base config to `packages/ui/tailwind.config.js`
   - Apps extend this config
   - Share theme variables through CSS

4. **Component Generation Flow**
   1. Generate in `packages/ui/src/components`
   2. Export through `packages/ui/src/index.ts`
   3. Import in apps via workspace protocol

5. **Utils Consolidation**
   - Move `cn` and other utils to `packages/ui/src/lib`
   - Create proper type exports
   - Share through main package entry

### New Component Structure
```typescript
// packages/ui/src/components/[component]/index.tsx
'use client'

import * as React from "react"
import * as ComponentPrimitive from "@radix-ui/react-component"
import { cn } from "../../lib/utils"

// Component implementation
```

### Export Strategy
```typescript
// packages/ui/src/index.ts
export * from './components/button'
export * from './components/card'
// etc...

// packages/ui/package.json
{
  "exports": {
    ".": "./src/index.ts",
    "./styles": "./src/styles/globals.css"
  }
}
```

### App Integration
```typescript
// apps/web/tailwind.config.js
import { createConfig } from '@repo/ui/tailwind-config'

export default createConfig(__dirname)

// apps/web/app/layout.tsx
import '@repo/ui/styles'
```

## Migration Order
1. Set up UI package infrastructure
2. Move existing components one at a time
3. Update imports in web app
4. Delete old component locations
5. Update documentation 

## Migration Steps (Updated)

### Next Actions
1. Create component directory structure in `packages/ui/src/components`
2. Move ScrollArea component as first migration
3. Update web app imports
4. Verify functionality
5. Commit changes
6. Repeat for remaining components 