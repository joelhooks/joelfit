import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Clock, Thermometer, Scale, AlertCircle, Package } from 'lucide-react'
import { EquipmentRepository } from '@/lib/repositories/equipment'
import Link from 'next/link'

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
      sections: [
        { name: "Protein", capacity: "8oz" },
        { name: "Carb", capacity: "2 cups" },
        { name: "Vegetable", capacity: "2 cups" }
      ]
    },
    breakfast: {
      quantity: "5 jars per person",
      note: "Use plastic mason jar lids"
    },
    smoothies: {
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

export default async function FrameworkPage() {
  const equipmentRepo = new EquipmentRepository()
  const mealContainers = await equipmentRepo.findBySlug('meal-containers')
  const masonJars = await equipmentRepo.findBySlug('mason-jars')
  const smoothieBags = await equipmentRepo.findBySlug('smoothie-bags')

  // Update container info with equipment data
  const containers = {
    mainMeals: {
      type: mealContainers.description,
      link: mealContainers.link,
      sections: framework.containers.mainMeals.sections
    },
    breakfast: {
      type: masonJars.description,
      link: masonJars.link,
      quantity: framework.containers.breakfast.quantity,
      note: framework.containers.breakfast.note
    },
    smoothies: {
      type: smoothieBags.description,
      link: smoothieBags.link,
      features: framework.containers.smoothies.features
    },
    sauces: framework.containers.sauces
  }

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
          {/* Weekly Schedule */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              Weekly Schedule
            </h2>
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
                      <span className="text-muted-foreground">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sunday */}
              <div className="bg-card border rounded-lg p-4 sm:p-6">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  {framework.weeklySchedule.sunday.title}
                </h3>
                <div className="space-y-6">
                  {framework.weeklySchedule.sunday.waves.map((wave, index) => (
                    <div key={index}>
                      <h4 className="font-medium mb-2">
                        {wave.title} ({wave.time})
                      </h4>
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
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Protein Temperatures</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.qualityControl.temperatures.protein.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span className="flex-1">{item.item}</span>
                      <span>{item.temp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Storage Temperatures</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.qualityControl.temperatures.storage.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span className="flex-1">{item.zone}</span>
                      <span>{item.temp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-card border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Cooling Safety:</span> {framework.qualityControl.cooling}
              </p>
            </div>
          </section>

          {/* Containers */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary flex-shrink-0" />
              Container System
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Main Meals</h3>
                <Link
                  href={containers.mainMeals.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground mb-3 block"
                >
                  {containers.mainMeals.type}
                </Link>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {containers.mainMeals.sections.map((section, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span className="flex-1">{section.name}</span>
                      <span>{section.capacity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Breakfast</h3>
                <Link
                  href={containers.breakfast.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground mb-3 block"
                >
                  {containers.breakfast.type}
                </Link>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0">•</span>
                    <span>{containers.breakfast.quantity}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0">•</span>
                    <span>{containers.breakfast.note}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Smoothies</h3>
                <Link
                  href={containers.smoothies.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground mb-3 block"
                >
                  {containers.smoothies.type}
                </Link>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {containers.smoothies.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Sauces</h3>
                <p className="text-sm text-muted-foreground">{containers.sauces.type}</p>
              </div>
            </div>
          </section>

          {/* Storage */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary flex-shrink-0" />
              Storage Organization
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Fridge Layout</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.storage.fridge.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span className="flex-1">{item.shelf}</span>
                      <span>{item.contents}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Freezer Organization</h3>
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

          {/* Scaling */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-primary flex-shrink-0" />
              Scaling Guide
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Base Quantities</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {Object.entries(framework.scaling.base).map(([key, value]) => (
                    <li key={key} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span className="capitalize flex-1">{key}</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Scaling Multipliers</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.scaling.multipliers.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span className="flex-1">{item.people} people</span>
                      <span>{item.factor}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Base time: {framework.scaling.timeAdjustments.base}</p>
                  <p>{framework.scaling.timeAdjustments.additional}</p>
                  <p>Maximum: {framework.scaling.timeAdjustments.maximum}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
              Troubleshooting Guide
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Food Safety</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.troubleshooting.foodSafety.map((item, index) => (
                    <li key={index} className="flex flex-col gap-1">
                      <span className="font-medium">{item.issue}</span>
                      <span>{item.solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Container Issues</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.troubleshooting.containers.map((item, index) => (
                    <li key={index} className="flex flex-col gap-1">
                      <span className="font-medium">{item.issue}</span>
                      <span>{item.solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Quality Issues</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.troubleshooting.quality.map((item, index) => (
                    <li key={index} className="flex flex-col gap-1">
                      <span className="font-medium">{item.issue}</span>
                      <span>{item.solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Time Management</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {framework.troubleshooting.timeManagement.map((item, index) => (
                    <li key={index} className="flex flex-col gap-1">
                      <span className="font-medium">{item.issue}</span>
                      <span>{item.solution}</span>
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