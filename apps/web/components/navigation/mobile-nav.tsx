import { Button } from '@repo/ui'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@repo/ui'
import { sections, type SectionId } from './profile-nav'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

export function MobileNav() {
  const [activeSection, setActiveSection] = useState<SectionId>('metrics')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-72 rounded-t-xl px-2">
          <nav className="mt-2 space-y-1">
            {sections.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium',
                  activeSection === id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                {title}
                {activeSection === id && (
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
                )}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
} 