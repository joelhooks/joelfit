import { cn } from '@/lib/utils'
import { Card } from '@repo/ui'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  className?: string
  isKey?: boolean
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  className,
  isKey = false
}: MetricCardProps) {
  return (
    <Card className={cn(
      'relative overflow-hidden',
      isKey && 'ring-1 ring-primary/10',
      className
    )}>
      <div className="p-4">
        <h3 className={cn(
          "text-base font-medium",
          isKey ? "text-primary" : "text-muted-foreground"
        )}>{title}</h3>
        <div className="mt-2 text-2xl font-semibold">{value}</div>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </Card>
  )
} 