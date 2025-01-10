import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Prep Workflow | High-Protein Meal Prep OS',
  description: 'Step-by-step guide for efficient meal preparation',
}

interface TimelineStep {
  title: string
  time: string
  description: string
  tips?: string[]
}

const timeline: TimelineStep[] = [
  {
    title: "Start Rice & Quinoa",
    time: "0:00",
    description: "Get grains going in the rice cooker first",
    tips: [
      "Use chicken stock instead of water for better flavor",
      "45 minutes total cooking time",
      "Will need time to cool before packing"
    ]
  },
  {
    title: "Prep Proteins",
    time: "0:05",
    description: "While rice is cooking, handle all proteins",
    tips: [
      "Proteins should be marinated the day before",
      "30-45 minutes cooking time",
      "Start yams at the same time if using"
    ]
  },
  {
    title: "Vegetable & Sauce Prep",
    time: "0:45",
    description: "While proteins are cooking, prep remaining components",
    tips: [
      "Chop all vegetables (or use frozen)",
      "Make sauces for the week",
      "Prep overnight oats",
      "Pack smoothie bags"
    ]
  },
  {
    title: "Cooling Period",
    time: "1:30",
    description: "Everything must cool completely",
    tips: [
      "30-45 minutes cooling time",
      "Clean kitchen while waiting",
      "Prepare containers and labels"
    ]
  },
  {
    title: "Final Assembly",
    time: "2:00",
    description: "Pack all containers using the 1-2-3 rotation",
    tips: [
      "Label containers with contents and day",
      "Store sauces separately",
      "Pack Thursday/Friday meals for freezer"
    ]
  }
]

export default function PreparationPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Prep Workflow"
          description="2-3 hour Sunday prep process for the entire week"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Prep Workflow", href: "/eat/preparation" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <div className="bg-card border rounded-lg p-6">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Saturday: Shopping day (proteins, produce, restocking)</li>
                <li>• Sunday: Main prep session (2-3 hours)</li>
                <li>• Tuesday: Move Thursday meals to fridge</li>
                <li>• Wednesday: Move Friday meals to fridge</li>
                <li>• Daily: 5-minute container rotation</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Prep Day Timeline</h2>
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-[2.875rem] w-px bg-border" />
              <div className="space-y-8">
                {timeline.map((step, index) => (
                  <div key={step.title} className="relative">
                    <div className="flex items-center gap-4">
                      <div className="z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 bg-card border rounded-lg p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-medium">{step.title}</h3>
                            <p className="text-muted-foreground mt-1">
                              {step.description}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {step.time}
                          </div>
                        </div>
                        {step.tips && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">Tips:</h4>
                            <ul className="space-y-1">
                              {step.tips.map((tip, tipIndex) => (
                                <li 
                                  key={tipIndex}
                                  className="text-sm text-muted-foreground"
                                >
                                  • {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Pro Tips</h2>
            <div className="bg-card border rounded-lg p-6">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Clean as you go - don't let dishes pile up</li>
                <li>• Prep proteins the night before (marinade, seasoning)</li>
                <li>• Keep cleaning supplies handy</li>
                <li>• Use multiple timers for different components</li>
                <li>• Have containers ready and labeled before starting</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Workflow Diagram</h2>
            <div className="bg-card border rounded-lg p-6">
              <div className="aspect-video relative bg-accent rounded">
                {/* Image placeholder for workflow diagram */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Workflow Diagram (Coming Soon)
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 