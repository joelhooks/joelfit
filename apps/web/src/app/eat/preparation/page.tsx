import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Clock, Lightbulb } from 'lucide-react'

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
    title: "Planning & Shopping",
    tasks: [
      { task: "Review meal plan for the week", time: "15 min" },
      { task: "Check inventory and make shopping list", time: "10 min" },
      { task: "Shop for ingredients", time: "45-60 min" },
      { task: "Organize and store groceries", time: "15 min" }
    ]
  },
  {
    day: "Sunday",
    title: "Main Prep Session",
    totalTime: "3.5 hours",
    waves: [
      {
        title: "Wave 1: Setup",
        time: "15 min",
        tasks: [
          "Preheat double oven to 400°F",
          "Preheat single oven to 450°F for potatoes",
          "Start rice cooker",
          "Lay out and label containers",
          "Prep baking sheets and pans"
        ]
      },
      {
        title: "Wave 2: Proteins",
        time: "60 min",
        tasks: [
          "Put chicken in single 400°F oven",
          "While chicken bakes (30 mins), portion meatball mix onto sheets",
          "Remove chicken to rest",
          "Put meatball sheets in double 400°F oven for 20 mins"
        ]
      },
      {
        title: "Wave 3: Potato Prep",
        time: "25 min",
        tasks: [
          "Peel potatoes and cut into 1-2 inch pieces",
          "Boil in heavily salted water for exactly 4 minutes",
          "Drain and return to pot",
          "Toss with flour and shake to rough up edges",
          "Spread in single layer on baking sheets"
        ]
      },
      {
        title: "Wave 4: Oven Transition & Vegetables",
        time: "50 min",
        tasks: [
          "Put potato pans in 450°F single oven (30-45 mins until golden)",
          "Season potatoes with salt and pepper",
          "Steam frozen vegetables in batches",
          "Monitor and rotate as needed",
          "Cool items properly"
        ]
      },
      {
        title: "Wave 5: Assembly",
        time: "45 min",
        tasks: [
          "Portion cooked rice into containers",
          "Portion proteins as they finish cooling",
          "Remove and portion crispy potatoes",
          "Add proteins, potatoes, vegetables to containers",
          "Pack any additional items"
        ]
      },
      {
        title: "Wave 6: Cleanup",
        time: "15 min",
        tasks: [
          "Wipe down all surfaces",
          "Store prepped meals properly",
          "Take out trash",
          "Final organization"
        ]
      }
    ]
  },
  {
    day: "Wednesday",
    title: "Mid-Week Check",
    tasks: [
      { task: "Move Thursday meals to fridge", time: "5 min" },
      { task: "Check food quality", time: "5 min" },
      { task: "Adjust portions if needed", time: "10 min" }
    ]
  }
]

const tips = {
  efficiency: [
    "Label containers before starting",
    "Use multiple timers for different items",
    "Clean as you go",
    "Prep all ingredients before cooking"
  ],
  quality: [
    "Use meat thermometer for proteins",
    "Cool items quickly with fan",
    "Store sauces separately",
    "Rotate freezer meals properly"
  ]
}

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
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              Weekly Schedule
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              The meal prep system follows a weekly cycle with three key days: Saturday for planning and shopping, 
              Sunday for the main prep session, and Wednesday for a mid-week check and rotation.
            </p>
            <div className="space-y-4">
              {weeklyTimeline.map((day) => (
                <div key={day.day} className="bg-card border rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center justify-between">
                    <span>{day.title}</span>
                    {day.totalTime && (
                      <span className="text-sm text-muted-foreground">
                        {day.totalTime}
                      </span>
                    )}
                  </h3>
                  {day.waves ? (
                    <div className="space-y-6">
                      {day.waves.map((wave) => (
                        <div key={wave.title} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{wave.title}</h4>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded">
                              {wave.time}
                            </span>
                          </div>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {wave.tasks.map((task, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <span className="flex-shrink-0">•</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {day.tasks.map((task, index) => (
                        <li key={index} className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-2">
                            <span className="flex-shrink-0">•</span>
                            <span>{task.task}</span>
                          </div>
                          <span className="text-xs bg-muted px-2 py-0.5 rounded whitespace-nowrap">
                            {task.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary flex-shrink-0" />
              Pro Tips
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Efficiency</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tips.efficiency.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Quality Control</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tips.quality.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 