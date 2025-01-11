import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Clock, ShoppingBag, Container, AlertCircle } from 'lucide-react'
import { MealMixer } from '@/components/meal-mixer'
import { AiDisclaimer } from '@/components/ai-disclaimer'

export const metadata: Metadata = {
  title: 'Meal Plan Details | High-Protein Meal Prep OS',
  description: 'Detailed meal plans and portion guides for the 1-2-3 rotation system',
  openGraph: {
    title: 'Meal Plan Details | High-Protein Meal Prep OS',
    description: 'Detailed meal plans and portion guides for the 1-2-3 rotation system',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Meal Plan Details')}&description=${encodeURIComponent('Detailed meal plans and portion guides for the 1-2-3 rotation system')}`,
      width: 1200,
      height: 630,
      alt: 'Meal Plan Details'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meal Plan Details | High-Protein Meal Prep OS',
    description: 'Detailed meal plans and portion guides for the 1-2-3 rotation system',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Meal Plan Details')}&description=${encodeURIComponent('Detailed meal plans and portion guides for the 1-2-3 rotation system')}`],
  }
}

const mealPlan = {
  joel: {
    calories: 2400,
    timeline: [
      { time: "7:00 AM", slot: "A", meal: "Breakfast", calories: 400, protein: 30, carbs: 45, fat: 15, container: "Mason jar" },
      { time: "11:30 AM", slot: "C", meal: "Lunch", calories: 650, protein: 45, carbs: 75, fat: 20, container: "3-comp glass" },
      { time: "3:00 PM", slot: "D", meal: "Mid-day Meal", calories: 550, protein: 35, carbs: 55, fat: 20, container: "3-comp glass" },
      { time: "7:00 PM", slot: "E", meal: "Dinner", calories: 400, protein: 25, carbs: 35, fat: 13, container: "3-comp glass" },
      { time: "9:00 PM", slot: "F", meal: "Night Snack", calories: 200, protein: 15, carbs: 20, fat: 7, container: "Small glass" }
    ],
    mealStructure: {
      breakfast: {
        title: "A: Breakfast (400 cal)",
        items: [
          "¾ cup oats (150 cal, 27g C)",
          "1 scoop protein powder (120 cal, 24g P)",
          "1 tbsp nut butter (98 cal, 8g F)",
          "½ banana (52 cal, 13g C)"
        ]
      },
      lunch: {
        title: "C: Lunch (650 cal)",
        items: [
          "8oz lean protein (240 cal, 45g P)",
          "2 cups complex carb (240 cal, 60g C)",
          "2 cups vegetables (80 cal, 16g C)",
          "1.5 tbsp healthy fats (180 cal, 18g F)",
          "Sauce (30 cal, 2g F)"
        ]
      },
      midDay: {
        title: "D: Mid-day Meal (550 cal)",
        items: [
          "6oz lean protein (180 cal, 35g P)",
          "1.5 cups complex carb (180 cal, 45g C)",
          "2 cups vegetables (80 cal, 16g C)",
          "1.5 tbsp healthy fats (180 cal, 18g F)",
          "Sauce (20 cal, 2g F)"
        ]
      },
      dinner: {
        title: "E: Dinner (400 cal)",
        items: [
          "4oz lean protein (120 cal, 24g P)",
          "1 cup complex carb (120 cal, 30g C)",
          "2 cups vegetables (80 cal, 15g C)",
          "¾ tbsp healthy fats (90 cal, 10g F)",
          "Sauce (30 cal, 3g F)"
        ]
      },
      nightSnack: {
        title: "F: Night Snack (200 cal)",
        items: [
          "¾ cup Greek yogurt (100 cal, 15g P)",
          "½ cup mixed berries (40 cal, 10g C)",
          "1 tsp honey (20 cal, 5g C)",
          "¼ tbsp nut butter (40 cal, 4g F)"
        ]
      }
    }
  },
  wife: {
    calories: 2100,
    timeline: [
      { time: "7:00 AM", slot: "A", meal: "Breakfast", calories: 350, protein: 24, carbs: 35, fat: 9, container: "Mason jar" },
      { time: "10:00 AM", slot: "S", meal: "Smoothie", calories: 250, protein: 30, carbs: 25, fat: 8, container: "Smoothie cup" },
      { time: "12:00 PM", slot: "M1", meal: "Meal 1", calories: 750, protein: 55, carbs: 83, fat: 20, container: "3-comp glass" },
      { time: "6:00 PM", slot: "M2", meal: "Meal 2", calories: 650, protein: 47, carbs: 71, fat: 17, container: "3-comp glass" },
      { time: "9:00 PM", slot: "F", meal: "Night Snack", calories: 350, protein: 32, carbs: 47, fat: 12, container: "Small glass" }
    ],
    mealStructure: {
      breakfast: {
        title: "A: Breakfast (350 cal)",
        items: [
          "¾ cup oats (150 cal, 27g C)",
          "1 scoop protein powder (120 cal, 24g P)",
          "½ tbsp nut butter (49 cal, 4g F)",
          "½ banana (52 cal, 13g C)"
        ]
      },
      smoothie: {
        title: "S: Smoothie (250 cal)",
        items: [
          "1 scoop protein powder (120 cal, 24g P)",
          "1 cup almond milk (30 cal, 1g P)",
          "1 cup mixed berries (60 cal, 15g C)",
          "½ tbsp MCT oil (60 cal, 7g F)",
          "5g creatine",
          "Ice"
        ]
      },
      meal1: {
        title: "M1: Meal 1 (750 cal)",
        items: [
          "8oz lean protein (240 cal, 45g P)",
          "2 cups complex carb (240 cal, 60g C)",
          "1 cup vegetables (40 cal, 8g C)",
          "1.5 tbsp healthy fats (180 cal, 18g F)",
          "Sauce (30 cal, 2g F)"
        ]
      },
      meal2: {
        title: "M2: Meal 2 (650 cal)",
        items: [
          "6oz lean protein (180 cal, 35g P)",
          "1.5 cups complex carb (180 cal, 45g C)",
          "1 cup vegetables (40 cal, 8g C)",
          "1.25 tbsp healthy fats (150 cal, 15g F)",
          "Sauce (30 cal, 2g F)"
        ]
      },
      nightSnack: {
        title: "F: Night Snack (350 cal)",
        items: [
          "1 cup Greek yogurt (130 cal, 22g P)",
          "¾ cup mixed berries (60 cal, 15g C)",
          "1.5 tsp honey (30 cal, 8g C)",
          "½ tbsp nut butter (80 cal, 8g F)"
        ]
      }
    }
  },
  pantryStaples: {
    oils: [
      "Olive oil (16 oz)",
      "MCT oil (8 oz)",
      "Coconut oil (8 oz)"
    ],
    sauces: [
      "Soy sauce (16 oz)",
      "Rice vinegar (16 oz)",
      "Hot sauce (preferred brand)"
    ],
    seasonings: [
      "MSG (4 oz)",
      "Garlic powder",
      "Black pepper",
      "Kosher salt"
    ],
    spreads: [
      "Almond butter (16 oz)",
      "Honey (8 oz)"
    ]
  },
  emergencyBackup: {
    items: [
      "Protein bars (30g protein, <300 cal)",
      "Frozen turkey meatballs (6 per serving)",
      "Pre-cooked rice cups",
      "Frozen vegetable bags (single serve)",
      "Protein shakes (ready to drink)",
      "Greek yogurt cups (0% fat)",
      "Tuna packets in water"
    ]
  }
}

export default function MealPlanPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Meal Plan Details"
          description="Detailed meal plans and portion guides for the 1-2-3 rotation system"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Meal Plan", href: "/eat/meal-plan" }
          ]}
        />

        <div className="space-y-8">
          {/* Joel's Timeline */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Your Daily Timeline ({mealPlan.joel.calories} cal)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-lg">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left">Time</th>
                    <th className="p-4 text-left">Slot</th>
                    <th className="p-4 text-left">Meal</th>
                    <th className="p-4 text-right">Calories</th>
                    <th className="p-4 text-right">Protein</th>
                    <th className="p-4 text-right">Carbs</th>
                    <th className="p-4 text-right">Fat</th>
                    <th className="p-4 text-left">Container</th>
                  </tr>
                </thead>
                <tbody>
                  {mealPlan.joel.timeline.map((meal) => (
                    <tr key={meal.slot} className="border-b last:border-0">
                      <td className="p-4">{meal.time}</td>
                      <td className="p-4 font-medium">{meal.slot}</td>
                      <td className="p-4">{meal.meal}</td>
                      <td className="p-4 text-right">{meal.calories}</td>
                      <td className="p-4 text-right">{meal.protein}g</td>
                      <td className="p-4 text-right">{meal.carbs}g</td>
                      <td className="p-4 text-right">{meal.fat}g</td>
                      <td className="p-4">{meal.container}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Wife's Timeline */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Wife's Daily Timeline ({mealPlan.wife.calories} cal)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-card rounded-lg">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left">Time</th>
                    <th className="p-4 text-left">Slot</th>
                    <th className="p-4 text-left">Meal</th>
                    <th className="p-4 text-right">Calories</th>
                    <th className="p-4 text-right">Protein</th>
                    <th className="p-4 text-right">Carbs</th>
                    <th className="p-4 text-right">Fat</th>
                    <th className="p-4 text-left">Container</th>
                  </tr>
                </thead>
                <tbody>
                  {mealPlan.wife.timeline.map((meal) => (
                    <tr key={meal.slot} className="border-b last:border-0">
                      <td className="p-4">{meal.time}</td>
                      <td className="p-4 font-medium">{meal.slot}</td>
                      <td className="p-4">{meal.meal}</td>
                      <td className="p-4 text-right">{meal.calories}</td>
                      <td className="p-4 text-right">{meal.protein}g</td>
                      <td className="p-4 text-right">{meal.carbs}g</td>
                      <td className="p-4 text-right">{meal.fat}g</td>
                      <td className="p-4">{meal.container}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Your Meal Structure */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Your Meal Structure</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {Object.values(mealPlan.joel.mealStructure).map((meal) => (
                <div key={meal.title} className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-2">{meal.title}</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {meal.items.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Wife's Meal Structure */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Wife's Meal Structure</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {Object.values(mealPlan.wife.mealStructure).map((meal) => (
                <div key={meal.title} className="bg-card border rounded-lg p-6">
                  <h3 className="font-medium mb-2">{meal.title}</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {meal.items.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Meal Mixer */}
          <section>
            <MealMixer />
          </section>

          {/* Emergency Backup System */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              Emergency Backup System
            </h2>
            <div className="bg-card border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-4">Keep ready (matching macros):</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {mealPlan.emergencyBackup.items.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <AiDisclaimer />
        </div>
      </div>
    </main>
  )
} 