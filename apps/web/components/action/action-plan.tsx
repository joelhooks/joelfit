import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import type { ActionCategory } from '@/lib/repositories/profile/schema'
import { Target } from 'lucide-react'

interface ActionPlanProps {
  data: ActionCategory[]
}

export function ActionPlan({ data }: ActionPlanProps) {
  return (
    <section>
      <SectionHeader 
        title="Action Plan" 
        icon={Target} 
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 