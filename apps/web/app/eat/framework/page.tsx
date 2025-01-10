import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Core Framework | High-Protein Meal Prep OS',
  description: 'The fundamental structure of the high-protein meal prep system',
}

export default function FrameworkPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Core Framework"
          description="A 5-day high-protein meal prep system with built-in variety"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Core Framework", href: "/eat/framework" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Daily Schedule</h2>
            <div className="bg-card border rounded-lg p-6">
              <ul className="space-y-2 text-muted-foreground">
                <li>• 7:00 AM - Overnight oats</li>
                <li>• 9:00 AM - Pre-workout smoothie</li>
                <li>• 11:30 AM - Post-workout meal (1-2-3)</li>
                <li>• 3:00 PM - Mid-day meal (1-2-3)</li>
                <li>• 7:00 PM - Dinner (1-2-3)</li>
                <li>• 9:00 PM - Greek yogurt snack</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Plus one optional piece of fruit as a flexible snack
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Meal Composition</h2>
            <div className="bg-card border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                Each prepped meal contains:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li>• 6-8 oz protein (45-50g protein)</li>
                <li>• 5 oz starches (55-65g carbs)</li>
                <li>• 1 cup vegetables</li>
              </ul>
              <p className="text-muted-foreground">
                Per meal: 550-650 calories, 45-50g protein, 55-65g carbs, 12-15g fat
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Scaling Options</h2>
            <div className="bg-card border rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Lower Calories (1800-2200)</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Drop to 4-5oz protein per meal</li>
                    <li>• Cut starches to 3-4oz</li>
                    <li>• Keep vegetables at 1 cup</li>
                    <li>• Adjust meal frequency if needed</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Higher Calories (3000+)</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Bump protein to 8-10oz per meal</li>
                    <li>• Increase starches to 6-8oz</li>
                    <li>• Add an extra snack</li>
                    <li>• Consider adding healthy fats</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Emergency Backup</h2>
            <div className="bg-card border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                Keep these on hand for when shit happens:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 2 frozen backup meals</li>
                <li>• Protein bars</li>
                <li>• Ready-to-drink shakes</li>
                <li>• Pre-portioned nuts</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Weekly Cost</h2>
            <div className="bg-card border rounded-lg p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">Breakdown</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Proteins: $45-60</li>
                    <li>• Produce: $25-30</li>
                    <li>• Starches: $10-15</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Total</h3>
                  <p className="text-muted-foreground">$80-105 per week</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    (~$5-7 per meal)
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 