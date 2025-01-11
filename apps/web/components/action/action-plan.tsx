import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import { ListTodo } from 'lucide-react'
import type { ActionPlan as ActionPlanType } from '@/types/metrics'

interface ActionPlanProps {
  data: ActionPlanType[]
}

export function ActionPlan({ data }: ActionPlanProps) {
  return (
    <section className="action-plan">
      <SectionHeader 
        title="Action Plan" 
        icon={ListTodo} 
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {data.map((category) => (
          <Card 
            key={category.category} 
            className="flex flex-col overflow-hidden"
          >
            <CardHeader className="border-b bg-muted/50 pb-4">
              <CardTitle className="text-xl font-semibold tracking-tight">
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 p-6">
              {category.items.map((item, index) => (
                <div 
                  key={item.title} 
                  className="space-y-2"
                >
                  <h4 className="font-medium leading-none">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
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