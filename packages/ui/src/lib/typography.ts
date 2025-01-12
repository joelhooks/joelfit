export const typeScale = {
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

export const fontWeight = {
  normal: '400',
  medium: '500',    // shadcn default for interactive
  semibold: '600',  // shadcn default for headings
  bold: '700',      // emphasis
} as const

export const lineHeight = {
  none: '1',      // headings
  tight: '1.25',  // compact text
  normal: '1.5',  // body copy
  relaxed: '1.75' // readable paragraphs
} as const

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
} as const

// Responsive variants for font sizes
export const responsiveTypeScale = {
  xs: ['0.75rem', '0.75rem'],      // No change
  sm: ['0.875rem', '0.875rem'],    // No change
  base: ['1rem', '1rem'],          // No change
  lg: ['1.125rem', '1.25rem'],     // 18px -> 20px
  xl: ['1.25rem', '1.5rem'],       // 20px -> 24px
  '2xl': ['1.5rem', '1.875rem'],   // 24px -> 30px
  '3xl': ['1.875rem', '2.25rem'],  // 30px -> 36px
  '4xl': ['2.25rem', '3rem'],      // 36px -> 48px
  '5xl': ['3rem', '3.75rem'],      // 48px -> 60px
} as const 