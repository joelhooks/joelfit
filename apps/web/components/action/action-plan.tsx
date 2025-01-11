import { ListTodo } from 'lucide-react'
import { type ActionPlan as ActionPlanType } from '@/types/metrics'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'

interface ActionPlanProps {
  data: ActionPlanType[]
}

export function ActionPlan({ data }: ActionPlanProps) {
  return (
    <section>
      <SectionHeader title="Action Plan" icon={ListTodo} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((section) => (
          <Card key={section.category} className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item) => (
                <div key={item.title}>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  {item.detail && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 