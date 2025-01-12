'use client'

import { useState } from 'react'
import { Checkbox } from '@repo/ui'

interface SetTrackerProps {
  totalSets: number
}

export function SetTracker({ totalSets }: SetTrackerProps) {
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