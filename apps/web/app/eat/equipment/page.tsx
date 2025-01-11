import { Metadata } from 'next'
import Link from 'next/link'
import { Package, LayoutGrid, Wrench } from 'lucide-react'
import { equipmentRepo, type Equipment, storageGuide, maintenanceSchedule } from '@/config/equipment'

export const metadata: Metadata = {
  title: 'Container System | High-Protein Meal Prep OS',
  description: 'The container system and equipment used for meal prep'
}

export default function EquipmentPage() {
  const equipment = equipmentRepo.getAll()
  const storageItems = equipment.filter(item => item.category === 'storage')
  const otherItems = equipment.filter(item => item.category !== 'storage')

  return (
    <div className="container max-w-6xl py-6">
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Container System & Equipment</h1>
          <p className="text-lg text-muted-foreground">
            The tools and containers I use for meal prep, with maintenance guides
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Storage Containers</h2>
            </div>

            <div className="grid gap-4">
              {storageItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border hover:border-foreground transition-colors"
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
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Other Equipment</h2>
            </div>

            <div className="grid gap-4">
              {otherItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border hover:border-foreground transition-colors"
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
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Storage Guide</h2>
            </div>

            <div className="grid gap-6">
              <div>
                <h3 className="font-medium mb-3">Container Storage</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {Object.entries(storageGuide.containers).map(([key, value]) => (
                    <li key={key} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-3">Bag Storage</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {Object.entries(storageGuide.bags).map(([key, value]) => (
                    <li key={key} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Maintenance Schedule</h2>
            </div>

            <div className="grid gap-6">
              {Object.entries(maintenanceSchedule).map(([period, tasks]) => (
                <div key={period}>
                  <h3 className="font-medium mb-3 capitalize">{period}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {tasks.map((task, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 