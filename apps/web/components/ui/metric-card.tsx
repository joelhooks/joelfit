import { cn } from '@/lib/utils'
import { Card } from '@repo/ui'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  className?: string
  colorScheme?: 'default' | 'green' | 'blue' | 'purple'
}

const colorSchemes = {
  default: 'before:bg-primary',
  green: 'before:bg-green-500',
  blue: 'before:bg-blue-500',
  purple: 'before:bg-purple-500'
}

export function MetricCard({ title, value, subtitle, className, colorScheme = 'default' }: MetricCardProps) {
  return (
    <Card className={cn(
      'relative overflow-hidden',
      'before:absolute before:left-0 before:top-0 before:h-full before:w-1',
      colorSchemes[colorScheme],
      className
    )}>
      <div className="p-4">
        <h3 className="text-base font-medium text-muted-foreground">{title}</h3>
        <div className="mt-2 text-2xl font-semibold">{value}</div>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </Card>
  )
} 