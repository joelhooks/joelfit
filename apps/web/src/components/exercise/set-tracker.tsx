'use client'

import { useState } from 'react'
import { Checkbox } from '@repo/ui'

interface SetTrackerProps {
  totalSets: number
  currentSet: number
}

export function SetTracker({ totalSets, currentSet }: SetTrackerProps) {
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    Array(totalSets).fill(false)
  )

  const toggleSet = (index: number) => {
    setCompletedSets(prev => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  return (
    <div className="flex gap-1">
      {Array.from({ length: totalSets }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i <= currentSet ? 'bg-primary' : 'bg-muted'
          }`}
        />
      ))}
    </div>
  )
} 