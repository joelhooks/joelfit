'use client'

import React from 'react'
import type { NutritionProfile as NutritionProfileType } from '@/types/metrics'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import { Apple, Calendar, ListChecks } from 'lucide-react'
import { MetricCard } from '@/components/ui/metric-card'

interface NutritionProfileProps {
  data: NutritionProfileType
}

export function NutritionProfile({ data }: NutritionProfileProps) {
  return (
    <div className="space-y-12">
      <section>
        <SectionHeader title="Daily Targets" icon={Apple} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Calories"
            value={data.targets.calories}
            subtitle="kcal/day"
          />
          <MetricCard
            title="Protein"
            value={`${data.targets.protein}g`}
            subtitle="per day"
          />
          <MetricCard
            title="Carbs"
            value={`${data.targets.carbs}g`}
            subtitle="per day"
          />
          <MetricCard
            title="Fat"
            value={`${data.targets.fat}g`}
            subtitle="per day"
          />
        </div>
      </section>

      <section>
        <SectionHeader title="Meal Schedule" icon={Calendar} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.meals.map((meal) => (
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
                {data.weeklyPrep.proteins.map((item) => (
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
                {data.weeklyPrep.carbs.map((item) => (
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
                {data.weeklyPrep.vegetables.map((item) => (
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
                {data.weeklyPrep.sauces.map((item) => (
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