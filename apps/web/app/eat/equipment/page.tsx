import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
    title: "PrepNaturals 3-Section Glass Containers",
    description: "34oz containers with separate sections to keep foods from touching. Perfect for the 1-2-3 system. You'll need 15 for a full week.",
    link: "https://amzn.to/3ZWylEa",
    required: true,
    price: "$40-50 for set"
  },
  {
    title: "Wide Mouth Mason Jars",
    description: "16oz jars perfect for overnight oats. Get enough for your breakfast prep.",
    link: "https://amzn.to/3PjL4vT",
    required: true,
    price: "$15-20"
  },
  {
    title: "Mason Jar Plastic Lids",
    description: "Much better than the metal ones for daily use.",
    link: "https://amzn.to/405PT0y",
    required: true,
    price: "$8-10"
  },
  {
    title: "OXO Silicone Reusable Bags",
    description: "Perfect for smoothie prep with flat bottoms for easy filling.",
    link: "https://amzn.to/3C7pM1g",
    required: true,
    price: "$20-25"
  },
  {
    title: "Chalk Markers",
    description: "For labeling containers. Easy to remove and reuse.",
    link: "https://amzn.to/40kYAWq",
    price: "$10-15"
  },
  {
    title: "Rice Cooker",
    description: "Essential for perfect rice and grains every time. Set it and forget it while focusing on other prep. This specific model is tested and proven for our system.",
    link: "https://amzn.to/3DA5cXN",
    required: true,
    price: "$30-40"
  }
]

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
            <h2 className="text-xl font-semibold mb-4">Core Equipment</h2>
            <div className="grid gap-6">
              {equipment.map((item) => (
                <div 
                  key={item.title}
                  className="bg-card border rounded-lg p-6"
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
                      <p className="text-muted-foreground mb-4">{item.description}</p>
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
                      <div className="relative w-24 h-24 bg-accent rounded">
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
            <h2 className="text-xl font-semibold mb-4">Storage Layout</h2>
            <div className="bg-card border rounded-lg p-6">
              <div className="aspect-video relative bg-accent rounded mb-6">
                {/* Image placeholder for storage layout diagram */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Storage Layout Diagram (Coming Soon)
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Fridge Organization</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Dedicate a full shelf to meal prep containers</li>
                    <li>• Keep Monday-Wednesday meals in main fridge</li>
                    <li>• Store sauces in door or small containers</li>
                    <li>• Label everything with day to be eaten</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Freezer Strategy</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Thursday/Friday meals go in freezer initially</li>
                    <li>• Move to fridge two days before eating</li>
                    <li>• Keep backup meals in dedicated section</li>
                    <li>• Store smoothie bags flat for easy stacking</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Maintenance</h2>
            <div className="bg-card border rounded-lg p-6">
              <ul className="space-y-2 text-muted-foreground">
                <li>• Hand wash containers to prevent warping</li>
                <li>• Check seals monthly for wear</li>
                <li>• Replace containers annually or if damaged</li>
                <li>• Deep clean rice cooker monthly</li>
                <li>• Wash smoothie bags immediately after use</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 