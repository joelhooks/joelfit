import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ShoppingBag, Package, Archive } from 'lucide-react'

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
      "4 lbs chicken breast",
      "3 lbs ground turkey",
      "2.75 lbs white fish"
    ],
    dairy: [
      "Greek yogurt (48 oz)"
    ],
    produce: [
      "Bananas (6)",
      "Potatoes (2.5 lbs)"
    ],
    frozen: [
      "Mixed berries (32 oz)",
      "Broccoli & Cauliflower mix (3 lbs)",
      "Mixed vegetables (3 lbs)"
    ],
    bulk: [
      "White rice (5 cups dry)",
      "Quinoa (2.5 cups dry)",
      "Rolled oats (24 oz)"
    ]
  },
  pantryStaples: {
    proteins: [
      "Protein powder (2 lbs)"
    ],
    oils: [
      "Olive oil (16 oz)",
      "MCT oil (8 oz)",
      "Coconut oil (8 oz)"
    ],
    asian: [
      "Soy sauce (16 oz)",
      "Rice vinegar (16 oz)"
    ],
    condiments: [
      "Hot sauce (preferred brand)",
      "Honey (8 oz)",
      "Almond butter (16 oz)"
    ],
    spices: [
      "MSG (4 oz)",
      "Garlic powder",
      "Black pepper",
      "Kosher salt"
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
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Weekly Shopping</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">Meat Counter</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.weeklyItems.meat.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Dairy</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.weeklyItems.dairy.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Produce</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.weeklyItems.produce.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Frozen</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.weeklyItems.frozen.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Bulk</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.weeklyItems.bulk.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Pantry Staples */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Archive className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Pantry Staples</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium">Proteins</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.pantryStaples.proteins.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Oils</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.pantryStaples.oils.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Asian Section</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.pantryStaples.asian.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Condiments</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.pantryStaples.condiments.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">Spices</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {shoppingData.pantryStaples.spices.map((item) => (
                    <li key={item}>{item}</li>
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