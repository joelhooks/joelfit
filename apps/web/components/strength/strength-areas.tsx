import type { StrengthArea } from '@/types/metrics'
import { MetricCard } from '@/components/ui/metric-card'
import { SectionHeader } from '@/components/ui/section-header'
import { Dumbbell } from 'lucide-react'

interface StrengthAreasProps {
  data: StrengthArea[]
}

export function StrengthAreas({ data }: StrengthAreasProps) {
  const getStatus = (area: StrengthArea) => {
    // RSMI status
    if (area.title === 'Muscle Mass') {
      const match = area.metric.match(/\d+\.\d+/)
      const rsmi = match ? parseFloat(match[0]) : 0
      if (rsmi > 10) return 'success'
      if (rsmi > 8) return 'caution'
      return 'warning'
    }
    
    // Bone Density status
    if (area.title === 'Bone Density') {
      const match = area.metric.match(/\d+\.\d+/)
      const zscore = match ? parseFloat(match[0]) : 0
      if (zscore > 2) return 'success'
      if (zscore > 0) return 'info'
      return 'caution'
    }
    
    // Muscle Balance status
    if (area.title === 'Muscle Balance') {
      const match = area.metric.match(/\d+\.?\d*/)
      const diff = match ? parseFloat(match[0]) : 0
      if (diff < 1) return 'success'
      if (diff < 3) return 'caution'
      return 'warning'
    }
    
    return 'info'
  }

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
            status={getStatus(area)}
          />
        ))}
      </div>
    </div>
  )
} 