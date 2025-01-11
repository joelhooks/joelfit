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
      'relative h-[160px] overflow-hidden p-6',
      isKey && 'ring-1 ring-primary/10',
      className
    )}>
      <h3 className={cn(
        "text-sm font-medium uppercase tracking-wide",
        isKey ? "text-primary" : "text-muted-foreground"
      )}>{title}</h3>
      <div className="mt-3 text-3xl font-bold tracking-tight">{value}</div>
      {subtitle && (
        <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>
      )}
    </Card>
  )
} 