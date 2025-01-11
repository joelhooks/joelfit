import type { ActionPlan as ActionPlanType } from '@/types/metrics'
import { SectionHeader } from '@/components/ui/section-header'
import { Card } from '@repo/ui'
import { Target } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActionPlanProps {
  data: ActionPlanType[]
}

// Status colors based on category priority
const categoryStatus = {
  Nutrition: 'before:bg-red-500', // Highest priority - needs immediate attention
  Training: 'before:bg-blue-500', // Ongoing focus
  Lifestyle: 'before:bg-green-500' // Supporting habits
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
              section.category === 'Nutrition' && "text-red-500",
              section.category === 'Training' && "text-blue-500",
              section.category === 'Lifestyle' && "text-green-500"
            )}>{section.category}</h3>
            <div className="space-y-4">
              {section.items.map((item) => (
                <Card key={item.title} className={`relative overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-1 ${categoryStatus[section.category as keyof typeof categoryStatus]}`}>
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