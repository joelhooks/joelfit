'use client'

import * as React from "react"
import { cn } from "../../lib/utils"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  level: 1 | 2 | 3 | 4 | 5 | 6
}

const headingVariants = {
  1: "text-3xl font-bold tracking-tight lg:text-4xl", // Page Headers
  2: "text-xl font-semibold tracking-tight lg:text-2xl", // Section Headers
  3: "text-lg font-medium leading-tight", // Content Headers
  4: "text-base font-medium", // Subsection Headers
  5: "text-sm font-medium", // Small Headers
  6: "text-xs font-medium uppercase tracking-wide" // Micro Headers
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, as, ...props }, ref) => {
    const Component = as || `h${level}`
    return React.createElement(
      Component,
      {
        ref,
        className: cn(headingVariants[level], className),
        ...props
      }
    )
  }
)
Heading.displayName = "Heading"

// Convenience components for each heading level
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => React.createElement(Heading, { ref, level: 1, ...props })
)
H1.displayName = "H1"

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => React.createElement(Heading, { ref, level: 2, ...props })
)
H2.displayName = "H2"

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => React.createElement(Heading, { ref, level: 3, ...props })
)
H3.displayName = "H3"

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => React.createElement(Heading, { ref, level: 4, ...props })
)
H4.displayName = "H4"

export const H5 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => React.createElement(Heading, { ref, level: 5, ...props })
)
H5.displayName = "H5"

export const H6 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => React.createElement(Heading, { ref, level: 6, ...props })
)
H6.displayName = "H6" 