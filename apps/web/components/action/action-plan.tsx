import type { ActionPlan as ActionPlanType } from '@/types/metrics'

interface ActionPlanProps {
  data: ActionPlanType[]
}

export function ActionPlan({ data }: ActionPlanProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {data.map((section) => (
        <div key={section.category} className="space-y-4">
          <h3 className="text-lg font-semibold">{section.category}</h3>
          <div className="space-y-4">
            {section.items.map((item) => (
              <div key={item.title} className="bg-card border rounded-lg p-4">
                <h4 className="font-medium">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 