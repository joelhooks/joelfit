# JoelFit Typography System

## Current State (Initial Research)

### Font Stack
- Primary: Geist Sans (`var(--font-geist-sans)`)
- Monospace: Geist Mono (`var(--font-geist-mono)`)
- Both configured via CSS variables in layout.tsx

### shadcn Component Patterns
- Text Sizes:
  - `text-xs` (12px): Small variants
  - `text-sm` (14px): Default UI text, descriptions, labels
  - `text-base` (16px): Body text
  - `text-lg` (18px): Dialog titles
  - `text-xl`+ : Headings

- Font Weights:
  - `font-normal` (400): Body text
  - `font-medium` (500): Labels, interactive elements
  - `font-semibold` (600): Titles, headings
  - `font-bold` (700): Rare, emphasis

- Line Heights:
  - `leading-none`: Headings, titles
  - `leading-tight`: Compact UI elements
  - `leading-normal`: Default text
  - `leading-relaxed`: Descriptions, paragraphs

- Letter Spacing:
  - `tracking-tight`: Headings, titles
  - `tracking-normal`: Body text
  - No wide tracking in use

- Common Patterns:
  - Alerts: text-sm base, titles use font-medium
  - Buttons: text-sm default, text-xs small variant
  - Cards: text-sm descriptions, semibold titles
  - Dialog: text-lg titles, text-sm descriptions
  - Labels: text-sm with medium weight
  - All interactive elements use font-medium
  - All titles/headings use tracking-tight
  - Descriptions consistently text-muted-foreground

### Custom Component Patterns
- Page Headers:
  - Title: text-3xl + font-bold
  - Description: text-lg + text-muted-foreground
  - Breadcrumbs: text-sm + text-muted-foreground

- Metrics:
  - Values: text-[32px] + font-bold + tracking-tight
  - Labels: text-base + text-muted-foreground
  - Section Headers: Inherited from shadcn

- Common Custom Patterns:
  - Hard-coded font sizes (32px)
  - Inconsistent heading levels
  - Mixed use of relative/absolute sizes
  - Heavy reliance on text-muted-foreground
  - Spacing often tied to flex/grid rather than typography

### Gaps Identified
- No explicit heading size system
- Font weight scale undefined
- Line height scale undefined
- Letter spacing scale undefined
- Inconsistent responsive typography
- No vertical rhythm system
- Missing typographic scale documentation
- Hard-coded pixel values in custom components
- Inconsistent heading hierarchy
- No clear system for responsive text
- Missing vertical rhythm system
- No clear pattern for section vs page headers

## Initial Audit Checklist (Completed)
- [x] Analyze existing typography patterns
  - [x] Review shadcn component typography usage
  - [x] Document current Tailwind font size/weight config
  - [x] Map Geist font usage across the app
  - [x] Identify custom typography patterns in use
- [x] Document findings
  - [x] List all font sizes in use
  - [x] Document font weight patterns
  - [x] Note any inconsistencies
  - [x] Identify components that need updating
- [x] Create migration strategy
  - [x] Prioritize which pages to update first
  - [x] Define approach for shadcn component customization
  - [x] Plan Geist font optimization

## Action Plan

### 1. Foundation Setup
- [x] Update Tailwind Config
  - [x] Add type scale definitions
  - [x] Configure responsive variants
  - [x] Add line height scale
  - [x] Define letter spacing
  - [ ] Test with existing components

### 2. Typography Primitives
- [ ] Create Base Components
  - [ ] Heading system (H1-H6)
  - [ ] Text component with variants
  - [ ] Section header component
  - [ ] Metadata text components
  - [ ] Add Storybook documentation

### 3. High Priority Updates
- [ ] Page Header Component
  - [ ] Remove hard-coded sizes
  - [ ] Implement responsive scaling
  - [ ] Fix heading hierarchy
  - [ ] Update breadcrumb styling

- [ ] Metrics Grid
  - [ ] Replace pixel values
  - [ ] Add responsive behavior
  - [ ] Standardize data display
  - [ ] Update section headers

- [ ] Site Header
  - [ ] Update navigation text
  - [ ] Fix mobile typography
  - [ ] Standardize menu items

### 4. Documentation
- [ ] Usage Guidelines
  - [ ] Component examples
  - [ ] Responsive behavior
  - [ ] Best practices
  - [ ] Common patterns

### 5. Testing & Validation
- [ ] Component Testing
  - [ ] Responsive behavior
  - [ ] Accessibility checks
  - [ ] Visual regression tests
  - [ ] Cross-browser testing

### 6. Rollout Strategy
- [ ] Phase 1: Foundation
  - [ ] Deploy config updates
  - [ ] Release primitives
  - [ ] Update documentation

- [ ] Phase 2: Core Components
  - [ ] High priority updates
  - [ ] Test in production
  - [ ] Gather feedback

- [ ] Phase 3: Full Migration
  - [ ] Medium priority updates
  - [ ] Lower priority updates
  - [ ] Final documentation

## Next Steps
1. Create consistent heading hierarchy
2. Define responsive typography scales
3. Establish vertical rhythm system
4. Create typography primitives that work with shadcn
5. Document component-specific typography rules

## Core Principles
- Mobile-first scaling
- Consistent rhythm and spacing
- Clear visual hierarchy
- Accessible contrast ratios
- Consistent line heights
- **Respect shadcn defaults unless clear reason to override**

## Revised Type Scale (Matching shadcn Patterns)
```typescript
const typeScale = {
  xs: '0.75rem',     // 12px - small buttons
  sm: '0.875rem',    // 14px - default UI text
  base: '1rem',      // 16px - body copy
  lg: '1.125rem',    // 18px - large UI elements
  xl: '1.25rem',     // 20px - small headings
  '2xl': '1.5rem',   // 24px - medium headings
  '3xl': '1.875rem', // 30px - large headings
  '4xl': '2.25rem',  // 36px - hero text
  '5xl': '3rem',     // 48px - display text
} as const

const fontWeight = {
  normal: '400',
  medium: '500',    // shadcn default for interactive
  semibold: '600',  // shadcn default for headings
  bold: '700',      // emphasis
} as const

const lineHeight = {
  none: '1',      // headings
  tight: '1.25',  // compact text
  normal: '1.5',  // body copy
  relaxed: '1.75' // readable paragraphs
} as const
```

## Implementation Plan

1. Update Tailwind Config:
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: typeScale,
      fontWeight,
      lineHeight,
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
      }
    }
  }
}
```

2. Create Typography Components (HOLD - need to review more shadcn patterns)

3. Document Usage Guidelines (HOLD - need complete audit first)

## Hierarchy Levels

### Level 1: Page Headers
- Font: Inter
- Weight: Bold (700)
- Size: 3xl (mobile) -> 4xl (desktop)
- Line Height: 1.1
- Letter Spacing: -0.02em
- Usage: Main page titles

### Level 2: Section Headers
- Font: Inter
- Weight: SemiBold (600)
- Size: xl (mobile) -> 2xl (desktop)
- Line Height: 1.2
- Usage: Major section divisions

### Level 3: Content Headers
- Font: Inter
- Weight: Medium (500)
- Size: lg
- Line Height: 1.3
- Usage: Exercise titles, subsections

### Level 4: Body Text
- Font: Inter
- Weight: Regular (400)
- Size: base
- Line Height: 1.5
- Usage: Main content, descriptions

### Level 5: Supporting Text
- Font: Inter
- Weight: Regular (400)
- Size: sm
- Line Height: 1.5
- Usage: Metadata, secondary information

### Level 6: Small Print
- Font: Inter
- Weight: Regular (400)
- Size: xs
- Line Height: 1.5
- Usage: Footnotes, timestamps

## Example Usage (Shoulder Page)

```tsx
<H1>Shoulder Program</H1>
<Text size="lg">Progressive rehab routine focusing on mobility...</Text>

<H2>Warm-Up</H2>
<div className="space-y-4">
  <H3>Crossbody Stretch</H3>
  <Text>Stand straight and bring one arm across chest...</Text>
</div>
``` 

## Component Update Priorities

### High Priority (Foundational)
1. `page-header.tsx`
   - Inconsistent with heading hierarchy
   - Hard-coded text-3xl
   - Mixed font weights

2. `metrics-grid.tsx`
   - Hard-coded pixel values (32px)
   - Inconsistent with type scale
   - Missing responsive design

3. `site-header.tsx`
   - Navigation typography needs standardization
   - Mobile menu text sizing

### Medium Priority (Content)
4. Exercise Components
   - Standardize heading levels
   - Consistent instruction text
   - Better metadata typography

5. Profile Components
   - Form label consistency
   - Data display typography
   - Status indicators

6. Timeline Component
   - Date/time typography
   - Event descriptions
   - Metadata styling

### Lower Priority (Supporting)
7. Loading States
   - Skeleton text sizes
   - Loading indicators
   - Placeholder text

8. Error States
   - Error messages
   - Alert typography
   - Fallback UI

### Shared Patterns to Address
- Replace hard-coded pixel values
- Implement responsive type scale
- Standardize section headers
- Consistent metadata styling
- Uniform form typography
- Proper heading hierarchy

## Migration Strategy
1. Start with high-priority components
2. Create new typography primitives
3. Update components in isolation
4. Test responsive behavior
5. Document new patterns
6. Roll out systematically 