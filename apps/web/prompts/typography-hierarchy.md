# JoelFit Typography System

## Initial Audit Checklist
- [ ] Analyze existing typography patterns
  - [ ] Review shadcn component typography usage
  - [ ] Document current Tailwind font size/weight config
  - [ ] Map Geist font usage across the app
  - [ ] Identify custom typography patterns in use
- [ ] Document findings
  - [ ] List all font sizes in use
  - [ ] Document font weight patterns
  - [ ] Note any inconsistencies
  - [ ] Identify components that need updating
- [ ] Create migration strategy
  - [ ] Prioritize which pages to update first
  - [ ] Define approach for shadcn component customization
  - [ ] Plan Geist font optimization

## Core Principles
- Mobile-first scaling
- Consistent rhythm and spacing
- Clear visual hierarchy
- Accessible contrast ratios
- Consistent line heights

## Type Scale
Using a modular scale with a ratio of 1.25 (major third)

```typescript
const typeScale = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.25rem',    // 20px
  xl: '1.5rem',     // 24px
  '2xl': '1.875rem',// 30px
  '3xl': '2.25rem', // 36px
  '4xl': '3rem',    // 48px
} as const
```

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

## Implementation Plan

1. Create a typography.ts config file:
```typescript
export const typography = {
  h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-medium tracking-tight',
  h4: 'scroll-m-20 text-xl font-medium tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  list: 'my-6 ml-6 list-disc [&>li]:mt-2',
} as const
```

2. Create React components for each level:
```typescript
export const H1 = ({ children, className, ...props }) => (
  <h1 className={cn(typography.h1, className)} {...props}>
    {children}
  </h1>
)
```

3. Update existing pages to use new components

4. Create Storybook documentation

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