'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface SectionProps {
  title: string
  children: React.ReactNode
}

export function Section({ title, children }: SectionProps) {
  const [isOpen, setIsOpen] = useState(true)
  
  return (
    <div className="mb-6">
      <div 
        className="flex items-center cursor-pointer mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl font-semibold tracking-tight leading-none">{title}</h2>
        <ChevronDown 
          className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {isOpen && children}
    </div>
  )
} 