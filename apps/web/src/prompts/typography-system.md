# JoelFit Typography System

## Current State & Research ✅

### Font Stack
- Primary: Geist Sans (`var(--font-geist-sans)`)
- Monospace: Geist Mono (`var(--font-geist-mono)`)
- Both configured via CSS variables in layout.tsx

### Component Patterns
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

### Common Patterns
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
  - Values: text-3xl/text-4xl + font-bold + tracking-tight
  - Labels: text-sm + text-muted-foreground
  - Section Headers: Inherited from shadcn

## Core Principles
- Mobile-first scaling
- Consistent rhythm and spacing
- Clear visual hierarchy
- Accessible contrast ratios
- Consistent line heights
- **Respect shadcn defaults unless clear reason to override**

## Type Scale System
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

## Implementation Progress

### Foundation Setup ✅
- [x] Update Tailwind Config with type scale
- [x] Configure responsive variants
- [x] Add line height scale
- [x] Define letter spacing
- [x] Test with existing components

### Typography Primitives ✅
- [x] Create base heading component (H1-H6)
- [x] Create text component with variants
- [x] Export components from UI package

### High Priority Updates

#### ✅ Page Header
- [x] Update with new typography system
- [x] Test in routes:
  - [x] `/eat`
  - [x] `/eat/recipes`
  - [x] `/eat/framework`
  - [x] `/eat/shopping`
- [x] Document responsive issues
- [x] Verify vertical rhythm

#### ✅ Site Header
- [x] Update navigation text
- [x] Fix mobile typography
- [x] Standardize menu items

#### ✅ Metrics Grid
- [x] Replace pixel values
- [x] Add responsive behavior
- [x] Standardize data display
- [x] Update section headers

### Documentation
- [ ] Create typography usage guide in README.md
  - [ ] Document available components
  - [ ] Show usage examples
  - [ ] Explain responsive behavior
  - [ ] Document vertical rhythm guidelines

### Testing & Validation
- [ ] Test components in mobile view
- [ ] Verify responsive behavior
- [ ] Check accessibility (color contrast, font sizes)
- [ ] Validate vertical rhythm

### Next Steps
- [ ] Deploy foundation changes
- [ ] Test in production
- [ ] Plan next component updates 