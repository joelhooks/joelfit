import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vegetable Prep | High-Protein Meal Prep OS',
  description: 'Using frozen vegetables for efficient meal prep',
}

const frozenVegGuide = {
  benefits: [
    "No prep work required - pre-cut and ready to use",
    "Longer shelf life than fresh - less waste",
    "Often more nutritious than 'fresh' vegetables",
    "Consistent quality year-round",
    "Significantly cheaper than fresh",
    "Perfect portion control",
    "No washing or cutting needed"
  ],
  bestTypes: [
    {
      name: "Broccoli Florets",
      notes: "Maintains texture well, versatile for multiple dishes",
      servingSize: "1-1.5 cups per meal",
      cookingMethod: "Microwave 2-3 minutes or steam"
    },
    {
      name: "Green Beans",
      notes: "Holds shape and color, good crunch potential",
      servingSize: "1 cup per meal",
      cookingMethod: "Microwave 2-3 minutes or steam"
    },
    {
      name: "Mixed Bell Peppers",
      notes: "Adds color and sweetness, pre-sliced",
      servingSize: "½-1 cup per meal",
      cookingMethod: "Thaw and use raw or briefly heat"
    },
    {
      name: "Cauliflower Rice",
      notes: "Perfect low-carb base, absorbs flavors well",
      servingSize: "1-1.5 cups per meal",
      cookingMethod: "Microwave 3-4 minutes, drain excess water"
    },
    {
      name: "Mixed Asian Vegetables",
      notes: "Great variety, perfect for stir-fry style meals",
      servingSize: "1-1.5 cups per meal",
      cookingMethod: "Microwave or steam, drain well"
    }
  ],
  mealPrepTips: [
    "Don't thaw before cooking - cook directly from frozen",
    "Slightly undercook for meal prep - will continue cooking when reheated",
    "Drain thoroughly after cooking to prevent watery meals",
    "Season after cooking to prevent excess water release",
    "Store in separate container compartment from proteins",
    "Consider texture when reheating - some veg only needs gentle warming"
  ],
  seasoningApproach: [
    {
      style: "Mediterranean",
      ingredients: "Garlic powder, oregano, lemon zest, black pepper",
      bestFor: "Broccoli, green beans, cauliflower rice"
    },
    {
      style: "Asian",
      ingredients: "Sesame oil, soy sauce, ginger powder, garlic",
      bestFor: "Mixed Asian vegetables, broccoli, bell peppers"
    },
    {
      style: "Simple",
      ingredients: "Salt, pepper, garlic powder, olive oil spray",
      bestFor: "Any vegetable, very versatile"
    },
    {
      style: "Spicy",
      ingredients: "Red pepper flakes, black pepper, garlic, MSG",
      bestFor: "Green beans, broccoli, mixed vegetables"
    }
  ],
  reheatingGuide: [
    "Microwave: 1-2 minutes for most vegetables",
    "Let rest 30 seconds before eating",
    "Add a few drops of water if needed",
    "Stir halfway through reheating",
    "Season again after reheating if needed"
  ],
  qualityTips: [
    "Buy in bulk when on sale",
    "Check for ice crystals - avoid freezer burned packages",
    "Store in chest freezer for longer term storage",
    "Keep bags sealed tightly",
    "Use within 6 months for best quality"
  ],
  portioning: {
    small: {
      amount: "1 cup",
      calories: "~30-50",
      protein: "2-3g",
      carbs: "5-10g",
      fiber: "2-4g"
    },
    medium: {
      amount: "1.5 cups",
      calories: "~45-75",
      protein: "3-4g",
      carbs: "8-15g",
      fiber: "3-6g"
    },
    large: {
      amount: "2 cups",
      calories: "~60-100",
      protein: "4-6g",
      carbs: "10-20g",
      fiber: "4-8g"
    }
  }
}

export default function VegetablesPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Vegetable Prep"
          description="Using frozen vegetables for efficient meal prep"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Base Recipes", href: "/eat/recipes" },
            { title: "Vegetables", href: "/eat/recipes/vegetables" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Why Frozen Vegetables?</h2>
            <div className="bg-card border rounded-lg p-6">
              <ul className="space-y-2">
                {frozenVegGuide.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Best Types for Meal Prep</h2>
            <div className="grid gap-4">
              {frozenVegGuide.bestTypes.map((veg) => (
                <div key={veg.name} className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-2">{veg.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Notes: {veg.notes}</p>
                    <p>• Serving: {veg.servingSize}</p>
                    <p>• Cooking: {veg.cookingMethod}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Meal Prep Tips</h2>
            <div className="bg-card border rounded-lg p-6">
              <ul className="space-y-2 text-muted-foreground">
                {frozenVegGuide.mealPrepTips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Seasoning Approaches</h2>
            <div className="grid gap-4">
              {frozenVegGuide.seasoningApproach.map((style) => (
                <div key={style.style} className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-2">{style.style}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Ingredients: {style.ingredients}</p>
                    <p>• Best for: {style.bestFor}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Reheating Guide</h2>
            <div className="bg-card border rounded-lg p-6">
              <ul className="space-y-2 text-muted-foreground">
                {frozenVegGuide.reheatingGuide.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Quality Tips</h2>
            <div className="bg-card border rounded-lg p-6">
              <ul className="space-y-2 text-muted-foreground">
                {frozenVegGuide.qualityTips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Portion Sizes & Nutrition</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(frozenVegGuide.portioning).map(([size, info]) => (
                <div key={size} className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-2 capitalize">{size}</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Amount: {info.amount}</li>
                    <li>• Calories: {info.calories}</li>
                    <li>• Protein: {info.protein}</li>
                    <li>• Carbs: {info.carbs}</li>
                    <li>• Fiber: {info.fiber}</li>
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 