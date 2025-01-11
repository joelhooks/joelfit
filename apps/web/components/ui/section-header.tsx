import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  icon?: LucideIcon
  className?: string
}

export function SectionHeader({ title, icon: Icon, className }: SectionHeaderProps) {
  return (
    <h2 className={cn("flex items-center gap-2 text-2xl font-semibold tracking-tight mb-6", className)}>
      {Icon && <Icon className="h-6 w-6 text-primary flex-shrink-0" />}
      {title}
    </h2>
  )
} 