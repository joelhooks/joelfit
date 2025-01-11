import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  icon: LucideIcon
}

export function SectionHeader({ title, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-3 border-b pb-4">
      <Icon className="h-6 w-6 flex-shrink-0" />
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    </div>
  )
} 