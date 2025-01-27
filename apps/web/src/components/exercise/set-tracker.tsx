'use client'

import { useState, useEffect } from 'react'
import { Checkbox } from '@repo/ui'

interface SetTrackerProps {
  totalSets: number
  currentSet?: number // Optional for non-timed exercises
  onComplete?: () => void // Callback when all sets are complete
}

export function SetTracker({ totalSets, currentSet, onComplete }: SetTrackerProps) {
  const [completedSets, setCompletedSets] = useState<boolean[]>(
    Array(totalSets).fill(false)
  )

  // Update completed sets when currentSet changes (for timed exercises)
  useEffect(() => {
    if (typeof currentSet === 'number') {
      setCompletedSets(prev => prev.map((_, i) => i < currentSet))
    }
  }, [currentSet])

  // Check for completion
  useEffect(() => {
    if (completedSets.every(Boolean) && onComplete) {
      onComplete()
    }
  }, [completedSets, onComplete])

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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {completedSets.map((completed, i) => (
          <Checkbox
            key={i}
            checked={completed}
            onCheckedChange={() => toggleSet(i)}
            className="h-6 w-6 data-[state=checked]:bg-primary"
            aria-label={`Set ${i + 1}`}
          />
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        {completedSets.filter(Boolean).length}/{totalSets} sets
      </div>
    </div>
  )
} 