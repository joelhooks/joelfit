'use client'

import React from 'react'
import { Profile } from '@/lib/repositories/profile/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import { Apple, Calendar, ListChecks } from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'

interface NutritionProfileProps {
  data: Profile
}

export function NutritionProfile({ data }: NutritionProfileProps) {
  const { nutritionProfile } = data

  return (
    <div className="space-y-12">
      <section className="daily-targets">
        <SectionHeader 
          title="Daily Targets" 
          icon={Apple} 
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="CALORIES"
            value={
              <div className="flex flex-col space-y-2">
                <div className="text-[32px] font-bold tracking-tight">
                  {nutritionProfile.targets.calories}
                </div>
                <div className="text-base text-muted-foreground">
                  Target Range
                </div>
              </div>
            }
            subtitle={
              <div className="text-sm uppercase tracking-wide text-muted-foreground/80">
                Kilocalories Per Day
              </div>
            }
            className="h-[200px]"
          />
          <MetricCard
            title="PROTEIN"
            value={
              <div className="flex flex-col space-y-2">
                <div className="text-[32px] font-bold tracking-tight">
                  {nutritionProfile.targets.protein}
                </div>
                <div className="text-base text-muted-foreground">
                  35-40% of Total Calories
                </div>
              </div>
            }
            subtitle={
              <div className="text-sm uppercase tracking-wide text-muted-foreground/80">
                Grams Per Day
              </div>
            }
            className="h-[200px]"
          />
          <MetricCard
            title="CARBOHYDRATES"
            value={
              <div className="flex flex-col space-y-2">
                <div className="text-[32px] font-bold tracking-tight">
                  {nutritionProfile.targets.carbs}
                </div>
                <div className="text-base text-muted-foreground">
                  40-45% of Total Calories
                </div>
              </div>
            }
            subtitle={
              <div className="text-sm uppercase tracking-wide text-muted-foreground/80">
                Grams Per Day
              </div>
            }
            className="h-[200px]"
          />
          <MetricCard
            title="FATS"
            value={
              <div className="flex flex-col space-y-2">
                <div className="text-[32px] font-bold tracking-tight">
                  {nutritionProfile.targets.fat}
                </div>
                <div className="text-base text-muted-foreground">
                  25-30% of Total Calories
                </div>
              </div>
            }
            subtitle={
              <div className="text-sm uppercase tracking-wide text-muted-foreground/80">
                Grams Per Day
              </div>
            }
            className="h-[200px]"
          />
        </div>
      </section>

      <section>
        <SectionHeader title="Meal Schedule" icon={Calendar} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nutritionProfile.meals.map((meal) => (
            <Card key={meal.name} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {meal.name}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {meal.time}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Calories:</dt>
                    <dd className="text-sm font-medium">{meal.calories} kcal</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Protein:</dt>
                    <dd className="text-sm font-medium">{meal.protein}g</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Carbs:</dt>
                    <dd className="text-sm font-medium">{meal.carbs}g</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-sm text-muted-foreground">Fat:</dt>
                    <dd className="text-sm font-medium">{meal.fat}g</dd>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Container: {meal.container}
                  </div>
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
              <CardTitle className="text-lg font-semibold">Proteins</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm">
                {nutritionProfile.weeklyPrep.proteins.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Carbs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm">
                {nutritionProfile.weeklyPrep.carbs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Vegetables</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm">
                {nutritionProfile.weeklyPrep.vegetables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Sauces</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-sm">
                {nutritionProfile.weeklyPrep.sauces.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 