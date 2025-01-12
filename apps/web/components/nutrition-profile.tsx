'use client'

import { Profile } from '@/lib/repositories/profile/schema'
import { Card, CardContent, CardHeader, CardTitle, H3, Text } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import { MetricCard } from '@/components/ui/metric-card'
import { Apple, Calendar, ListChecks } from 'lucide-react'

interface NutritionProfileProps {
  data: Profile
}

export function NutritionProfile({ data }: NutritionProfileProps) {
  const { nutritionProfile } = data

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
                  {nutritionProfile.targets.calories}
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
          {nutritionProfile.meals.map((meal) => (
            <Card key={meal.name} className="h-full">
              <CardHeader>
                <H3>
                  {meal.name}
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
                {nutritionProfile.weeklyPrep.proteins.map((item) => (
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
                {nutritionProfile.weeklyPrep.carbs.map((item) => (
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
                {nutritionProfile.weeklyPrep.vegetables.map((item) => (
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
                {nutritionProfile.weeklyPrep.sauces.map((item) => (
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