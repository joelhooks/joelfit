'use client'

import * as React from "react"
import { cn } from "../../lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const textVariants = cva("", {
  variants: {
    variant: {
      default: "text-base leading-normal",
      lead: "text-lg text-muted-foreground leading-relaxed",
      meta: "text-sm text-muted-foreground leading-normal",
      small: "text-sm leading-normal",
      tiny: "text-xs leading-normal",
      large: "text-lg leading-relaxed"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    }
  },
  defaultVariants: {
    variant: "default",
    weight: "normal"
  }
})

interface TextProps 
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
  muted?: boolean
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, weight, as = "p", muted, ...props }, ref) => {
    const Component = as
    return React.createElement(
      Component,
      {
        ref,
        className: cn(
          textVariants({ variant, weight }),
          muted && "text-muted-foreground",
          className
        ),
        ...props
      }
    )
  }
)
Text.displayName = "Text"

// Convenience components for common text variants
export const Lead = React.forwardRef<HTMLParagraphElement, Omit<TextProps, 'variant'>>(
  (props, ref) => React.createElement(Text, { ref, variant: "lead", ...props })
)
Lead.displayName = "Lead"

export const Small = React.forwardRef<HTMLParagraphElement, Omit<TextProps, 'variant'>>(
  (props, ref) => React.createElement(Text, { ref, variant: "small", ...props })
)
Small.displayName = "Small"

export const Tiny = React.forwardRef<HTMLParagraphElement, Omit<TextProps, 'variant'>>(
  (props, ref) => React.createElement(Text, { ref, variant: "tiny", ...props })
)
Tiny.displayName = "Tiny"

export const Large = React.forwardRef<HTMLParagraphElement, Omit<TextProps, 'variant'>>(
  (props, ref) => React.createElement(Text, { ref, variant: "large", ...props })
)
Large.displayName = "Large" 