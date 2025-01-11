'use client'

import React, { useState, useEffect } from 'react'
import { Shuffle } from 'lucide-react'

const proteins = {
  chicken: { emoji: '🍗', name: 'Chicken', portion: '8 oz' },
  turkey: { emoji: '🦃', name: 'Turkey', portion: '8 oz' },
  fish: { emoji: '🐟', name: 'Fish', portion: '8 oz' }
} as const

const starches = {
  rice: { emoji: '🍚', name: 'Rice', weight: 2, portion: '2 cups' },
  potato: { emoji: '🥔', name: 'Potato', weight: 2, portion: '2 cups' },
  quinoa: { emoji: '🌱', name: 'Quinoa', weight: 1.5, portion: '1.5 cups' }
} as const

type ProteinType = keyof typeof proteins
type StarchType = keyof typeof starches

type MealCombo = [ProteinType, StarchType]

type YourDayMeals = {
  c: MealCombo
  d: MealCombo
  e: MealCombo
}

type WifeDayMeals = {
  m1: MealCombo
  m2: MealCombo
}

type WeekDays = 'd1' | 'd2' | 'd3' | 'd4' | 'd5'

type YourWeekRotation = Record<WeekDays, YourDayMeals>
type WifeWeekRotation = Record<WeekDays, WifeDayMeals>

type Rotation = {
  you: YourWeekRotation
  wife: WifeWeekRotation
}

const initialRotation: Rotation = {
  you: {
    d1: { c: ['chicken', 'quinoa'], d: ['turkey', 'rice'], e: ['fish', 'potato'] },
    d2: { c: ['chicken', 'potato'], d: ['fish', 'quinoa'], e: ['turkey', 'rice'] },
    d3: { c: ['chicken', 'rice'], d: ['fish', 'potato'], e: ['turkey', 'quinoa'] },
    d4: { c: ['chicken', 'quinoa'], d: ['turkey', 'potato'], e: ['fish', 'rice'] },
    d5: { c: ['chicken', 'rice'], d: ['fish', 'quinoa'], e: ['turkey', 'potato'] }
  },
  wife: {
    d1: { m1: ['chicken', 'potato'], m2: ['fish', 'quinoa'] },
    d2: { m1: ['turkey', 'rice'], m2: ['chicken', 'quinoa'] },
    d3: { m1: ['fish', 'rice'], m2: ['turkey', 'potato'] },
    d4: { m1: ['chicken', 'quinoa'], m2: ['fish', 'potato'] },
    d5: { m1: ['turkey', 'quinoa'], m2: ['chicken', 'rice'] }
  }
} as const

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = newArray[i]
    if (temp !== undefined && newArray[j] !== undefined) {
      newArray[i] = newArray[j]
      newArray[j] = temp
    }
  }
  return newArray
}

function generateWeightedStarches(): StarchType[] {
  const weighted: StarchType[] = []
  Object.entries(starches).forEach(([starch, info]) => {
    for (let i = 0; i < info.weight; i++) {
      weighted.push(starch as StarchType)
    }
  })
  return weighted
}

function generateMealCombos(excludeProtein?: ProteinType): MealCombo[] {
  const combos: MealCombo[] = []
  const weightedStarches = generateWeightedStarches()
  
  // Generate more combinations to ensure we have enough variety
  for (let i = 0; i < 5; i++) {  // Increased from 3 to 5 sets
    Object.keys(proteins).forEach(protein => {
      if (protein !== excludeProtein) {
        weightedStarches.forEach(starch => {
          combos.push([protein as ProteinType, starch])
        })
      }
    })
  }
  
  return shuffleArray(combos)
}

function hasSameDayRepeats(rotation: Rotation): boolean {
  // Check your meals
  for (const day of Object.values(rotation.you)) {
    const proteins = new Set([day.c[0], day.d[0], day.e[0]])
    if (proteins.size < 3) return true // Protein repeat found
    
    const quinoaCount = [day.c[1], day.d[1], day.e[1]].filter(s => s === 'quinoa').length
    if (quinoaCount > 1) return true // Quinoa repeat found
  }
  
  // Check wife's meals
  for (const day of Object.values(rotation.wife)) {
    const proteins = new Set([day.m1[0], day.m2[0]])
    if (proteins.size < 2) return true // Protein repeat found
    
    const quinoaCount = [day.m1[1], day.m2[1]].filter(s => s === 'quinoa').length
    if (quinoaCount > 1) return true // Quinoa repeat found
  }
  
  return false
}

function distributeProteinEvenly(meals: MealCombo[]): MealCombo[] {
  const result: MealCombo[] = []
  const byProtein: Record<ProteinType, MealCombo[]> = {
    chicken: [],
    turkey: [],
    fish: []
  }
  
  // Group meals by protein
  meals.forEach(meal => {
    byProtein[meal[0]].push(meal)
  })
  
  // Shuffle each protein group
  Object.keys(byProtein).forEach(protein => {
    byProtein[protein as ProteinType] = shuffleArray(byProtein[protein as ProteinType])
  })
  
  // Take turns adding from each protein group
  while (result.length < meals.length) {
    const proteins = shuffleArray(Object.keys(byProtein) as ProteinType[])
    proteins.forEach(protein => {
      if (byProtein[protein].length > 0 && result.length < meals.length) {
        result.push(byProtein[protein].pop()!)
      }
    })
  }
  
  return result
}

export function MealMixer() {
  const [rotation, setRotation] = useState<Rotation>(initialRotation)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    shuffleMeals()
  }, []) // Empty deps array means run once on mount

  const getMealCombo = (protein: ProteinType, starch: StarchType) => (
    <span className="inline-flex items-center space-x-1">
      <span title={`${proteins[protein].name} (${proteins[protein].portion})`}>
        {proteins[protein].emoji}
      </span>
      <span title={`${starches[starch].name} (${starches[starch].portion})`}>
        {starches[starch].emoji}
      </span>
    </span>
  )

  const shuffleMeals = () => {
    try {
      setError(null)
      
      let attempts = 0
      const maxAttempts = 100 // Increased from 50 to 100
      
      while (attempts < maxAttempts) {
        // Generate fish meals first to align them
        const baseStarches: StarchType[] = ['rice', 'potato', 'quinoa']
        const fishStarches = shuffleArray([...baseStarches]) as StarchType[]
        
        // Generate remaining meal combos with weighted starches
        const availableCombos = generateMealCombos('fish')
        const shuffledCombos = distributeProteinEvenly(availableCombos)
        
        if (shuffledCombos.length < 17) {
          throw new Error('Insufficient meal combinations generated')
        }
        
        if (fishStarches.length < 3) {
          throw new Error('Insufficient starch options available')
        }
        
        const [starch1, starch2, starch3] = fishStarches
        
        if (!starch1 || !starch2 || !starch3) {
          throw new Error('Invalid starch rotation')
        }
        
        const yourMeals = shuffledCombos.slice(0, 10) as [
          MealCombo, MealCombo, MealCombo, MealCombo, MealCombo,
          MealCombo, MealCombo, MealCombo, MealCombo, MealCombo
        ]
        
        const wifeMeals = shuffledCombos.slice(10, 17) as [
          MealCombo, MealCombo, MealCombo, MealCombo,
          MealCombo, MealCombo, MealCombo
        ]
        
        const newRotation: Rotation = {
          you: {
            d1: { c: yourMeals[0], d: ['fish', starch1], e: yourMeals[1] },
            d2: { c: yourMeals[2], d: yourMeals[3], e: ['fish', starch2] },
            d3: { c: yourMeals[4], d: ['fish', starch3], e: yourMeals[5] },
            d4: { c: yourMeals[6], d: yourMeals[7], e: ['fish', starch1] },
            d5: { c: yourMeals[8], d: ['fish', starch2], e: yourMeals[9] }
          },
          wife: {
            d1: { m1: wifeMeals[0], m2: ['fish', starch1] },
            d2: { m1: wifeMeals[1], m2: wifeMeals[2] },
            d3: { m1: ['fish', starch2], m2: wifeMeals[3] },
            d4: { m1: wifeMeals[4], m2: ['fish', starch3] },
            d5: { m1: wifeMeals[5], m2: wifeMeals[6] }
          }
        }
        
        // Check for same-day repeats
        if (!hasSameDayRepeats(newRotation)) {
          setRotation(newRotation)
          return
        }
        
        attempts++
      }
      
      throw new Error('Could not generate valid meal plan without repeats')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to shuffle meals')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Weekly Rotation</h2>
        <button 
          onClick={shuffleMeals}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border rounded-md hover:bg-muted/50 transition-colors"
        >
          <Shuffle className="h-4 w-4" />
          Shuffle
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* Your Meals */}
        <div>
          <h3 className="font-medium mb-4">Your Meals</h3>
          <div className="grid grid-cols-4 gap-4">
            <div></div>
            <div className="text-center text-sm text-muted-foreground">Lunch (C)</div>
            <div className="text-center text-sm text-muted-foreground">Mid-day (D)</div>
            <div className="text-center text-sm text-muted-foreground">Dinner (E)</div>
            {Object.entries(rotation.you).map(([day, meals]) => (
              <React.Fragment key={day}>
                <div className="text-sm text-muted-foreground">Day {day.slice(-1)}</div>
                <div className="text-center">{getMealCombo(meals.c[0], meals.c[1])}</div>
                <div className="text-center">{getMealCombo(meals.d[0], meals.d[1])}</div>
                <div className="text-center">{getMealCombo(meals.e[0], meals.e[1])}</div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Wife's Meals */}
        <div>
          <h3 className="font-medium mb-4">Wife's Meals</h3>
          <div className="grid grid-cols-3 gap-4">
            <div></div>
            <div className="text-center text-sm text-muted-foreground">Meal 1</div>
            <div className="text-center text-sm text-muted-foreground">Meal 2</div>
            {Object.entries(rotation.wife).map(([day, meals]) => (
              <React.Fragment key={day}>
                <div className="text-sm text-muted-foreground">Day {day.slice(-1)}</div>
                <div className="text-center">{getMealCombo(meals.m1[0], meals.m1[1])}</div>
                <div className="text-center">{getMealCombo(meals.m2[0], meals.m2[1])}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 