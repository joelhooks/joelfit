import { Metadata } from 'next'
import Link from 'next/link'
import { Package, LayoutGrid, Wrench } from 'lucide-react'
import { EquipmentRepository } from '@/lib/repositories/equipment'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'

export const metadata: Metadata = {
  title: 'Container System | High-Protein Meal Prep OS',
  description: 'The container system and equipment used for meal prep',
  openGraph: {
    title: 'Container System | High-Protein Meal Prep OS',
    description: 'The container system and equipment used for meal prep',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Container System')}&description=${encodeURIComponent('The container system and equipment used for meal prep')}`,
      width: 1200,
      height: 630,
      alt: 'Container System'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Container System | High-Protein Meal Prep OS',
    description: 'The container system and equipment used for meal prep',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Container System')}&description=${encodeURIComponent('The container system and equipment used for meal prep')}`],
  }
}

export default async function EquipmentPage() {
  const equipmentRepo = new EquipmentRepository()
  const equipment = await equipmentRepo.findAll()
  const storageGuide = equipmentRepo.getStorageGuide()
  const maintenanceSchedule = equipmentRepo.getMaintenanceSchedule()

  const storageItems = equipment.filter(item => item.category === 'storage')
  const otherItems = equipment.filter(item => item.category !== 'storage')

  return (
    <main className="container py-6">
      <PageHeader
        title="Container System & Equipment"
        description="The tools and containers I use for meal prep, with maintenance guides"
        breadcrumbs={[
          { title: "Eat", href: "/eat" },
          { title: "Equipment", href: "/eat/equipment" }
        ]}
      />

      <div className="space-y-8">
        {/* Equipment Lists */}
        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary flex-shrink-0" />
              Storage Containers
            </h2>
            <div className="grid gap-4">
              {storageItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-70 transition-opacity"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      {item.maintenance && (
                        <p className="text-xs text-muted-foreground">
                          Maintenance: {item.maintenance}
                        </p>
                      )}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary flex-shrink-0" />
              Other Equipment
            </h2>
            <div className="grid gap-4">
              {otherItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-70 transition-opacity"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>
                      {item.maintenance && (
                        <p className="text-xs text-muted-foreground">
                          Maintenance: {item.maintenance}
                        </p>
                      )}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Guides */}
        <div className="grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary flex-shrink-0" />
              Storage Guide
            </h2>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Container Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {Object.entries(storageGuide.containers).map(([key, value]) => (
                      <li key={key} className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bag Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {Object.entries(storageGuide.bags).map(([key, value]) => (
                      <li key={key} className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary flex-shrink-0" />
              Maintenance Schedule
            </h2>
            <div className="grid gap-4">
              {Object.entries(maintenanceSchedule).map(([period, tasks]) => (
                <Card key={period}>
                  <CardHeader>
                    <CardTitle className="capitalize">{period}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {tasks.map((task, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="flex-shrink-0">•</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 