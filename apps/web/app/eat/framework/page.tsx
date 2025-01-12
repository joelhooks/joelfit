import { type Metadata } from 'next'
import { Clock, Thermometer, Scale, AlertCircle, Package } from 'lucide-react'
import Link from 'next/link'
import { type Entity } from '@repo/core'
import { ErrorFallback } from '@repo/ui'
import { FrameworkRepository } from '@/lib/repositories/framework/repository'
import { EquipmentRepository } from '@/lib/repositories/equipment'
import { PageHeader } from '@/components/page-header'
import { FrameworkCard } from '@/components/eat/framework-card'
import { FrameworkList } from '@/components/eat/framework-list'
import { SectionHeader } from '@/components/eat/section-header'

export const metadata: Metadata = {
  title: 'Framework',
  description: 'The JoelFit meal prep framework'
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
      equipment: <Link href={mealContainers.link} target="_blank" className="text-primary hover:underline">{mealContainers.title}</Link>,
      sections: ['protein', 'carbs', 'vegetables'],
      quantity: 10,
      note: 'Glass containers with compartments',
      features: ['Microwave safe', 'Dishwasher safe', 'Airtight seal']
    },
    breakfast: {
      equipment: <Link href={masonJars.link} target="_blank" className="text-primary hover:underline">{masonJars.title}</Link>,
      sections: ['overnight oats', 'protein powder'],
      quantity: 5,
      note: 'Wide mouth for easy filling/cleaning',
      features: ['Airtight seal', 'Easy to clean', 'Durable']
    },
    smoothies: {
      equipment: <Link href={smoothieBags.link} target="_blank" className="text-primary hover:underline">{smoothieBags.title}</Link>,
      sections: ['fruit', 'greens', 'protein'],
      quantity: 5,
      note: 'Pre-portioned smoothie packs',
      features: ['Freezer safe', 'Reusable', 'Easy to fill']
    },
    sauces: {
      equipment: <Link href={masonJars.link} target="_blank" className="text-primary hover:underline">{masonJars.title}</Link>,
      sections: ['sauces', 'dressings'],
      quantity: 3,
      note: 'Small jars for sauces/dressings',
      features: ['Airtight seal', 'Easy to pour', 'Stackable']
    }
  }

  return (
    <div className="container py-6">
      <div className="max-w-4xl">
        <PageHeader
          title="Core Framework"
          description="Systematic approach to high-protein meal preparation"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Framework", href: "/eat/framework" }
          ]}
        />

        <div className="space-y-12">
          {/* Weekly Schedule */}
          <section className="space-y-6">
            <SectionHeader
              title="Weekly Schedule"
              icon={<Clock className="h-5 w-5 text-primary" />}
            />
            <div className="space-y-4">
              {/* Saturday */}
              <FrameworkCard
                title={framework.weeklySchedule.saturday.title}
                icon={<Clock className="h-4 w-4 text-primary" />}
              >
                <FrameworkList
                  items={framework.weeklySchedule.saturday.tasks.map(task => (
                    <span>
                      {task.task}
                      <span className="text-xs ml-1">({task.time})</span>
                    </span>
                  ))}
                  icon={<Clock className="h-3.5 w-3.5 mt-0.5 text-primary" />}
                />
              </FrameworkCard>

              {/* Sunday */}
              <FrameworkCard
                title={framework.weeklySchedule.sunday.title}
                subtitle={`Total: ${framework.weeklySchedule.sunday.totalTime}`}
                icon={<Clock className="h-4 w-4 text-primary" />}
              >
                <div className="space-y-3">
                  {framework.weeklySchedule.sunday.waves.map((wave, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        {wave.title}
                        <span className="text-xs font-normal text-muted-foreground">
                          ({wave.time})
                        </span>
                      </h4>
                      <FrameworkList items={wave.tasks} />
                    </div>
                  ))}
                </div>
              </FrameworkCard>

              {/* Wednesday */}
              <FrameworkCard
                title={framework.weeklySchedule.wednesday.title}
                icon={<Clock className="h-4 w-4 text-primary" />}
              >
                <FrameworkList
                  items={framework.weeklySchedule.wednesday.tasks}
                  icon={<Clock className="h-3.5 w-3.5 mt-0.5 text-primary" />}
                />
              </FrameworkCard>
            </div>
          </section>

          {/* Container System */}
          <section className="space-y-6">
            <SectionHeader
              title="Container System"
              icon={<Package className="h-5 w-5 text-primary" />}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(containers).map(([type, container]) => (
                <FrameworkCard
                  key={type}
                  title={type}
                  icon={<Package className="h-4 w-4 text-primary" />}
                >
                  <div className="space-y-2">
                    <div className="text-sm">{container.equipment}</div>
                    <div className="text-xs text-muted-foreground">
                      Quantity: {container.quantity}
                    </div>
                    <div className="text-sm text-muted-foreground">{container.note}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {container.features.map((feature, i) => (
                        <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </FrameworkCard>
              ))}
            </div>
          </section>

          {/* Storage Layout */}
          <section className="space-y-6">
            <SectionHeader
              title="Storage Layout"
              icon={<Thermometer className="h-5 w-5 text-primary" />}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {/* Fridge */}
              <FrameworkCard
                title="Fridge Organization"
                icon={<Thermometer className="h-4 w-4 text-primary" />}
              >
                <FrameworkList items={framework.storage.fridge} />
              </FrameworkCard>

              {/* Freezer */}
              <FrameworkCard
                title="Freezer Organization"
                icon={<Thermometer className="h-4 w-4 text-primary" />}
              >
                <FrameworkList items={framework.storage.freezer} />
              </FrameworkCard>
            </div>
          </section>

          {/* Scaling */}
          <section className="space-y-6">
            <SectionHeader
              title="Scaling"
              icon={<Scale className="h-5 w-5 text-primary" />}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(framework.scaling).map(([servings, details]) => (
                <FrameworkCard
                  key={servings}
                  title={`${servings} Servings`}
                  icon={<Scale className="h-4 w-4 text-primary" />}
                >
                  <FrameworkList items={details} />
                </FrameworkCard>
              ))}
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="space-y-6">
            <SectionHeader
              title="Troubleshooting"
              icon={<AlertCircle className="h-5 w-5 text-primary" />}
            />
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(framework.troubleshooting).map(([category, items]) => (
                <FrameworkCard
                  key={category}
                  title={category.replace(/-/g, ' ')}
                  icon={<AlertCircle className="h-4 w-4 text-primary" />}
                >
                  <FrameworkList items={items} />
                </FrameworkCard>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 