'use client'

import { Clock, ShoppingBag, Container, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui'
import { type MealPlan } from '@/lib/repositories/meal-plan/schema'
import { useQueryState } from 'nuqs'

function MealPlanContent({ mealPlan }: { mealPlan: MealPlan }) {
  return (
    <div className="space-y-8">
      {/* Timeline */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary flex-shrink-0" />
          Daily Timeline ({mealPlan.calories} cal)
        </h2>
        {/* Desktop Table */}
        <Card>
          <CardContent className="p-0">
            <div className="hidden sm:block">
              <div className="w-full">
                <table className="w-full border-collapse">
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
                    {mealPlan.timeline.map((meal) => (
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
            <div className="sm:hidden space-y-4 p-4">
              {mealPlan.timeline.map((meal) => (
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
          </CardContent>
        </Card>
      </section>

      {/* Meal Structure */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0" />
          Meal Structure
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(mealPlan.mealStructure).map(([key, meal]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle>{meal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {meal.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Portions */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Container className="h-5 w-5 text-primary flex-shrink-0" />
          Portions Guide
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(mealPlan.portions).map(([key, value]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="capitalize">{key}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Weekly Prep */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary flex-shrink-0" />
          Weekly Prep
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(mealPlan.weeklyPrep).map(([key, items]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="capitalize">{key}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Backup */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
          Emergency Backup
        </h2>
        <Card>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {mealPlan.emergencyBackup.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export function ClientTabs({ mealPlans, defaultPlan }: { mealPlans: MealPlan[], defaultPlan: string }) {
  const [selectedPlan, setSelectedPlan] = useQueryState('plan', {
    defaultValue: defaultPlan,
    parse: (value) => value || defaultPlan,
  })

  return (
    <Tabs value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-8">
      <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent">
        {mealPlans.map((plan) => (
          <TabsTrigger
            key={plan.slug}
            value={plan.slug}
            className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            {plan.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {mealPlans.map((plan) => (
        <TabsContent key={plan.slug} value={plan.slug} className="mt-6">
          <MealPlanContent mealPlan={plan} />
        </TabsContent>
      ))}
    </Tabs>
  )
} 