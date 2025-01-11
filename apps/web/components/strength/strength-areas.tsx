import { Card, CardContent } from '@repo/ui'
import { strengthAreas } from '@/config/joel'
import { cn } from '@/lib/utils'

export function StrengthAreas() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {strengthAreas.map((area, index) => (
        <Card key={area.title} className={cn(
          'relative overflow-hidden',
          'before:absolute before:left-0 before:top-0 before:h-full before:w-1',
          index === 0 && 'before:bg-green-500',
          index === 1 && 'before:bg-blue-500',
          index === 2 && 'before:bg-purple-500'
        )}>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="font-medium">{area.title}</div>
              <div className="text-lg font-semibold text-primary">{area.metric}</div>
              <div className="text-sm text-muted-foreground">{area.details}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 