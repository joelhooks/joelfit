import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Clock, Thermometer, Scale, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Core Framework | High-Protein Meal Prep OS',
  description: 'Systematic approach to high-protein meal preparation',
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
            "Oven 1: Sweet potatoes",
            "Oven 2: Chicken breasts",
            "Stovetop: Rice and quinoa",
            "Prep: Form turkey meatballs"
          ]
        },
        {
          title: "Wave 2",
          time: "30 min",
          tasks: [
            "Oven 1: Continue sweet potatoes",
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
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {framework.weeklySchedule.saturday.title}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.weeklySchedule.saturday.tasks.map((item, index) => (
                    <li key={index}>
                      • {item.task} ({item.time})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sunday */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {framework.weeklySchedule.sunday.title} ({framework.weeklySchedule.sunday.totalTime})
                </h3>
                <div className="space-y-6">
                  {framework.weeklySchedule.sunday.waves.map((wave, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">{wave.title} ({wave.time})</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {wave.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>• {task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wednesday */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {framework.weeklySchedule.wednesday.title}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.weeklySchedule.wednesday.tasks.map((task, index) => (
                    <li key={index}>• {task}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Quality Control</h2>
            <div className="bg-card border rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-primary" />
                    Required Temperatures
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Proteins</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {framework.qualityControl.temperatures.protein.map((item, index) => (
                          <li key={index}>• {item.item}: {item.temp}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Storage</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {framework.qualityControl.temperatures.storage.map((item, index) => (
                          <li key={index}>• {item.zone}: {item.temp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Cooling Requirements</h3>
                  <p className="text-sm text-muted-foreground">{framework.qualityControl.cooling}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Container System</h2>
            <div className="space-y-4">
              {/* Main Meals */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-medium mb-4">Main Meals</h3>
                <p className="text-sm text-muted-foreground mb-4">{framework.containers.mainMeals.type}</p>
                <div className="grid gap-4 md:grid-cols-3">
                  {framework.containers.mainMeals.sections.map((section) => (
                    <div key={section.name} className="bg-accent/50 rounded-lg p-4">
                      <h4 className="font-medium mb-1">{section.name}</h4>
                      <p className="text-sm text-muted-foreground">Capacity: {section.capacity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Containers */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-2">Breakfast</h3>
                  <p className="text-sm text-muted-foreground mb-2">{framework.containers.breakfast.type}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {framework.containers.breakfast.quantity}</p>
                  <p className="text-sm text-muted-foreground">Note: {framework.containers.breakfast.note}</p>
                </div>
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-2">Smoothies</h3>
                  <p className="text-sm text-muted-foreground mb-2">{framework.containers.smoothies.type}</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {framework.containers.smoothies.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Storage Layout</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-medium mb-4">Refrigerator</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.storage.fridge.map((item, index) => (
                    <li key={index}>• {item.shelf}: {item.contents}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-medium mb-4">Freezer</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.storage.freezer.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Scaling Guide</h2>
            <div className="space-y-4">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  Base System
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Servings: {framework.scaling.base.servings}</p>
                  <p>• Proteins: {framework.scaling.base.proteins}</p>
                  <p>• Carbs: {framework.scaling.base.carbs}</p>
                  <p>• Vegetables: {framework.scaling.base.vegetables}</p>
                  <p>• Sauces: {framework.scaling.base.sauces}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-4">Scaling Multipliers</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {framework.scaling.multipliers.map((item, index) => (
                      <li key={index}>
                        • {item.people} people: {item.factor}
                        {item.note && <span className="block text-xs ml-4">({item.note})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-4">Time Adjustments</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Base time: {framework.scaling.timeAdjustments.base}</li>
                    <li>• Additional: {framework.scaling.timeAdjustments.additional}</li>
                    <li>• Maximum: {framework.scaling.timeAdjustments.maximum}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
            <div className="space-y-4">
              {Object.entries(framework.troubleshooting).map(([category, issues]) => (
                <div key={category} className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    {category.split(/(?=[A-Z])/).join(" ")}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {issues.map((item, index) => (
                      <div key={index} className="bg-accent/50 rounded-lg p-4">
                        <p className="font-medium text-sm mb-1">{item.issue}</p>
                        <p className="text-sm text-muted-foreground">{item.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 