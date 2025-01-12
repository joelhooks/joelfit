'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@repo/ui'

interface FrameworkCardProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function FrameworkCard({ title, subtitle, icon, children, className }: FrameworkCardProps) {
  return (
    <Card className={cn('p-3', className)}>
      <div className="flex items-start gap-2">
        {icon && <div className="mt-1 shrink-0">{icon}</div>}
        <div className="space-y-1.5 min-w-0">
          <div>
            <h3 className="text-base font-medium tracking-tight leading-none">{title}</h3>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </Card>
  )
} 