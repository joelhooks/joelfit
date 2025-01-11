import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Thermometer, Timer, Scale, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Progress & Quality Control | High-Protein Meal Prep OS',
  description: 'Track progress and maintain quality standards in your meal prep system',
}

const qualityChecks = {
  temperatures: {
    cooking: [
      { item: "Chicken Breast", target: "165°F", time: "22-25 min at 425°F" },
      { item: "Turkey Meatballs", target: "165°F", time: "20-25 min at 400°F" },
      { item: "Fish", target: "145°F", time: "12-15 min at 400°F" }
    ],
    storage: [
      { zone: "Refrigerator", range: "34-40°F", check: "Daily" },
      { zone: "Freezer", range: "0°F or below", check: "Weekly" },
      { zone: "Cooling", target: "Below 40°F within 2 hours", check: "During prep" }
    ]
  },
  containerMaintenance: {
    daily: [
      "Wash immediately after use",
      "Check seals before filling",
      "Verify proper closure"
    ],
    weekly: [
      "Deep clean in dishwasher",
      "Inspect for damage",
      "Sort and organize"
    ],
    monthly: [
      "Full seal inspection",
      "Deep clean lids",
      "Check for staining"
    ],
    quarterly: [
      "Replacement assessment",
      "Full inventory check",
      "Deep organization"
    ]
  },
  progressMetrics: {
    weight: {
      frequency: "Weekly",
      timing: "Morning, post-bathroom, pre-food",
      tracking: "7-day rolling average"
    },
    macros: {
      protein: "200-220g daily",
      carbs: "225-250g daily",
      fat: "65-75g daily",
      total: "2250-2500 calories"
    },
    timing: {
      breakfast: "7:00 AM",
      lunch: "11:30 AM",
      midDay: "3:00 PM",
      dinner: "7:00 PM",
      nightSnack: "9:00 PM"
    }
  }
}

export default function TrackingPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Progress & Quality Control"
          description="Track progress and maintain quality standards in your meal prep system"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Tracking", href: "/eat/tracking" }
          ]}
        />

        <div className="space-y-8">
          {/* Temperature Monitoring */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Temperature Control</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">Cooking Temperatures</h3>
                <div className="space-y-3">
                  {qualityChecks.temperatures.cooking.map((item) => (
                    <div key={item.item} className="bg-card border rounded-lg p-3">
                      <p className="font-medium">{item.item}</p>
                      <p className="text-sm text-muted-foreground">Target: {item.target}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Storage Zones</h3>
                <div className="space-y-3">
                  {qualityChecks.temperatures.storage.map((zone) => (
                    <div key={zone.zone} className="bg-card border rounded-lg p-3">
                      <p className="font-medium">{zone.zone}</p>
                      <p className="text-sm text-muted-foreground">Range: {zone.range}</p>
                      <p className="text-sm text-muted-foreground">Check: {zone.check}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Container Maintenance */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Container Maintenance</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(qualityChecks.containerMaintenance).map(([period, tasks]) => (
                <div key={period} className="space-y-2">
                  <h3 className="font-medium capitalize">{period} Tasks</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {tasks.map((task, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Progress Tracking */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Progress Tracking</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">Weight Tracking</h3>
                <div className="bg-card border rounded-lg p-4 space-y-2">
                  <p className="text-sm"><span className="font-medium">Frequency:</span> {qualityChecks.progressMetrics.weight.frequency}</p>
                  <p className="text-sm"><span className="font-medium">Timing:</span> {qualityChecks.progressMetrics.weight.timing}</p>
                  <p className="text-sm"><span className="font-medium">Method:</span> {qualityChecks.progressMetrics.weight.tracking}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Macro Targets</h3>
                <div className="bg-card border rounded-lg p-4 space-y-2">
                  {Object.entries(qualityChecks.progressMetrics.macros).map(([macro, target]) => (
                    <p key={macro} className="text-sm">
                      <span className="font-medium capitalize">{macro}:</span> {target}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Meal Timing */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Timer className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Meal Timing</h2>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(qualityChecks.progressMetrics.timing).map(([meal, time]) => (
                  <p key={meal} className="text-sm">
                    <span className="font-medium capitalize">{meal}:</span> {time}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 