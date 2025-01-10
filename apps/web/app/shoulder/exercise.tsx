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
    <div className="border rounded-lg p-4 mb-4 bg-card text-card-foreground shadow-sm">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <ChevronDown 
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      
      {isOpen && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">{sets}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm text-muted-foreground">{frequency}</span>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Execution:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {execution.map((step, index) => (
                <li key={index} className="text-sm text-muted-foreground">{step}</li>
              ))}
            </ul>
            {keyPoints && (
              <div className="mt-3 text-sm text-primary font-medium">
                Key point: {keyPoints}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 