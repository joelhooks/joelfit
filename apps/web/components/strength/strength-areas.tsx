import { Dumbbell } from 'lucide-react'
import { type StrengthArea } from '@/types/metrics'
import { MetricCard } from '@/components/ui/metric-card'
import { SectionHeader } from '@/components/ui/section-header'

interface StrengthAreasProps {
  data: StrengthArea[]
}

export function StrengthAreas({ data }: StrengthAreasProps) {
  return (
    <section>
      <SectionHeader title="Strength Foundation" icon={Dumbbell} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((area, index) => (
          <MetricCard
            key={area.title}
            title={area.title}
            value={area.metric}
            subtitle={area.details}
          />
        ))}
      </div>
    </section>
  )
} 