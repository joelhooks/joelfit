import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ShoppingBag, Package, Archive, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shopping List | High-Protein Meal Prep OS',
  description: 'Weekly shopping list and pantry staples for the meal prep system',
  openGraph: {
    title: 'Shopping List | High-Protein Meal Prep OS',
    description: 'Weekly shopping list and pantry staples for the meal prep system',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Shopping List')}&description=${encodeURIComponent('Weekly shopping list and pantry staples for the meal prep system')}`,
      width: 1200,
      height: 630,
      alt: 'Shopping List'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopping List | High-Protein Meal Prep OS',
    description: 'Weekly shopping list and pantry staples for the meal prep system',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Shopping List')}&description=${encodeURIComponent('Weekly shopping list and pantry staples for the meal prep system')}`],
  }
}

const shoppingData = {
  weeklyItems: {
    meat: [
      "5 lbs chicken breast",
      "3 lbs turkey breast",
      "2 lbs white fish",
      "1 lb ground turkey"
    ],
    dairy: [
      "Greek yogurt (32 oz)",
      "Cottage cheese (16 oz)",
      "Egg whites (32 oz)",
      "Protein drinks"
    ],
    produce: [
      "Bananas",
      "Mixed berries",
      "Lemons",
      "Fresh herbs"
    ],
    frozen: [
      "Broccoli & cauliflower (5 lbs)",
      "Mixed vegetables (3 lbs)",
      "Mixed berries (2 lbs)"
    ],
    bulk: [
      "Rice (5 lbs)",
      "Quinoa (2 lbs)",
      "Sweet potatoes (3 lbs)",
      "Oats (2 lbs)"
    ]
  },
  pantryStaples: {
    oils: [
      "Olive oil (16 oz)",
      "MCT oil (8 oz)",
      "Coconut oil (8 oz)",
      "Rice vinegar (16 oz)"
    ],
    seasonings: [
      "MSG (4 oz)",
      "Garlic powder",
      "Black pepper",
      "Kosher salt",
      "Red pepper flakes"
    ],
    sauces: [
      "Soy sauce (16 oz)",
      "Hot sauce",
      "Fish sauce",
      "Oyster sauce"
    ],
    dryGoods: [
      "Protein powder",
      "Creatine",
      "Rice cakes",
      "Chia seeds"
    ]
  },
  tips: {
    buying: [
      "Buy meat in bulk when on sale",
      "Check frozen section for deals",
      "Compare unit prices",
      "Buy seasonal produce"
    ],
    storage: [
      "Portion meat before freezing",
      "Use airtight containers",
      "Label everything with dates",
      "Rotate stock regularly"
    ]
  }
}

export default function ShoppingListPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Shopping List"
          description="Weekly shopping list and pantry staples for the meal prep system"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Shopping", href: "/eat/shopping" }
          ]}
        />

        <div className="space-y-8">
          {/* Weekly Shopping */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0" />
              Weekly Shopping
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Meat Counter</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.weeklyItems.meat.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Dairy</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.weeklyItems.dairy.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Produce</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.weeklyItems.produce.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Frozen</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.weeklyItems.frozen.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Bulk</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.weeklyItems.bulk.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Pantry Staples */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Archive className="h-5 w-5 text-primary flex-shrink-0" />
              Pantry Staples
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Oils & Vinegars</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.pantryStaples.oils.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Seasonings</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.pantryStaples.seasonings.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Sauces</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.pantryStaples.sauces.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Dry Goods</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.pantryStaples.dryGoods.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Shopping Tips */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary flex-shrink-0" />
              Shopping Tips
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Buying Strategy</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.tips.buying.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Storage Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {shoppingData.tips.storage.map((tip, index) => (
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