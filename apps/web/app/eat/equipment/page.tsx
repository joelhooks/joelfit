import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Package, LayoutGrid, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Container System | High-Protein Meal Prep OS',
  description: 'Essential equipment and storage solutions for meal prep',
  openGraph: {
    title: 'Container System | High-Protein Meal Prep OS',
    description: 'Essential equipment and storage solutions for meal prep',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Container System')}&description=${encodeURIComponent('Essential equipment and storage solutions for meal prep')}`,
      width: 1200,
      height: 630,
      alt: 'Container System'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Container System | High-Protein Meal Prep OS',
    description: 'Essential equipment and storage solutions for meal prep',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Container System')}&description=${encodeURIComponent('Essential equipment and storage solutions for meal prep')}`],
  }
}

interface EquipmentItem {
  title: string
  description: string
  link: string
  imageUrl?: string
  price?: string
  required?: boolean
}

const equipment: EquipmentItem[] = [
  {
    title: "3-Compartment Glass Containers",
    description: "32 oz glass containers with dividers and snap-locking lids",
    link: "https://amazon.com",
    price: "$40/6-pack",
    required: true
  },
  {
    title: "32 oz Mason Jars",
    description: "Wide-mouth jars for overnight oats and smoothies",
    link: "https://amazon.com",
    price: "$20/12-pack",
    required: true
  },
  {
    title: "Digital Food Scale",
    description: "Precise measurements for portioning",
    link: "https://amazon.com",
    price: "$25",
    required: true
  },
  {
    title: "Rice Cooker",
    description: "6-cup capacity with steamer basket",
    link: "https://amazon.com",
    price: "$100",
    required: true
  }
]

const storage = {
  fridge: [
    "Dedicate a full shelf to meal prep containers",
    "Keep Monday-Wednesday meals in main fridge",
    "Store sauces in door or small containers",
    "Label everything with day to be eaten"
  ],
  freezer: [
    "Thursday/Friday meals go in freezer initially",
    "Move to fridge two days before eating",
    "Keep backup meals in dedicated section",
    "Store smoothie bags flat for easy stacking"
  ]
}

const maintenance = {
  containers: [
    "Hand wash containers to prevent warping",
    "Check seals monthly for wear",
    "Replace containers annually or if damaged",
    "Store lids separately to prevent odors"
  ],
  equipment: [
    "Deep clean rice cooker monthly",
    "Calibrate scale every 3 months",
    "Clean blender immediately after use",
    "Check container seals regularly"
  ]
}

export default function EquipmentPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Container System"
          description="Essential equipment and storage solutions for efficient meal prep"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Container System", href: "/eat/equipment" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary flex-shrink-0" />
              Core Equipment
            </h2>
            <div className="grid gap-4">
              {equipment.map((item) => (
                <div 
                  key={item.title}
                  className="bg-card border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{item.title}</h3>
                        {item.required && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                      <div className="flex items-center gap-4">
                        <Link 
                          href={item.link}
                          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                          target="_blank"
                          rel="nofollow"
                        >
                          View on Amazon
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                        {item.price && (
                          <span className="text-sm text-muted-foreground">
                            {item.price}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.imageUrl && (
                      <div className="relative w-24 h-24 bg-muted rounded">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary flex-shrink-0" />
              Storage Layout
            </h2>
            <div className="grid gap-4">
              <div className="bg-card border rounded-lg p-4">
                <div className="aspect-video relative bg-muted rounded mb-4">
                  {/* Image placeholder for storage layout diagram */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    Storage Layout Diagram (Coming Soon)
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Fridge Organization</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {storage.fridge.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Freezer Strategy</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {storage.freezer.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary flex-shrink-0" />
              Maintenance Tips
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Container Care</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {maintenance.containers.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Equipment Care</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {maintenance.equipment.map((tip, index) => (
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