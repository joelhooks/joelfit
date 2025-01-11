import type { ActionPlan as ActionPlanType } from '@/types/metrics'
import { SectionHeader } from '@/components/ui/section-header'
import { Card } from '@repo/ui'
import { Target } from 'lucide-react'

interface ActionPlanProps {
  data: ActionPlanType[]
}

export function ActionPlan({ data }: ActionPlanProps) {
  return (
    <div>
      <SectionHeader title="Action Plan" icon={Target} />
      <div className="grid gap-8 sm:grid-cols-3">
        {data.map((section) => (
          <div key={section.category} className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">{section.category}</h3>
            <div className="space-y-4">
              {section.items.map((item) => (
                <Card key={item.title} className="relative overflow-hidden">
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