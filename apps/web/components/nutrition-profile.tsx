'use client'

import React from 'react'
import { Scale, Clock, ChefHat, Container } from 'lucide-react'
import type { NutritionProfile as NutritionProfileType } from '../types/metrics'

interface NutritionProfileProps {
  data: NutritionProfileType
}

export function NutritionProfile({ data }: NutritionProfileProps) {
  return (
    <div className="space-y-8">
      {/* Daily Targets */}
      <div className="bg-card border rounded-lg p-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Scale className="h-5 w-5 text-primary flex-shrink-0" />
          Daily Targets
        </h3>
        <dl className="grid gap-3">
          {Object.entries(data.targets).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 text-sm">
              <dt className="font-medium capitalize">{key}:</dt>
              <dd className="text-muted-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Meal Schedule */}
      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary flex-shrink-0" />
          Daily Meal Schedule
        </h3>
        <div className="grid gap-4">
          {data.meals.map((meal) => (
            <div key={meal.name} className="bg-card border rounded-lg p-4">
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
          ))}
        </div>
      </section>

      {/* Weekly Prep */}
      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-primary flex-shrink-0" />
          Weekly Prep Quantities
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-card border rounded-lg p-4">
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
          <div className="bg-card border rounded-lg p-4">
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
        </div>
      </section>
    </div>
  )
} 