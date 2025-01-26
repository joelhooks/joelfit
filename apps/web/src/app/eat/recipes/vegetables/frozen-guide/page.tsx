import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Frozen Vegetables Guide | High-Protein Meal Prep OS',
  description: 'Complete guide to using frozen vegetables for efficient meal prep, including best types, seasoning, and portioning.',
  openGraph: {
    title: 'Frozen Vegetables Guide | High-Protein Meal Prep OS',
    description: 'Complete guide to using frozen vegetables for efficient meal prep, including best types, seasoning, and portioning.',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Frozen Vegetables Guide')}&description=${encodeURIComponent('Complete guide to using frozen vegetables for efficient meal prep, including best types, seasoning, and portioning.')}`,
      width: 1200,
      height: 630,
      alt: 'Frozen Vegetables Guide'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frozen Vegetables Guide | High-Protein Meal Prep OS',
    description: 'Complete guide to using frozen vegetables for efficient meal prep, including best types, seasoning, and portioning.',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Frozen Vegetables Guide')}&description=${encodeURIComponent('Complete guide to using frozen vegetables for efficient meal prep, including best types, seasoning, and portioning.')}`],
  }
}

const guide = {
  title: "Frozen Vegetables Guide",
  description: "Complete guide to using frozen vegetables for efficient meal prep, including best types, seasoning, and portioning.",
  recommendedTypes: [
    {
      name: "Broccoli & Cauliflower Mix",
      why: "Perfect balance of nutrients, holds texture well when cooked",
      portion: "1.5-2 cups per meal",
      tips: "Steam in microwave 3-4 minutes, season after cooking"
    },
    {
      name: "Mixed Vegetables (Carrots, Peas, Corn, Green Beans)",
      why: "Variety of nutrients and colors, consistent quality year-round",
      portion: "1 cup per meal",
      tips: "Great for adding to rice or quinoa bowls"
    },
    {
      name: "Brussels Sprouts",
      why: "High in fiber and nutrients, roasts well from frozen",
      portion: "1-1.5 cups per meal",
      tips: "Thaw slightly before roasting for better browning"
    },
    {
      name: "Green Beans",
      why: "Maintains crunch, versatile for different cuisines",
      portion: "1 cup per meal",
      tips: "Steam just until bright green to maintain texture"
    }
  ],
  seasoningCombos: [
    {
      name: "Mediterranean",
      ingredients: [
        "Garlic powder",
        "Dried oregano",
        "Lemon zest",
        "Black pepper"
      ]
    },
    {
      name: "Asian-Inspired",
      ingredients: [
        "Toasted sesame oil",
        "Soy sauce",
        "Ginger powder",
        "Red pepper flakes"
      ]
    },
    {
      name: "Simple Savory",
      ingredients: [
        "MSG",
        "Black pepper",
        "Garlic powder",
        "Onion powder"
      ]
    },
    {
      name: "Spicy Southwest",
      ingredients: [
        "Chili powder",
        "Cumin",
        "Garlic powder",
        "Lime zest"
      ]
    }
  ],
  cookingMethods: [
    {
      method: "Microwave Steaming",
      instructions: [
        "Place vegetables in microwave-safe container",
        "Add 1-2 tablespoons water",
        "Cover with vented lid or plastic wrap",
        "Microwave 3-4 minutes, checking halfway",
        "Drain excess water",
        "Season immediately while hot"
      ],
      bestFor: ["Broccoli", "Cauliflower", "Mixed Vegetables", "Green Beans"]
    },
    {
      method: "Oven Roasting",
      instructions: [
        "Preheat oven to 425°F",
        "Spread vegetables on baking sheet",
        "Season with salt and preferred spices",
        "Roast 20-25 minutes, stirring halfway",
        "Finish under broiler for extra crispiness"
      ],
      bestFor: ["Brussels Sprouts", "Cauliflower", "Broccoli"]
    }
  ],
  mealPrepTips: [
    "Buy in bulk when on sale - frozen vegetables last 6-8 months",
    "Keep multiple varieties on hand for different meal combinations",
    "Season after cooking to prevent soggy vegetables",
    "Don't thaw before cooking unless recipe specifically calls for it",
    "Store in airtight containers with moisture-absorbing paper towels",
    "Label containers with date and contents for easy rotation"
  ],
  nutritionNotes: [
    "Often more nutritious than fresh due to flash-freezing",
    "No washing or chopping required - saves time and reduces waste",
    "Zero prep work needed - perfect for busy meal prep days",
    "Most varieties are just vegetables - no added oils or preservatives",
    "Easy to portion control with measuring cups"
  ]
}

export default function FrozenVegetablesGuidePage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Frozen Vegetables Guide"
          description="Complete guide to using frozen vegetables for efficient meal prep, including best types, seasoning, and portioning."
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Base Recipes", href: "/eat/recipes" },
            { title: "Vegetables", href: "/eat/recipes/vegetables" },
            { title: "Frozen Guide", href: "/eat/recipes/vegetables/frozen-guide" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-6">{guide.title}</h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-medium mb-4">Recommended Types</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {guide.recommendedTypes.map((type) => (
                      <div key={type.name} className="bg-muted/50 rounded-lg p-4">
                        <h5 className="font-medium mb-2">{type.name}</h5>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Why: {type.why}</li>
                          <li>• Portion: {type.portion}</li>
                          <li>• Tip: {type.tips}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Seasoning Combinations</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {guide.seasoningCombos.map((combo) => (
                      <div key={combo.name} className="bg-muted/50 rounded-lg p-4">
                        <h5 className="font-medium mb-2">{combo.name}</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {combo.ingredients.map((ingredient, index) => (
                            <li key={index}>• {ingredient}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Cooking Methods</h4>
                  {guide.cookingMethods.map((method) => (
                    <div key={method.method} className="bg-muted/50 rounded-lg p-4 mb-4">
                      <h5 className="font-medium mb-2">{method.method}</h5>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h6 className="text-sm font-medium mb-1">Instructions</h6>
                          <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                            {method.instructions.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium mb-1">Best For</h6>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {method.bestFor.map((item, index) => (
                              <li key={index}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Meal Prep Tips</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {guide.mealPrepTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-4">Nutrition Notes</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {guide.nutritionNotes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 