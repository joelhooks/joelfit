import { type Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui'
import { Clock, Thermometer, Scale, AlertCircle, Package } from 'lucide-react'
import Link from 'next/link'
import { type Entity } from '@repo/core'
import { PageSkeleton, ErrorFallback } from '@repo/ui'
import { FrameworkRepository } from '@/lib/repositories/framework/repository'
import { EquipmentRepository } from '@/lib/repositories/equipment'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Framework',
  description: 'The JoelFit meal prep framework'
}

interface Framework extends Entity {
  weeklySchedule: {
    saturday: {
      title: string
      tasks: Array<{ task: string; time: string }>
    }
    sunday: {
      title: string
      totalTime: string
      waves: Array<{
        title: string
        time: string
        tasks: string[]
      }>
    }
    wednesday: {
      title: string
      tasks: string[]
    }
  }
  storage: {
    fridge: string[]
    freezer: string[]
  }
  scaling: Record<string, string[]>
  troubleshooting: Record<string, string[]>
}

interface Equipment extends Entity {
  title: string
  link: string
}

export default async function FrameworkPage() {
  const frameworkRepo = new FrameworkRepository()
  const equipmentRepo = new EquipmentRepository()

  const [framework, equipment] = await Promise.all([
    frameworkRepo.findAll().then(frameworks => frameworks[0]),
    Promise.all([
      equipmentRepo.findBySlug('prepnaturals-5-pack-34-oz-glass-meal-prep-containers'),
      equipmentRepo.findBySlug('ball-wide-mouth-mason-jars-32-oz'),
      equipmentRepo.findBySlug('oxo-good-grips-silicone-reusable-bag')
    ]).catch(() => [
      { title: 'Glass Meal Prep Containers', link: 'https://amzn.to/3RYbRGe' },
      { title: 'Mason Jars', link: 'https://amzn.to/3RYbRGe' },
      { title: 'Silicone Bags', link: 'https://amzn.to/3RYbRGe' }
    ] as Equipment[])
  ])

  if (!framework) {
    return <ErrorFallback title="Failed to load framework" />
  }

  const [mealContainers, masonJars, smoothieBags] = equipment

  const containers = {
    mainMeals: {
      equipment: <Link href={mealContainers.link} target="_blank">{mealContainers.title}</Link>,
      sections: ['protein', 'carbs', 'vegetables'],
      quantity: 10,
      note: 'Glass containers with compartments',
      features: ['Microwave safe', 'Dishwasher safe', 'Airtight seal']
    },
    breakfast: {
      equipment: <Link href={masonJars.link} target="_blank">{masonJars.title}</Link>,
      sections: ['overnight oats', 'protein powder'],
      quantity: 5,
      note: 'Wide mouth for easy filling/cleaning',
      features: ['Airtight seal', 'Easy to clean', 'Durable']
    },
    smoothies: {
      equipment: <Link href={smoothieBags.link} target="_blank">{smoothieBags.title}</Link>,
      sections: ['fruit', 'greens', 'protein'],
      quantity: 5,
      note: 'Pre-portioned smoothie packs',
      features: ['Freezer safe', 'Reusable', 'Easy to fill']
    },
    sauces: {
      equipment: <Link href={masonJars.link} target="_blank">{masonJars.title}</Link>,
      sections: ['sauces', 'dressings'],
      quantity: 3,
      note: 'Small jars for sauces/dressings',
      features: ['Airtight seal', 'Easy to pour', 'Stackable']
    }
  }

  return (
    <div className="container py-6">
      <PageHeader
        title="Core Framework"
        description="Systematic approach to high-protein meal preparation"
      />

      {/* Weekly Schedule */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Weekly Schedule</h2>
        <div className="grid gap-6">
          {/* Saturday */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Clock className="w-5 h-5" />
              <CardTitle>{framework.weeklySchedule.saturday.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {framework.weeklySchedule.saturday.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{task.task}</span>
                  <span className="text-muted-foreground">({task.time})</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Sunday */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Clock className="w-5 h-5" />
              <CardTitle>
                {framework.weeklySchedule.sunday.title}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  (Total: {framework.weeklySchedule.sunday.totalTime})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {framework.weeklySchedule.sunday.waves.map((wave, i) => (
                <div key={i}>
                  <h4 className="font-medium mb-2">
                    {wave.title}
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      ({wave.time})
                    </span>
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {wave.tasks.map((task, j) => (
                      <li key={j}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Wednesday */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Clock className="w-5 h-5" />
              <CardTitle>{framework.weeklySchedule.wednesday.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {framework.weeklySchedule.wednesday.tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{task}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Container System */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Container System</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(containers).map(([type, container]) => (
            <Card key={type}>
              <CardHeader className="flex flex-row items-center gap-2">
                <Package className="w-5 h-5" />
                <CardTitle className="capitalize">{type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>{container.equipment}</div>
                <div className="text-sm text-muted-foreground">
                  Quantity: {container.quantity}
                </div>
                <div className="text-sm">{container.note}</div>
                <div className="flex flex-wrap gap-2">
                  {container.features.map((feature, i) => (
                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Storage Layout */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Storage Layout</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Fridge */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Thermometer className="w-5 h-5" />
              <CardTitle>Fridge Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {framework.storage.fridge.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Freezer */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Thermometer className="w-5 h-5" />
              <CardTitle>Freezer Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {framework.storage.freezer.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Scaling */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Scaling</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(framework.scaling).map(([servings, details]) => (
            <Card key={servings}>
              <CardHeader className="flex flex-row items-center gap-2">
                <Scale className="w-5 h-5" />
                <CardTitle>{servings} Servings</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(framework.troubleshooting).map(([category, items]) => (
            <Card key={category}>
              <CardHeader className="flex flex-row items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                <CardTitle className="capitalize">
                  {category.replace(/-/g, ' ')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
} 