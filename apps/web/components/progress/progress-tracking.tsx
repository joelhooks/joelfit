import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui'

export function ProgressTracking() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Key Metrics</h3>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>Waist circumference (morning, relaxed)</li>
              <li>Body weight (3x/week, same conditions)</li>
              <li>Progress photos (weekly, same conditions)</li>
              <li>Training performance metrics</li>
              <li>Sleep quality score</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Target Rate of Change</h3>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>0.5-1% body weight per week</li>
              <li>Maintain or increase lifting numbers</li>
              <li>Reduce waist circumference while maintaining other measurements</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 