'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from '@repo/ui'

interface SetTrackerProps {
  totalSets: number
  currentSet?: number // Optional for non-timed exercises
}

export function SetTracker({ totalSets, currentSet }: SetTrackerProps) {
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    Array(totalSets).fill(false)
  )

  // Update completed sets when currentSet changes (for timed exercises)
  useEffect(() => {
    if (typeof currentSet === 'number') {
      setCompletedSets(prev => prev.map((_, i) => i < currentSet))
    }
  }, [currentSet])

  const toggleSet = (index: number) => {
    if (typeof currentSet === 'undefined') { // Only allow manual toggling for non-timed exercises
      setCompletedSets(prev => {
        const next = [...prev]
        next[index] = !next[index]
        return next
      })
    }
  }

  return (
    <div className="flex gap-2 mt-2">
      {completedSets.map((completed, i) => (
        <Checkbox
          key={i}
          checked={completed}
          onCheckedChange={() => toggleSet(i)}
          className="data-[state=checked]:bg-primary"
          aria-label={`Set ${i + 1}`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-2">
        {completedSets.filter(Boolean).length}/{totalSets} sets
      </span>
    </div>
  )
} 