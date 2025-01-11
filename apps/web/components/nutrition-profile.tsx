'use client'

import React from 'react'
import type { NutritionProfile as NutritionProfileType } from '@/types/metrics'
import { Card } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import { Apple } from 'lucide-react'

interface NutritionProfileProps {
  data: NutritionProfileType
}

export function NutritionProfile({ data }: NutritionProfileProps) {
  return (
    <div>
      <SectionHeader title="Nutrition Details" icon={Apple} />
      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-medium">Daily Targets</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <div className="text-sm font-medium">Calories</div>
              <div className="mt-1 text-2xl font-semibold">{data.targets.calories}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm font-medium">Protein</div>
              <div className="mt-1 text-2xl font-semibold">{data.targets.protein}g</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm font-medium">Carbs</div>
              <div className="mt-1 text-2xl font-semibold">{data.targets.carbs}g</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm font-medium">Fat</div>
              <div className="mt-1 text-2xl font-semibold">{data.targets.fat}g</div>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Meal Schedule</h3>
          <div className="space-y-4">
            {data.meals.map((meal) => (
              <Card key={meal.name} className="p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{meal.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{meal.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{meal.calories} cal</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Weekly Prep</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-4">
              <div className="font-medium">Proteins</div>
              <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                {data.weeklyPrep.proteins.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-4">
              <div className="font-medium">Carbs</div>
              <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                {data.weeklyPrep.carbs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-4">
              <div className="font-medium">Vegetables</div>
              <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                {data.weeklyPrep.vegetables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card className="p-4">
              <div className="font-medium">Sauces</div>
              <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                {data.weeklyPrep.sauces.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 