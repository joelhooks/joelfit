import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'
import { ArrowRight, Book, ChefHat } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vegetable Recipes | High-Protein Meal Prep OS',
  description: 'Vegetable prep and seasoning guides for meal prep',
  openGraph: {
    title: 'Vegetable Recipes | High-Protein Meal Prep OS',
    description: 'Vegetable prep and seasoning guides for meal prep',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Vegetable Recipes')}&description=${encodeURIComponent('Vegetable prep and seasoning guides for meal prep')}`,
      width: 1200,
      height: 630,
      alt: 'Vegetable Recipes'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vegetable Recipes | High-Protein Meal Prep OS',
    description: 'Vegetable prep and seasoning guides for meal prep',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Vegetable Recipes')}&description=${encodeURIComponent('Vegetable prep and seasoning guides for meal prep')}`],
  }
}

const recipes = [
  {
    title: "No-Oil Crispy Potatoes",
    description: "Perfectly crispy roasted potatoes without any oil using a special flour coating method.",
    href: "/eat/recipes/vegetables/crispy-potatoes",
    prepTime: "15 minutes",
    cookTime: "60 minutes",
    servings: "6 servings",
    highlights: [
      "No oil needed",
      "Extra crispy exterior",
      "Meal prep friendly",
      "Simple ingredients"
    ]
  }
]

const guides = [
  {
    title: "Frozen Vegetables Guide",
    description: "Complete guide to using frozen vegetables for efficient meal prep, including best types, seasoning, and portioning.",
    href: "/eat/recipes/vegetables/frozen-guide",
    highlights: [
      "No prep work required",
      "Longer shelf life",
      "More nutritious than fresh",
      "Perfect portion control"
    ]
  }
]

export default function VegetablesPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Vegetable Recipes"
          description="Vegetable prep and seasoning guides for meal prep"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Base Recipes", href: "/eat/recipes" },
            { title: "Vegetables", href: "/eat/recipes/vegetables" }
          ]}
        />

        <div className="space-y-8">
          {/* Recipes */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary flex-shrink-0" />
              Recipes
            </h2>
            <div className="space-y-4">
              {recipes.map((recipe) => (
                <Link
                  key={recipe.title}
                  href={recipe.href}
                  className="block group"
                >
                  <div className="bg-card border rounded-lg p-6 group-hover:border-primary transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {recipe.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {recipe.description}
                        </p>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <h4 className="font-medium mb-2">Time & Yield</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li>• Prep: {recipe.prepTime}</li>
                              <li>• Cook: {recipe.cookTime}</li>
                              <li>• Makes: {recipe.servings}</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Highlights</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              {recipe.highlights.map((highlight) => (
                                <li key={highlight}>• {highlight}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Guides */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Book className="h-5 w-5 text-primary flex-shrink-0" />
              Guides
            </h2>
            <div className="space-y-4">
              {guides.map((guide) => (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="block group"
                >
                  <div className="bg-card border rounded-lg p-6 group-hover:border-primary transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {guide.description}
                        </p>
                        <div>
                          <h4 className="font-medium mb-2">Key Points</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {guide.highlights.map((highlight) => (
                              <li key={highlight}>• {highlight}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 