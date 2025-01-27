'use client'

import { useState } from 'react'
import { ChevronDown, Activity, Clock, CheckCircle2, RotateCcw } from 'lucide-react'
import { SetTracker } from '@/components/exercise/set-tracker'
import { Timer } from '@/components/exercise/timer'
import { Button } from '@/components/ui/button'
import type { Exercise as ExerciseType } from '@/lib/repositories/exercise/schema'

type ExerciseProps = ExerciseType

export function Exercise({ title, sets, frequency, execution, keyPoints }: ExerciseProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [currentSet, setCurrentSet] = useState(0)
  const [currentRep, setCurrentRep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  
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
        return true // Start next set
      } else {
        setIsComplete(true)
        return false // Don't auto-reset, we're done
      }
    }
  }

  const resetExercise = () => {
    setCurrentSet(0)
    setCurrentRep(0)
    setIsComplete(false)
  }

  return (
    <div className="border rounded-lg p-4 bg-card text-card-foreground">
      <button 
        className="flex w-full justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <div className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm">{setsDisplay}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">{frequencyDisplay}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="space-y-2">
              <SetTracker 
                totalSets={sets.count} 
                currentSet={showTimer ? currentSet : undefined} 
              />
              {sets.type === 'standard' && sets.reps > 1 && !isComplete && (
                <div className="text-sm text-muted-foreground">
                  Rep {currentRep + 1} of {sets.reps}
                </div>
              )}
            </div>
            {isComplete ? (
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Exercise Complete!</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetExercise}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Start Again</span>
                </Button>
              </div>
            ) : showTimer && timerDuration ? (
              <Timer 
                duration={timerDuration} 
                onComplete={handleTimerComplete}
              />
            ) : null}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Execution:</h4>
            <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
              {execution.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
            {keyPoints && (
              <p className="text-sm font-medium text-primary pt-2">
                Key point: {keyPoints}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 