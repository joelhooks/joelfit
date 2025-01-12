import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  currentValue: number
  targetValue?: number
  unit?: string
  className?: string
  trend?: {
    direction: 'up' | 'down' | 'neutral'
    percentage: number
  }
}

export function MetricCard({
  title,
  currentValue,
  targetValue,
  unit = '%',
  className,
  trend
}: MetricCardProps) {
  const isAtTarget = targetValue ? currentValue <= targetValue : true
  const trendColor = trend?.direction === 'down' ? 'text-green-500' : trend?.direction === 'up' ? 'text-red-500' : 'text-yellow-500'

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-1 flex items-baseline justify-between">
          <div>
            <span className={cn(
              'text-2xl font-semibold',
              isAtTarget ? 'text-green-500' : 'text-red-500'
            )}>
              {currentValue}
              <span className="ml-1 text-sm">{unit}</span>
            </span>
            {targetValue && (
              <div className="mt-1 text-xs text-muted-foreground">
                Target: {targetValue}{unit}
              </div>
            )}
          </div>
          {trend && (
            <div className={cn('text-sm font-medium', trendColor)}>
              {trend.direction === 'down' ? '↓' : trend.direction === 'up' ? '↑' : '→'}
              {trend.percentage}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 