import { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  icon: LucideIcon
}

export function SectionHeader({ title, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="h-5 w-5" />
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  )
} 