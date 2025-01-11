import type { StrengthArea } from '@/types/metrics'
import { MetricCard } from '@/components/ui/metric-card'
import { SectionHeader } from '@/components/ui/section-header'
import { Dumbbell } from 'lucide-react'

interface StrengthAreasProps {
  data: StrengthArea[]
}

export function StrengthAreas({ data }: StrengthAreasProps) {
  return (
    <div>
      <SectionHeader title="Strength Foundation" icon={Dumbbell} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((area) => (
          <MetricCard
            key={area.title}
            title={area.title}
            value={area.metric}
            subtitle={area.details}
          />
        ))}
      </div>
    </div>
  )
} 