import { Card, CardContent, CardHeader, H3, Text } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import type { ActionCategory } from '@/lib/repositories/profile/schema'
import { ListTodo } from 'lucide-react'

interface ActionPlanProps {
  data: ActionCategory[]
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
              <H3 className="tracking-tight">
                {category.category}
              </H3>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 p-6">
              {category.items.map((item) => (
                <div 
                  key={item.title} 
                  className="space-y-2"
                >
                  <Text className="font-medium leading-none">
                    {item.title}
                  </Text>
                  <Text variant="meta">
                    {item.description}
                  </Text>
                  {item.detail && (
                    <Text variant="meta" className="italic opacity-80">
                      {item.detail}
                    </Text>
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