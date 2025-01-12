'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  className?: string
}

export function SectionHeader({ title, description, icon, className }: SectionHeaderProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center gap-2">
        {icon && <div className="shrink-0">{icon}</div>}
        <h2 className="text-2xl font-semibold tracking-tight leading-none">{title}</h2>
      </div>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
} 