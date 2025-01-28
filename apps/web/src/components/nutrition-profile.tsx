'use client'

import { Profile } from '@/lib/repositories/profile/schema'
import { Card, CardContent, CardHeader, H3, Text } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import { MetricCard } from '@/components/ui/metric-card'
import { Apple, Calendar, ListChecks } from 'lucide-react'
import { MealPlan } from '@/lib/repositories/meal-plan/schema'

interface NutritionProfileProps {
  data: Profile & { mealPlan?: MealPlan }
}

export function NutritionProfile({ data }: NutritionProfileProps) {
  const { nutritionProfile, mealPlan } = data

  if (!nutritionProfile && !mealPlan) {
    return (
      <div className="p-4 text-center">
        <Text>No nutrition data available</Text>
      </div>
    )
  }

  // Use mealPlan if available, fallback to deprecated nutritionProfile
  const calories = mealPlan?.calories.toString() ?? nutritionProfile?.targets.calories ?? '0'
  const meals = (mealPlan?.timeline ?? (nutritionProfile?.meals ? nutritionProfile.meals.map(m => {
    const [meal = '', slot = ''] = m.name.split(' ')
    return {
      ...m,
      slot: slot.replace(/[()]/g, ''),
      meal
    }
  }) : [])) as Array<{ slot: string; meal: string; time: string; calories: number; protein: number; carbs: number; fat: number; container: string }>
  const weeklyPrep = mealPlan?.weeklyPrep ?? nutritionProfile?.weeklyPrep ?? {
    proteins: [],
    carbs: [],
    vegetables: [],
    sauces: []
  }

  return (
    <div className="space-y-12">
      <section className="nutrition-targets">
        <SectionHeader 
          title="Nutrition Targets" 
          icon={Apple} 
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="CALORIES"
            value={
              <div className="flex flex-col space-y-2">
                <Text className="text-3xl lg:text-4xl font-bold tracking-tight">
                  {calories}
                </Text>
              </div>
            }
            subtitle="Kilocalories Per Day"
            className="h-[180px]"
          />
          <MetricCard
            title="PROTEIN"
            value={
              <div className="flex flex-col space-y-2">
                <Text className="text-3xl lg:text-4xl font-bold tracking-tight">
                  200-220
                </Text>
                <Text variant="meta">
                  35-40%
                </Text>
              </div>
            }
            subtitle="Grams Per Day"
            className="h-[180px]"
          />
          <MetricCard
            title="CARBOHYDRATES"
            value={
              <div className="flex flex-col space-y-2">
                <Text className="text-3xl lg:text-4xl font-bold tracking-tight">
                  225-250
                </Text>
                <Text variant="meta">
                  40-45%
                </Text>
              </div>
            }
            subtitle="Grams Per Day"
            className="h-[180px]"
          />
          <MetricCard
            title="FATS"
            value={
              <div className="flex flex-col space-y-2">
                <Text className="text-3xl lg:text-4xl font-bold tracking-tight">
                  65-75
                </Text>
                <Text variant="meta">
                  25-30%
                </Text>
              </div>
            }
            subtitle="Grams Per Day"
            className="h-[180px]"
          />
        </div>
      </section>

      <section>
        <SectionHeader title="Meal Schedule" icon={Calendar} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {meals?.map((meal) => (
            <Card key={meal.slot} className="h-full">
              <CardHeader>
                <H3>
                  {meal.meal}
                  <Text variant="meta" className="ml-2 font-normal">
                    {meal.time}
                  </Text>
                </H3>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <Text variant="meta">Calories:</Text>
                    <Text className="font-medium">{meal.calories} kcal</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="meta">Protein:</Text>
                    <Text className="font-medium">{meal.protein}g</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="meta">Carbs:</Text>
                    <Text className="font-medium">{meal.carbs}g</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="meta">Fat:</Text>
                    <Text className="font-medium">{meal.fat}g</Text>
                  </div>
                  <Text variant="meta" className="mt-4">
                    Container: {meal.container}
                  </Text>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Weekly Prep" icon={ListChecks} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="h-full">
            <CardHeader>
              <H3>Proteins</H3>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                {weeklyPrep?.proteins.map((item) => (
                  <li key={item}>
                    <Text variant="meta" className="inline">{item}</Text>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <H3>Carbs</H3>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                {weeklyPrep?.carbs.map((item) => (
                  <li key={item}>
                    <Text variant="meta" className="inline">{item}</Text>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <H3>Vegetables</H3>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                {weeklyPrep?.vegetables.map((item) => (
                  <li key={item}>
                    <Text variant="meta" className="inline">{item}</Text>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <H3>Sauces</H3>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                {weeklyPrep?.sauces.map((item) => (
                  <li key={item}>
                    <Text variant="meta" className="inline">{item}</Text>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 