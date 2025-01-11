import { cn } from '@/lib/utils'
import { Card } from '@repo/ui'
import { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: ReactNode
  subtitle?: ReactNode
  className?: string
  status?: 'success' | 'warning' | 'caution' | 'info'
}

const statusStyles = {
  success: {
    ring: 'ring-1 ring-green-500/10 dark:ring-green-500/20',
    border: 'border-l-4 border-l-green-500',
    text: 'text-green-600 dark:text-green-400'
  },
  warning: {
    ring: 'ring-1 ring-red-500/10 dark:ring-red-500/20',
    border: 'border-l-4 border-l-red-500',
    text: 'text-red-600 dark:text-red-400'
  },
  caution: {
    ring: 'ring-1 ring-yellow-500/10 dark:ring-yellow-500/20',
    border: 'border-l-4 border-l-yellow-500',
    text: 'text-yellow-600 dark:text-yellow-400'
  },
  info: {
    ring: 'ring-1 ring-primary/10',
    border: 'border-l-4 border-l-primary/40',
    text: 'text-muted-foreground'
  }
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  className,
  status = 'info'
}: MetricCardProps) {
  const styles = statusStyles[status]

  return (
    <Card className={cn(
      'relative h-[160px] overflow-hidden p-6 bg-background',
      styles.ring,
      styles.border,
      className
    )}>
      <h3 className={cn(
        "text-sm font-medium tracking-wide",
        styles.text
      )}>{title}</h3>
      <div className="mt-4">{value}</div>
      {subtitle && (
        <div className="mt-2 text-sm text-muted-foreground/80">{subtitle}</div>
      )}
    </Card>
  )
} 