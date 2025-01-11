import { cn } from '@/lib/utils'
import { Card } from '@repo/ui'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  className?: string
  status?: 'warning' | 'success' | 'info' | 'default'
  isKey?: boolean
}

const statusColors = {
  warning: 'before:bg-red-500',
  success: 'before:bg-green-500',
  info: 'before:bg-blue-500',
  default: 'before:bg-gray-300'
} as const

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  className,
  status = 'default',
  isKey = false
}: MetricCardProps) {
  return (
    <Card className={cn(
      'relative overflow-hidden',
      isKey && 'ring-1 ring-primary/10',
      'before:absolute before:left-0 before:top-0 before:h-full before:w-1',
      statusColors[status],
      className
    )}>
      <div className="p-4">
        <h3 className={cn(
          "text-base font-medium",
          isKey ? "text-primary" : "text-muted-foreground"
        )}>{title}</h3>
        <div className={cn(
          "mt-2 text-2xl font-semibold",
          status === 'warning' && "text-red-500",
          status === 'success' && "text-green-500",
          status === 'info' && "text-blue-500"
        )}>{value}</div>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </Card>
  )
} 