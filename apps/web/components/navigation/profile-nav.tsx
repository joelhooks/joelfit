import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@repo/ui'

export const sections = [
  { id: 'metrics', title: 'Key Metrics' },
  { id: 'strength', title: 'Strength Foundation' },
  { id: 'action-plan', title: 'Action Plan' },
  { id: 'progress-tracking', title: 'Progress Tracking' },
  { id: 'nutrition', title: 'Nutrition Details' }
] as const

export type SectionId = typeof sections[number]['id']

interface ProfileNavProps {
  className?: string
}

export function ProfileNav({ className }: ProfileNavProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('metrics')
  const [sectionProgress, setSectionProgress] = useState<Record<SectionId, number>>({
    metrics: 0,
    strength: 0,
    'action-plan': 0,
    'progress-tracking': 0,
    nutrition: 0
  })

  useEffect(() => {
    const observers = new Map()
    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id as SectionId
          const intersectionRatio = entry.intersectionRatio
          setSectionProgress((prev) => ({
            ...prev,
            [id]: Math.round(intersectionRatio * 100)
          }))

          if (intersectionRatio > 0.5) {
            setActiveSection(id)
          }
        })
      },
      {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100),
        rootMargin: '-20% 0px -70% 0px'
      }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observers.set(id, progressObserver)
        progressObserver.observe(element)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <ScrollArea className={cn('h-[calc(100vh-8rem)]', className)}>
      <nav className="space-y-1 pr-4">
        {sections.map(({ id, title }) => (
          <a
            key={id}
            href={`#${id}`}
            className={cn(
              'group relative flex items-center py-2',
              'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2',
              'before:h-8 before:w-[3px] before:rounded-full before:bg-muted before:content-[""]',
              activeSection === id && 'before:bg-primary'
            )}
          >
            <div className="relative flex w-full items-center justify-between rounded-md pl-3 hover:bg-muted/50">
              <span
                className={cn(
                  'text-sm font-medium',
                  activeSection === id ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {title}
              </span>
              <div className="ml-auto pl-6">
                <div
                  className={cn(
                    'h-1.5 w-12 rounded-full bg-muted',
                    'overflow-hidden transition-all duration-500'
                  )}
                >
                  <div
                    className={cn(
                      'h-full rounded-full bg-primary/50 transition-all duration-500',
                      activeSection === id && 'bg-primary'
                    )}
                    style={{ width: `${sectionProgress[id]}%` }}
                  />
                </div>
              </div>
            </div>
          </a>
        ))}
      </nav>
    </ScrollArea>
  )
} 