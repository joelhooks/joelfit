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
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold tracking-tight">
                {section.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.items.map((item) => (
                <div key={item.title} className="space-y-2">
                  <h4 className="text-base font-semibold tracking-tight">{item.title}</h4>
                  <p className="text-sm leading-normal text-muted-foreground">
                    {item.description}
                  </p>
                  {item.detail && (
                    <p className="text-sm italic text-muted-foreground/80">
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