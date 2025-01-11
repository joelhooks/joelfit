'use client'

import React from 'react'
import { Activity, Scale, Clock, ChefHat, Container } from 'lucide-react'

const userProfile = {
  personal: {
    name: 'Joel Hooks',
    age: 50,
    height: '6\'3" (75 inches)',
    weight: '251 lbs',
    activity: 'Moderately Active',
    exercise: '4-6 sessions per week',
    experience: {
      lifting: 'Advanced',
      cardio: 'Intermediate'
    }
  },
  targets: {
    calories: '2250-2500',
    protein: '200-220g (35-40%)',
    carbs: '225-250g (40-45%)',
    fat: '65-75g (25-30%)'
  },
  meals: [
    {
      name: 'Breakfast (A)',
      time: '7:00 AM',
      calories: 400,
      protein: 30,
      carbs: 45,
      fat: 15,
      container: '16oz mason jar'
    },
    {
      name: 'Lunch (C)',
      time: '11:30 AM',
      calories: 650,
      protein: 45,
      carbs: 75,
      fat: 20,
      container: '34oz 3-compartment'
    },
    {
      name: 'Mid-day Meal (D)',
      time: '3:00 PM',
      calories: 550,
      protein: 35,
      carbs: 55,
      fat: 20,
      container: '34oz 3-compartment'
    },
    {
      name: 'Dinner (E)',
      time: '7:00 PM',
      calories: 400,
      protein: 25,
      carbs: 35,
      fat: 13,
      container: '34oz 3-compartment'
    },
    {
      name: 'Night Snack (F)',
      time: '9:00 PM',
      calories: 200,
      protein: 15,
      carbs: 20,
      fat: 7,
      container: '8oz container'
    }
  ],
  portions: {
    protein: '6-8 oz per main meal',
    carbs: '1.5-2 cups per main meal',
    vegetables: '2 cups per main meal',
    fats: '1-1.5 tbsp per main meal'
  },
  weeklyPrep: {
    proteins: [
      '1.5 lbs chicken',
      '1.25 lbs turkey',
      '1.4 lbs fish'
    ],
    carbs: [
      '2.5 cups dry rice',
      '1.25 lbs potatoes',
      '1.25 cups dry quinoa'
    ],
    vegetables: '12-13 cups total',
    sauces: '1x base recipes'
  }
}

export function NutritionProfile() {
  return (
    <div className="space-y-8">
      {/* Personal Stats & Daily Targets */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Personal Stats */}
        <div className="bg-card border rounded-lg p-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Activity className="h-5 w-5 text-primary flex-shrink-0" />
            Personal Stats
          </h3>
          <dl className="grid gap-3">
            {Object.entries(userProfile.personal).map(([key, value]) => {
              if (typeof value === 'object') return null
              return (
                <div key={key} className="grid grid-cols-2 text-sm">
                  <dt className="font-medium capitalize">{key}:</dt>
                  <dd className="text-muted-foreground">{value}</dd>
                </div>
              )
            })}
            <div className="grid grid-cols-2 text-sm">
              <dt className="font-medium">Experience:</dt>
              <dd className="text-muted-foreground">
                Lifting: {userProfile.personal.experience.lifting}<br />
                Cardio: {userProfile.personal.experience.cardio}
              </dd>
            </div>
          </dl>
        </div>

        {/* Daily Targets */}
        <div className="bg-card border rounded-lg p-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Scale className="h-5 w-5 text-primary flex-shrink-0" />
            Daily Targets
          </h3>
          <dl className="grid gap-3">
            {Object.entries(userProfile.targets).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 text-sm">
                <dt className="font-medium capitalize">{key}:</dt>
                <dd className="text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Meal Schedule */}
      <section>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary flex-shrink-0" />
          Daily Meal Schedule
        </h3>
        <div className="grid gap-4">
          {userProfile.meals.map((meal) => (
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
              {Object.entries(userProfile.portions).map(([key, value]) => (
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
              {Object.entries(userProfile.weeklyPrep).map(([key, value]) => (
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