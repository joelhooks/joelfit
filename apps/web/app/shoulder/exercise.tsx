'use client'

import { useState } from 'react'
import { Clock, ChevronDown, Activity } from 'lucide-react'

type ExerciseStep = string

export interface ExerciseProps {
  title: string
  sets: string
  frequency: string
  execution: ExerciseStep[]
  keyPoints?: string
}

export function Exercise({ title, sets, frequency, execution, keyPoints }: ExerciseProps) {
  const [isOpen, setIsOpen] = useState(true)
  
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
              {sets}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              {frequency}
            </div>
          </div>

          <div className="space-y-2">
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