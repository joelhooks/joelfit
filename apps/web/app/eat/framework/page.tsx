import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Clock, Thermometer, Scale, AlertCircle, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Core Framework | High-Protein Meal Prep OS',
  description: 'Systematic approach to high-protein meal preparation',
  openGraph: {
    title: 'Core Framework | High-Protein Meal Prep OS',
    description: 'Systematic approach to high-protein meal preparation',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Core Framework')}&description=${encodeURIComponent('Systematic approach to high-protein meal preparation')}`,
      width: 1200,
      height: 630,
      alt: 'Core Framework'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Core Framework | High-Protein Meal Prep OS',
    description: 'Systematic approach to high-protein meal preparation',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Core Framework')}&description=${encodeURIComponent('Systematic approach to high-protein meal preparation')}`],
  }
}

const framework = {
  weeklySchedule: {
    saturday: {
      title: "Planning & Shopping",
      tasks: [
        { task: "Inventory check", time: "30 min" },
        { task: "Shopping list creation", time: "15 min" },
        { task: "Grocery shopping", time: "1 hour" }
      ]
    },
    sunday: {
      title: "Prep Day",
      totalTime: "2.5-3 hours",
      waves: [
        {
          title: "Setup",
          time: "30 min",
          tasks: [
            "Preheat ovens to 425°F",
            "Clean workspace",
            "Label containers"
          ]
        },
        {
          title: "Wave 1",
          time: "30 min",
          tasks: [
            "Preheat ovens to 425°F",
            "Clean workspace",
            "Label containers",
            "Oven 1: Potatoes",
            "Oven 2: Chicken breasts",
            "Rice Cooker: Rice and quinoa",
            "Prep: Form turkey meatballs"
          ]
        },
        {
          title: "Wave 2",
          time: "30 min",
          tasks: [
            "Oven 1: Continue potatoes",
            "Oven 2: Turkey meatballs",
            "Monitor grains",
            "Begin vegetable prep"
          ]
        },
        {
          title: "Wave 3",
          time: "30 min",
          tasks: [
            "Oven 1: Roast vegetables",
            "Oven 2: Complete proteins",
            "Finish grains",
            "Prepare sauces"
          ]
        },
        {
          title: "Final Wave",
          time: "30 min",
          tasks: [
            "Assembly line container filling",
            "Cool items with fan",
            "Prepare breakfast jars",
            "Pack smoothie bags"
          ]
        }
      ]
    },
    wednesday: {
      title: "Mid-week Tasks",
      tasks: [
        "Move Thursday/Friday meals from freezer to fridge",
        "Quick container inventory",
        "Sauce check/refresh"
      ]
    }
  },
  qualityControl: {
    temperatures: {
      protein: [
        { item: "Chicken", temp: "165°F" },
        { item: "Turkey meatballs", temp: "165°F" },
        { item: "Fish", temp: "145°F" }
      ],
      storage: [
        { zone: "Fridge", temp: "34-40°F" },
        { zone: "Freezer", temp: "0°F or below" }
      ]
    },
    cooling: "Items must reach 40°F within 2 hours"
  },
  containers: {
    mainMeals: {
      type: "PrepNaturals 3-Section 34oz Glass Containers",
      sections: [
        { name: "Protein", capacity: "8oz" },
        { name: "Carb", capacity: "2 cups" },
        { name: "Vegetable", capacity: "2 cups" }
      ]
    },
    breakfast: {
      type: "16oz Wide Mouth Mason Jars",
      quantity: "5 jars per person",
      note: "Use plastic mason jar lids"
    },
    smoothies: {
      type: "OXO Good Grips Silicone Reusable Bags",
      features: [
        "Flat bottom design",
        "Freezer-safe construction"
      ]
    },
    sauces: {
      type: "2oz portion cups with lids"
    }
  },
  storage: {
    fridge: [
      { shelf: "Top", contents: "Current day's meals" },
      { shelf: "Middle", contents: "Next day's meals" },
      { shelf: "Bottom", contents: "Day 3 meals" },
      { shelf: "Door", contents: "Sauces and snacks" }
    ],
    freezer: [
      "Thursday/Friday meals",
      "Emergency backup meals",
      "Smoothie packs"
    ]
  },
  scaling: {
    base: {
      servings: "1 person, 5 days",
      proteins: "8.25 lbs total",
      carbs: "10 cups cooked total",
      vegetables: "25 cups total",
      sauces: "10 2-tbsp servings"
    },
    multipliers: [
      { people: 2, factor: "1.75x", note: "accounting for shared prep efficiency" },
      { people: 3, factor: "2.5x" },
      { people: 4, factor: "3.25x" }
    ],
    timeAdjustments: {
      base: "2.5 hours",
      additional: "30 minutes per additional person",
      maximum: "4 people per prep session"
    }
  },
  troubleshooting: {
    foodSafety: [
      {
        issue: "Slow cooling",
        solution: "Use shallow containers, cooling fan"
      },
      {
        issue: "Temperature abuse",
        solution: "Set timers, use thermometer"
      }
    ],
    containers: [
      {
        issue: "Seal failure",
        solution: "Monthly testing, regular replacement"
      },
      {
        issue: "Staining",
        solution: "Immediate washing, baking soda paste"
      }
    ],
    quality: [
      {
        issue: "Dry proteins",
        solution: "Check internal temps, use sauce packets"
      },
      {
        issue: "Soggy vegetables",
        solution: "Separate containers, proper cooling"
      }
    ],
    timeManagement: [
      {
        issue: "Prep running long",
        solution: "Use parallel processing, prep containers first"
      },
      {
        issue: "Uneven cooking",
        solution: "Rotate pans, check oven temperature"
      }
    ]
  }
}

export default function FrameworkPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Core Framework"
          description="Systematic approach to high-protein meal preparation"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Core Framework", href: "/eat/framework" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
            <div className="space-y-4">
              {/* Saturday */}
              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  {framework.weeklySchedule.saturday.title}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.weeklySchedule.saturday.tasks.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span className="flex-1">{item.task}</span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sunday */}
              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  {framework.weeklySchedule.sunday.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Total time: {framework.weeklySchedule.sunday.totalTime}</p>
                <div className="space-y-6">
                  {framework.weeklySchedule.sunday.waves.map((wave, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{wave.title}</h4>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">{wave.time}</span>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {wave.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-start gap-2">
                            <span className="flex-shrink-0">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wednesday */}
              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  {framework.weeklySchedule.wednesday.title}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.weeklySchedule.wednesday.tasks.map((task, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Quality Control */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-primary flex-shrink-0" />
              Quality Control
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <h3 className="font-medium mb-4">Temperature Guidelines</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Proteins</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {framework.qualityControl.temperatures.protein.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.item}</span>
                          <span className="font-mono">{item.temp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Storage</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {framework.qualityControl.temperatures.storage.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{item.zone}</span>
                          <span className="font-mono">{item.temp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <h3 className="font-medium mb-4">Cooling Requirements</h3>
                <div className="text-sm text-muted-foreground">
                  <p>{framework.qualityControl.cooling}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Containers */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary flex-shrink-0" />
              Container System
            </h2>
            <div className="grid gap-4">
              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <h3 className="font-medium mb-4">Main Meals</h3>
                <p className="text-sm text-muted-foreground mb-4">{framework.containers.mainMeals.type}</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {framework.containers.mainMeals.sections.map((section, index) => (
                    <div key={index} className="bg-muted/50 rounded p-3">
                      <h4 className="text-sm font-medium mb-1">{section.name}</h4>
                      <p className="text-sm text-muted-foreground">{section.capacity}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-card border rounded-lg p-4 sm:p-6">
                  <h3 className="font-medium mb-2">Breakfast</h3>
                  <p className="text-sm text-muted-foreground mb-2">{framework.containers.breakfast.type}</p>
                  <p className="text-sm text-muted-foreground">{framework.containers.breakfast.quantity}</p>
                  <p className="text-xs text-muted-foreground mt-2">{framework.containers.breakfast.note}</p>
                </div>

                <div className="bg-card border rounded-lg p-4 sm:p-6">
                  <h3 className="font-medium mb-2">Smoothies</h3>
                  <p className="text-sm text-muted-foreground mb-2">{framework.containers.smoothies.type}</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {framework.containers.smoothies.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Storage */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary flex-shrink-0" />
              Storage Layout
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <h3 className="font-medium mb-4">Refrigerator</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.storage.fridge.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.shelf}</span>
                      <span className="text-right">{item.contents}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <h3 className="font-medium mb-4">Freezer</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.storage.freezer.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
              Troubleshooting
            </h2>
            <div className="grid gap-4">
              {Object.entries(framework.troubleshooting).map(([category, items]) => (
                <div key={category} className="bg-card border rounded-lg p-4 sm:p-6">
                  <h3 className="font-medium mb-4 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
                  <ul className="space-y-4">
                    {items.map((item, index) => (
                      <li key={index} className="text-sm">
                        <div className="font-medium mb-1">{item.issue}</div>
                        <div className="text-muted-foreground">{item.solution}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 