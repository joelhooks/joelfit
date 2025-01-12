import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'Sauce Recipes | High-Protein Meal Prep OS',
  description: 'Sauce recipes and variations for meal prep',
}

const dillYogurtSauce = {
  title: "Dill & Za&apos;atar Yogurt Sauce",
  description: "A savory yogurt sauce that combines fresh dill and za&apos;atar with MSG for a versatile, macro-friendly sauce perfect for meal prep proteins.",
  prepTime: "10 minutes",
  restTime: "30 minutes",
  yield: "1 cup (8 servings of 2 tbsp each)",
  storageLife: "5-7 days refrigerated",
  equipment: [
    "Medium mixing bowl",
    "Microplane or garlic press",
    "Fine grater for lemon zest",
    "Small storage containers for meal prep portions"
  ],
  baseIngredients: [
    "1 cup non-fat Greek yogurt (0% fat)",
    "2 tablespoons fresh dill, finely chopped (or 2 teaspoons dried)",
    "1½ teaspoons za'atar",
    "1 large clove garlic, finely grated",
    "1 tablespoon lemon juice",
    "1 teaspoon lemon zest",
    "½ teaspoon MSG",
    "½-¾ teaspoon kosher salt (or to taste)",
    "Fresh cracked black pepper to taste",
    "1-2 tablespoons water (to adjust consistency)"
  ],
  optionalAdditions: [
    "Pinch of sumac (for extra brightness)",
    "Extra garlic clove for meal prep batches",
    "Red pepper flakes for heat",
    "Additional za'atar for garnish"
  ],
  method: [
    "In a medium bowl, combine Greek yogurt, grated garlic, and lemon juice.",
    "Add MSG, salt, and za'atar. Mix thoroughly to ensure MSG and salt are evenly distributed.",
    "Fold in fresh dill and lemon zest.",
    "Add black pepper to taste.",
    "Gradually add water until desired consistency is reached. For meal prep, keep slightly thicker as it will loosen over time.",
    "Cover and refrigerate for at least 30 minutes before use to allow flavors to develop."
  ],
  mealPrepNotes: [
    "If prepping for the week ahead, double the garlic as the flavor mellows over time",
    "Portion into small 2-oz containers for individual meals",
    "When using frozen meal preps, pack sauce separately",
    "Can be frozen in ice cube trays, but texture is best when fresh",
    "Shake or stir well before each use"
  ],
  proTips: [
    "The MSG and salt quantities may seem high, but they're calibrated for cold foods which need more aggressive seasoning",
    "If sauce thickens in the fridge, adjust with drops of lemon juice rather than water",
    "For meal prep containers, store sauce in the smallest compartment",
    "Works both as a sauce for proteins and a dip for raw vegetables",
    "Can be used as a marinade base for chicken (add olive oil)"
  ],
  nutritionalInfo: {
    calories: "25-30",
    protein: "4g",
    carbs: "2g",
    fat: "0g",
    sodium: "~200mg"
  },
  pairingSuggestions: [
    "Perfect match for meal prep turkey meatballs",
    "Excellent with grilled chicken breast",
    "Works well with roasted vegetables",
    "Can be used as a spread in wraps",
    "Great for dipping raw vegetables"
  ],
  scalingNotes: [
    "Recipe doubles or triples easily",
    "Increase salt and MSG proportionally",
    "Add garlic incrementally to taste",
    "Adjust liquid gradually when scaling up"
  ],
  qualityMarkers: [
    "Sauce should be thick but spoonable",
    "Fresh dill should remain bright green",
    "No liquid separation after mixing",
    "Should taste notably salty/savory when cold",
    "Garlic presence should be noticeable but not sharp"
  ],
  troubleshooting: [
    { issue: "Too thick", solution: "Add lemon juice drops" },
    { issue: "Too thin", solution: "Strain yogurt before starting" },
    { issue: "Too salty", solution: "Add more yogurt and garlic" },
    { issue: "Not enough punch", solution: "Add MSG in ⅛ tsp increments" },
    { issue: "Separating", solution: "Whisk vigorously before serving" }
  ]
}

export default function SaucesPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Sauce Recipes"
          description="Sauce recipes and variations for meal prep"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Base Recipes", href: "/eat/recipes" },
            { title: "Sauces", href: "/eat/recipes/sauces" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Dill & Za&apos;atar Yogurt Sauce</h2>
            <div className="bg-card border rounded-lg p-6">
              <div className="aspect-video relative bg-accent rounded mb-6">
                {/* Image placeholder for recipe photo */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Recipe Photo (Coming Soon)
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-2">{dillYogurtSauce.title}</h3>
              <p className="text-muted-foreground mb-6">{dillYogurtSauce.description}</p>

              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Time & Yield</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Prep: {dillYogurtSauce.prepTime}</li>
                    <li>• Rest: {dillYogurtSauce.restTime}</li>
                    <li>• Makes: {dillYogurtSauce.yield}</li>
                    <li>• Storage: {dillYogurtSauce.storageLife}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Equipment Needed</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {dillYogurtSauce.equipment.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Base Ingredients</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {dillYogurtSauce.baseIngredients.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Optional Additions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {dillYogurtSauce.optionalAdditions.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Method</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    {dillYogurtSauce.method.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Meal Prep Notes</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {dillYogurtSauce.mealPrepNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Pro Tips</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {dillYogurtSauce.proTips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Nutritional Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Per 2 tablespoon serving:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Calories: {dillYogurtSauce.nutritionalInfo.calories}</li>
                        <li>• Protein: {dillYogurtSauce.nutritionalInfo.protein}</li>
                        <li>• Carbs: {dillYogurtSauce.nutritionalInfo.carbs}</li>
                        <li>• Fat: {dillYogurtSauce.nutritionalInfo.fat}</li>
                        <li>• Sodium: {dillYogurtSauce.nutritionalInfo.sodium}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Pairing Suggestions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {dillYogurtSauce.pairingSuggestions.map((suggestion, index) => (
                      <li key={index}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Scaling Notes</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {dillYogurtSauce.scalingNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Quality Markers</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {dillYogurtSauce.qualityMarkers.map((marker, index) => (
                      <li key={index}>• {marker}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Troubleshooting</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    {dillYogurtSauce.troubleshooting.map((item) => (
                      <div key={item.issue}>
                        <p className="text-sm font-medium">{item.issue}</p>
                        <p className="text-sm text-muted-foreground">{item.solution}</p>
                      </div>
                    ))}
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