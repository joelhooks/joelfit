'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TimerProps {
  duration: number
  onComplete?: () => boolean // Return true to auto-reset
}

export function Timer({ duration, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            const shouldReset = onComplete?.() ?? false
            if (shouldReset) {
              setIsRunning(true)
            }
            setTimeLeft(duration) // Always reset to original duration
            return duration
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, onComplete, duration])

  const reset = () => {
    setTimeLeft(duration)
    setIsRunning(false)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="text-3xl font-mono w-full text-center sm:w-24">
        {timeLeft}s
      </div>
      <div className="flex gap-2 justify-center">
        <Button
          size="lg"
          variant="outline"
          onClick={() => setIsRunning(!isRunning)}
          className="h-12 px-4 flex items-center gap-2"
        >
          {isRunning ? (
            <>
              <Pause className="h-5 w-5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              <span>Start</span>
            </>
          )}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={reset}
          className="h-12 px-4 flex items-center gap-2"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Reset</span>
        </Button>
      </div>
    </div>
  )
} 