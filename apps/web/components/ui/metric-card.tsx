import { cn } from '@/lib/utils'
import { Card } from '@repo/ui'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  className?: string
  status?: 'warning' | 'caution' | 'success' | 'info'
  isKey?: boolean
}

const statusColors = {
  warning: 'before:bg-red-500 bg-red-50/50 dark:bg-red-950/50',
  caution: 'before:bg-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/50',
  success: 'before:bg-green-500 bg-green-50/50 dark:bg-green-950/50',
  info: 'before:bg-blue-500 bg-blue-50/50 dark:bg-blue-950/50'
} as const

const statusTextColors = {
  warning: 'text-red-600 dark:text-red-400',
  caution: 'text-yellow-600 dark:text-yellow-400',
  success: 'text-green-600 dark:text-green-400',
  info: 'text-blue-600 dark:text-blue-400'
} as const

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  className,
  status = 'info',
  isKey = false
}: MetricCardProps) {
  return (
    <Card className={cn(
      'relative overflow-hidden transition-colors',
      'before:absolute before:left-0 before:top-0 before:h-full before:w-1',
      statusColors[status],
      isKey && 'ring-1 ring-primary/10',
      className
    )}>
      <div className="p-4">
        <h3 className={cn(
          "text-base font-medium",
          isKey ? statusTextColors[status] : "text-muted-foreground"
        )}>{title}</h3>
        <div className={cn(
          "mt-2 text-2xl font-semibold",
          statusTextColors[status]
        )}>{value}</div>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </Card>
  )
} 