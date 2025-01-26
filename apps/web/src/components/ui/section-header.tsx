import { LucideIcon } from 'lucide-react'
import { H2 } from '@repo/ui'

interface SectionHeaderProps {
  title: string
  icon: LucideIcon
}

export function SectionHeader({ title, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-3 border-b pb-4">
      <Icon className="h-6 w-6 flex-shrink-0" />
      <H2>{title}</H2>
    </div>
  )
} 