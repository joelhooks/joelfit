'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TimerProps {
  duration: number
  onComplete?: () => void
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
            onComplete?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, onComplete])

  const reset = () => {
    setTimeLeft(duration)
    setIsRunning(false)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="text-lg font-mono w-16 text-center">
        {timeLeft}s
      </div>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={reset}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  )
} 