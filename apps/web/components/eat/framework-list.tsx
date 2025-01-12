'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FrameworkListProps {
  items: ReactNode[]
  className?: string
  icon?: ReactNode
}

export function FrameworkList({ items, className, icon }: FrameworkListProps) {
  if (icon) {
    return (
      <div className={cn('space-y-1.5', className)}>
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            {icon}
            {item}
          </div>
        ))}
      </div>
    )
  }

  return (
    <ul className={cn('list-disc pl-4 space-y-1.5 text-sm text-muted-foreground', className)}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
} 