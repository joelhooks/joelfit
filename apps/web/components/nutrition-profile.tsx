'use client'

import React from 'react'
import { Scale, Clock, ChefHat, Container } from 'lucide-react'
import type { NutritionProfile as NutritionProfileType } from '../types/metrics'
import { Card } from '@repo/ui'
import { SectionHeader } from './ui/section-header'
import { cn } from '@/lib/utils'

interface NutritionProfileProps {
  data: NutritionProfileType
}

export function NutritionProfile({ data }: NutritionProfileProps) {
  return (
    <div className="space-y-8">
      {/* Daily Targets */}
      <div>
        <SectionHeader title="Daily Targets" icon={Scale} />
        <Card className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-green-500">
          <div className="p-4">
            <dl className="grid gap-3">
              {Object.entries(data.targets).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 text-sm">
                  <dt className="font-medium capitalize">{key}:</dt>
                  <dd className="text-muted-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Card>
      </div>

      {/* Meal Schedule */}
      <div>
        <SectionHeader title="Daily Meal Schedule" icon={Clock} />
        <div className="grid gap-4">
          {data.meals.map((meal, index) => (
            <Card key={meal.name} className={cn(
              "relative overflow-hidden",
              "before:absolute before:left-0 before:top-0 before:h-full before:w-1",
              index % 3 === 0 && "before:bg-green-500",
              index % 3 === 1 && "before:bg-blue-500",
              index % 3 === 2 && "before:bg-purple-500"
            )}>
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <h4 className="font-medium">{meal.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>{meal.time}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="bg-muted/50 rounded p-2">
                    <dt className="text-muted-foreground mb-1">Calories</dt>
                    <dd className="font-medium">{meal.calories}</dd>
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <dt className="text-muted-foreground mb-1">Protein</dt>
                    <dd className="font-medium">{meal.protein}g</dd>
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <dt className="text-muted-foreground mb-1">Carbs</dt>
                    <dd className="font-medium">{meal.carbs}g</dd>
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <dt className="text-muted-foreground mb-1">Fat</dt>
                    <dd className="font-medium">{meal.fat}g</dd>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Container className="h-4 w-4 flex-shrink-0" />
                  <span>{meal.container}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Weekly Prep */}
      <div>
        <SectionHeader title="Weekly Prep Quantities" icon={ChefHat} />
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-blue-500">
            <div className="p-4">
              <h4 className="font-medium mb-3">Portions per Meal</h4>
              <dl className="grid gap-2 text-sm">
                {Object.entries(data.portions).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2">
                    <dt className="font-medium capitalize">{key}:</dt>
                    <dd className="text-muted-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Card>
          <Card className="relative overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-purple-500">
            <div className="p-4">
              <h4 className="font-medium mb-3">Weekly Quantities</h4>
              <dl className="grid gap-2 text-sm">
                {Object.entries(data.weeklyPrep).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2">
                    <dt className="font-medium capitalize">{key}:</dt>
                    <dd className="text-muted-foreground">
                      {Array.isArray(value) ? value.join(', ') : value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 