'use client'

import { useState } from 'react'
import { ChevronDown, Activity, Clock } from 'lucide-react'
import { SetTracker } from '@/components/exercise/set-tracker'
import { Timer } from '@/components/exercise/timer'
import type { Exercise as ExerciseType } from '@/lib/repositories/exercise/schema'

type ExerciseProps = ExerciseType

export function Exercise({ title, sets, frequency, execution, keyPoints }: ExerciseProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [currentSet, setCurrentSet] = useState(0)
  const [currentRep, setCurrentRep] = useState(0)
  
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

  const showTimer = sets.type === 'standard' ? sets.hold : sets.type === 'duration'
  const timerDuration = sets.type === 'standard' ? sets.hold : sets.type === 'duration' ? sets.duration : undefined
  const maxReps = sets.type === 'standard' ? sets.reps : 1
  
  const handleTimerComplete = () => {
    if (currentRep < maxReps - 1) {
      setCurrentRep(currentRep + 1)
      return true // Return true to auto-reset timer
    } else {
      setCurrentRep(0)
      if (currentSet < sets.count - 1) {
        setCurrentSet(currentSet + 1)
      }
      return false // Don't auto-reset, we're done with the set
    }
  }

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

          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <SetTracker 
                totalSets={sets.count} 
                currentSet={showTimer ? currentSet : undefined} 
              />
              {sets.type === 'standard' && sets.reps > 1 && (
                <div className="text-xs text-muted-foreground">
                  Rep {currentRep + 1} of {sets.reps}
                </div>
              )}
            </div>
            {showTimer && timerDuration && (
              <Timer 
                duration={timerDuration} 
                onComplete={handleTimerComplete}
              />
            )}
          </div>

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