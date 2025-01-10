import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Core Framework | Meal Prep OS',
  description: 'The fundamental structure of the meal prep system',
}

export default function FrameworkPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Core Framework"
          description="The fundamental structure of the meal prep system"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Core Framework", href: "/eat/framework" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <div className="bg-card border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                The weekly schedule is designed for maximum efficiency with minimal time investment:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Sunday: Main prep session (2-3 hours)</li>
                <li>• Wednesday: Optional mini-prep (30 mins)</li>
                <li>• Daily: 5-minute container rotation</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Meal Slot System</h2>
            <div className="bg-card border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                Each meal is composed of three core components:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Protein (6-8 oz per meal)</li>
                <li>• Complex carbs (1-1.5 cups)</li>
                <li>• Vegetables (2+ cups)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Rotation System</h2>
            <div className="bg-card border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                The 1-2-3 rotation system ensures variety while maintaining simplicity:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 1 prep day covers 80% of weekly meals</li>
                <li>• 2 main protein variations per week</li>
                <li>• 3 interchangeable components per category</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 