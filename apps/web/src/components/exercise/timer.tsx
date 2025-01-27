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
              setTimeLeft(duration)
              setIsRunning(true)
            }
            return shouldReset ? duration : 0
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
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="text-2xl font-mono w-full text-center sm:w-20">
        {timeLeft}s
      </div>
      <div className="flex gap-2 justify-center">
        <Button
          size="lg"
          variant="outline"
          onClick={() => setIsRunning(!isRunning)}
          className="h-12 w-12"
        >
          {isRunning ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={reset}
          className="h-12 w-12"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
} 