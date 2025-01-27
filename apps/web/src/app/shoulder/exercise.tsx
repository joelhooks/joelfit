'use client'

import { useState } from 'react'
import { ChevronDown, Activity, Clock } from 'lucide-react'
import { SetTracker } from '@/components/exercise/set-tracker'
import type { Exercise as ExerciseType } from '@/lib/repositories/exercise/schema'

type ExerciseProps = ExerciseType

export function Exercise({ title, sets, frequency, execution, keyPoints }: ExerciseProps) {
  const [isOpen, setIsOpen] = useState(true)
  
  const setsDisplay = (() => {
    if (sets.type === 'standard') {
      return sets.hold 
        ? `${sets.count} × ${sets.hold}s hold`
        : `${sets.count} × ${sets.reps} reps`
    }
    if (sets.type === 'distance') {
      return `${sets.count} × ${sets.distance}`
    }
    if (sets.type === 'duration') {
      return `${sets.count} × ${sets.duration}s`
    }
  })()

  const frequencyDisplay = frequency.period === 'day'
    ? frequency.times === 1 ? 'daily' : `${frequency.times}×/day`
    : frequency.times === 1 ? 'weekly' : `${frequency.times}×/week`
  
  return (
    <div className="border rounded-lg p-3 bg-card text-card-foreground">
      <button 
        className="flex w-full justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-medium">{title}</h3>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="mt-3">
          <div className="flex gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span>{setsDisplay}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{frequencyDisplay}</span>
            </div>
          </div>

          <SetTracker totalSets={sets.count} />

          <div className="space-y-2 mt-4">
            <h4 className="text-xs font-medium text-muted-foreground">Execution:</h4>
            <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground">
              {execution.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
            {keyPoints && (
              <p className="text-xs font-medium text-primary pt-2">
                Key point: {keyPoints}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 