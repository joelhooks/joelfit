import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ShoppingBag, Archive, Lightbulb } from 'lucide-react'
import { shoppingList } from '@/config/joel'

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
                  {shoppingList.weeklyItems.meat.map((item, index) => (
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
                  {shoppingList.weeklyItems.dairy.map((item, index) => (
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
                  {shoppingList.weeklyItems.produce.map((item, index) => (
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
                  {shoppingList.weeklyItems.frozen.map((item, index) => (
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
                  {shoppingList.weeklyItems.bulk.map((item, index) => (
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
                  {shoppingList.pantryStaples.oils.map((item, index) => (
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
                  {shoppingList.pantryStaples.seasonings.map((item, index) => (
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
                  {shoppingList.pantryStaples.sauces.map((item, index) => (
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
                  {shoppingList.pantryStaples.dryGoods.map((item, index) => (
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
                  {shoppingList.tips.buying.map((tip, index) => (
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
                  {shoppingList.tips.storage.map((tip, index) => (
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