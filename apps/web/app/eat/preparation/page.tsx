import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Timeline } from '@/components/timeline'

export const metadata: Metadata = {
  title: 'Prep Workflow | High-Protein Meal Prep OS',
  description: 'Weekly meal prep workflow and timeline',
  openGraph: {
    title: 'Prep Workflow | High-Protein Meal Prep OS',
    description: 'Weekly meal prep workflow and timeline',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Prep Workflow')}&description=${encodeURIComponent('Weekly meal prep workflow and timeline')}`,
      width: 1200,
      height: 630,
      alt: 'Prep Workflow'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prep Workflow | High-Protein Meal Prep OS',
    description: 'Weekly meal prep workflow and timeline',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Prep Workflow')}&description=${encodeURIComponent('Weekly meal prep workflow and timeline')}`],
  }
}

const weeklyTimeline = [
  {
    day: "Saturday",
    tasks: [
      { name: "Inventory Check", duration: "30 min", details: "Check containers, ingredients, and freezer space" },
      { name: "Shopping List", duration: "15 min", details: "Plan meals and create shopping list" },
      { name: "Grocery Shopping", duration: "1 hour", details: "Get ingredients for the week" }
    ]
  },
  {
    day: "Sunday",
    tasks: [
      { 
        name: "Setup", 
        duration: "30 min", 
        details: "Preheat ovens to 425°F, clean workspace, label containers" 
      },
      { 
        name: "Wave 1", 
        duration: "30 min", 
        details: "Oven 1: Potatoes, Oven 2: Chicken breasts, Rice Cooker: Rice and quinoa (using our recommended model from the equipment page), Prep: Form turkey meatballs" 
      },
      { 
        name: "Wave 2", 
        duration: "30 min", 
        details: "Oven 1: Continue potatoes, Oven 2: Turkey meatballs, Monitor grains, Begin vegetable prep" 
      },
      { 
        name: "Wave 3", 
        duration: "30 min", 
        details: "Oven 1: Roast vegetables, Oven 2: Complete proteins, Finish grains, Prepare sauces" 
      },
      { 
        name: "Final Wave", 
        duration: "30 min", 
        details: "Assembly line container filling, Cool items with fan, Prepare breakfast jars, Pack smoothie bags" 
      }
    ]
  },
  {
    day: "Wednesday",
    tasks: [
      { 
        name: "Mid-week Check", 
        details: "Move Thursday/Friday meals from freezer to fridge, Quick container inventory, Sauce check/refresh" 
      }
    ]
  }
]

export default function PreparationPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Prep Workflow"
          description="Weekly meal prep workflow and timeline"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Prep Workflow", href: "/eat/preparation" }
          ]}
        />

        <div className="space-y-8">
          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <p className="text-muted-foreground mb-6">
              The meal prep system follows a weekly cycle with three key days: Saturday for planning and shopping, 
              Sunday for the main prep session, and Wednesday for a mid-week check and rotation.
            </p>
            <Timeline days={weeklyTimeline} />
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Pro Tips</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Efficiency</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Label containers before starting</li>
                  <li>• Use multiple timers for different items</li>
                  <li>• Clean as you go</li>
                  <li>• Prep all ingredients before cooking</li>
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-2">Quality Control</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Use meat thermometer for proteins</li>
                  <li>• Cool items quickly with fan</li>
                  <li>• Store sauces separately</li>
                  <li>• Rotate freezer meals properly</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 