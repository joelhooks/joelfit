import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { actionPlan } from '@/config/joel'

export function ActionPlan() {
  return (
    <div className="space-y-6">
      {actionPlan.map((section) => (
        <Card key={section.category}>
          <CardHeader>
            <CardTitle>{section.category} Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.title} className="border-b pb-2">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.detail}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 