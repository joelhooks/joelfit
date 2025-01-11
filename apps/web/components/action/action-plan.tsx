import type { ActionPlan as ActionPlanType } from '@/types/metrics'
import { SectionHeader } from '@/components/ui/section-header'
import { Card } from '@repo/ui'
import { Target } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActionPlanProps {
  data: ActionPlanType[]
}

// Status colors based on priority and current focus
const categoryStatus = {
  Nutrition: {
    bg: 'bg-red-50/50 dark:bg-red-950/50',
    border: 'before:bg-red-500',
    text: 'text-red-600 dark:text-red-400'
  },
  Training: {
    bg: 'bg-yellow-50/50 dark:bg-yellow-950/50',
    border: 'before:bg-yellow-500',
    text: 'text-yellow-600 dark:text-yellow-400'
  },
  Lifestyle: {
    bg: 'bg-green-50/50 dark:bg-green-950/50',
    border: 'before:bg-green-500',
    text: 'text-green-600 dark:text-green-400'
  }
} as const

export function ActionPlan({ data }: ActionPlanProps) {
  return (
    <div>
      <SectionHeader title="Action Plan" icon={Target} />
      <div className="grid gap-8 sm:grid-cols-3">
        {data.map((section) => (
          <div key={section.category} className="space-y-4">
            <h3 className={cn(
              "text-lg font-semibold tracking-tight",
              categoryStatus[section.category as keyof typeof categoryStatus].text
            )}>{section.category}</h3>
            <div className="space-y-4">
              {section.items.map((item) => (
                <Card key={item.title} className={cn(
                  'relative overflow-hidden transition-colors',
                  'before:absolute before:left-0 before:top-0 before:h-full before:w-1',
                  categoryStatus[section.category as keyof typeof categoryStatus].bg,
                  categoryStatus[section.category as keyof typeof categoryStatus].border
                )}>
                  <div className="p-4">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 