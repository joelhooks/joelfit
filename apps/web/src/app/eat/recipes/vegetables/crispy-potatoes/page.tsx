import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'No-Oil Crispy Potatoes | High-Protein Meal Prep OS',
  description: 'Perfectly crispy roasted potatoes without any oil using a special flour coating method.',
  openGraph: {
    title: 'No-Oil Crispy Potatoes | High-Protein Meal Prep OS',
    description: 'Perfectly crispy roasted potatoes without any oil using a special flour coating method.',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('No-Oil Crispy Potatoes')}&description=${encodeURIComponent('Perfectly crispy roasted potatoes without any oil using a special flour coating method.')}`,
      width: 1200,
      height: 630,
      alt: 'No-Oil Crispy Potatoes'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'No-Oil Crispy Potatoes | High-Protein Meal Prep OS',
    description: 'Perfectly crispy roasted potatoes without any oil using a special flour coating method.',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('No-Oil Crispy Potatoes')}&description=${encodeURIComponent('Perfectly crispy roasted potatoes without any oil using a special flour coating method.')}`],
  }
}

const recipe = {
  title: "No-Oil Crispy Potatoes",
  description: "Perfectly crispy roasted potatoes without any oil using a special flour coating method.",
  prepTime: "15 minutes",
  cookTime: "60 minutes",
  servings: "6 servings",
  equipment: [
    "Large pot",
    "Colander",
    "Large baking sheet",
    "Vegetable peeler",
    "Sharp knife",
    "Measuring spoons"
  ],
  ingredients: [
    "4 pounds russet potatoes",
    "2 tablespoons all-purpose flour",
    "Sea salt, to taste",
    "Freshly cracked black pepper, to taste"
  ],
  method: [
    "Preheat the oven to 450°F.",
    "Peel the potatoes, placing them in cool water after peeling to prevent discoloration.",
    "Cut potatoes into evenly sized pieces (1-2 inches). Place in a pot and cover with cold water.",
    "Salt the water heavily (it should taste like ocean water) to season the potatoes from the inside.",
    "Bring to a boil over high heat (starting with cold water ensures even cooking).",
    "Once boiling, cook for an additional 4 minutes.",
    "Drain potatoes and return to the pot (off heat).",
    "Sprinkle flour over potatoes, cover pot with lid, and shake vigorously to rough up edges.",
    "Spread potatoes in a single layer on a baking sheet (don't crowd).",
    "Season generously with sea salt and freshly cracked black pepper.",
    "Roast for 30-45 minutes, watching carefully as cooking time varies with potato size."
  ],
  mealPrepNotes: [
    "Can be made ahead and reheated in a hot oven until crispy",
    "Store in airtight container in fridge for up to 5 days",
    "Best served fresh, but can be reheated",
    "Don't stack when storing to maintain crispiness"
  ],
  proTips: [
    "Starting with cold water is crucial for even cooking",
    "Don't skip the vigorous shaking - roughed up edges = more crispiness",
    "Single layer is essential for crispy results",
    "Adjust cooking time based on potato size",
    "Season water generously - this is your chance to flavor from within"
  ],
  nutrition: {
    servingSize: "1/6 recipe",
    calories: 245,
    carbs: 55,
    protein: 6,
    sodium: 711,
    fiber: 7,
    sugar: 2
  }
}

export default function CrispyPotatoesPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="No-Oil Crispy Potatoes"
          description="Perfectly crispy roasted potatoes without any oil using a special flour coating method."
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Base Recipes", href: "/eat/recipes" },
            { title: "Vegetables", href: "/eat/recipes/vegetables" },
            { title: "Crispy Potatoes", href: "/eat/recipes/vegetables/crispy-potatoes" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <div className="bg-card border rounded-lg p-6">
              <div className="aspect-video relative bg-accent rounded mb-6">
                {/* Image placeholder for recipe photo */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Recipe Photo (Coming Soon)
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-2">{recipe.title}</h3>
              <p className="text-muted-foreground mb-6">{recipe.description}</p>

              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Time & Yield</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Prep: {recipe.prepTime}</li>
                    <li>• Cook: {recipe.cookTime}</li>
                    <li>• Makes: {recipe.servings}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Equipment Needed</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {recipe.equipment.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Ingredients</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {recipe.ingredients.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Method</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    {recipe.method.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Meal Prep Notes</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {recipe.mealPrepNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Pro Tips</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {recipe.proTips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Nutrition (per serving)</h4>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium">Calories</p>
                      <p className="text-sm text-muted-foreground">{recipe.nutrition.calories} kcal</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Carbs</p>
                      <p className="text-sm text-muted-foreground">{recipe.nutrition.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Protein</p>
                      <p className="text-sm text-muted-foreground">{recipe.nutrition.protein}g</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fiber</p>
                      <p className="text-sm text-muted-foreground">{recipe.nutrition.fiber}g</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sugar</p>
                      <p className="text-sm text-muted-foreground">{recipe.nutrition.sugar}g</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sodium</p>
                      <p className="text-sm text-muted-foreground">{recipe.nutrition.sodium}mg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 