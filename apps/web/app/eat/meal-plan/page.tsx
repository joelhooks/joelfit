import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Clock, ShoppingBag, Container, AlertCircle } from 'lucide-react'
import { MealMixer } from '@/components/meal-mixer'
import { mealPlan as joelMealPlan } from '@/config/joel'

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

const wifeMealPlan = {
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
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              Your Daily Timeline ({joelMealPlan.calories} cal)
            </h2>
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <div className="w-full">
                <table className="w-full border-collapse bg-card rounded-lg">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">Time</th>
                      <th className="p-4 text-left">Slot</th>
                      <th className="p-4 text-left">Meal</th>
                      <th className="p-4 text-right">Cal</th>
                      <th className="p-4 text-right">P</th>
                      <th className="p-4 text-right">C</th>
                      <th className="p-4 text-right">F</th>
                      <th className="p-4 text-left">Container</th>
                    </tr>
                  </thead>
                  <tbody>
                    {joelMealPlan.timeline.map((meal) => (
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
            </div>
            {/* Mobile Cards */}
            <div className="sm:hidden space-y-4">
              {joelMealPlan.timeline.map((meal) => (
                <div key={meal.slot} className="bg-card border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary font-medium px-2 py-1 rounded">
                        {meal.slot}
                      </div>
                      <span className="text-muted-foreground text-sm">{meal.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Container className="h-4 w-4" />
                      <span>{meal.container}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-lg font-medium">{meal.meal}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="bg-muted/50 rounded p-2">
                      <div className="text-muted-foreground mb-1">Cal</div>
                      <div className="font-medium">{meal.calories}</div>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <div className="text-muted-foreground mb-1">P</div>
                      <div className="font-medium">{meal.protein}g</div>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <div className="text-muted-foreground mb-1">C</div>
                      <div className="font-medium">{meal.carbs}g</div>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <div className="text-muted-foreground mb-1">F</div>
                      <div className="font-medium">{meal.fat}g</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Wife's Timeline */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              Wife's Daily Timeline ({wifeMealPlan.calories} cal)
            </h2>
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <div className="w-full">
                <table className="w-full border-collapse bg-card rounded-lg">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">Time</th>
                      <th className="p-4 text-left">Slot</th>
                      <th className="p-4 text-left">Meal</th>
                      <th className="p-4 text-right">Cal</th>
                      <th className="p-4 text-right">P</th>
                      <th className="p-4 text-right">C</th>
                      <th className="p-4 text-right">F</th>
                      <th className="p-4 text-left">Container</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wifeMealPlan.timeline.map((meal) => (
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
            </div>
            {/* Mobile Cards */}
            <div className="sm:hidden space-y-4">
              {wifeMealPlan.timeline.map((meal) => (
                <div key={meal.slot} className="bg-card border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 text-primary font-medium px-2 py-1 rounded">
                        {meal.slot}
                      </div>
                      <span className="text-muted-foreground text-sm">{meal.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Container className="h-4 w-4" />
                      <span>{meal.container}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-lg font-medium">{meal.meal}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="bg-muted/50 rounded p-2">
                      <div className="text-muted-foreground mb-1">Cal</div>
                      <div className="font-medium">{meal.calories}</div>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <div className="text-muted-foreground mb-1">P</div>
                      <div className="font-medium">{meal.protein}g</div>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <div className="text-muted-foreground mb-1">C</div>
                      <div className="font-medium">{meal.carbs}g</div>
                    </div>
                    <div className="bg-muted/50 rounded p-2">
                      <div className="text-muted-foreground mb-1">F</div>
                      <div className="font-medium">{meal.fat}g</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Meal Mixer */}
          <section>
            <div className="bg-card border rounded-lg p-4">
              <MealMixer />
            </div>
          </section>

          {/* Meal Structure */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0" />
              Meal Structure
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.values(joelMealPlan.mealStructure).map((meal) => (
                <div key={meal.title} className="bg-card border rounded-lg p-4">
                  <h3 className="font-medium mb-3">{meal.title}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {meal.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Emergency Backup */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
              Emergency Backup
            </h2>
            <div className="bg-card border rounded-lg p-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {joelMealPlan.emergencyBackup.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 