import type { Metrics, Targets } from '@/types/metrics'
import { MetricCard } from '@/components/ui/metric-card'
import { SectionHeader } from '@/components/ui/section-header'
import { Activity } from 'lucide-react'

interface MetricsGridProps {
  data: Metrics
  targets: Targets
}

export function MetricsGrid({ data, targets }: MetricsGridProps) {
  return (
    <div>
      <SectionHeader title="Key Metrics" icon={Activity} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Android Fat"
          value={`${data.androidFat}%`}
          subtitle={`Target: ${targets.androidFat}%`}
          isKey
        />
        <MetricCard
          title="A/G Ratio"
          value={data.agRatio}
          subtitle={`Target: ${targets.agRatio}`}
          isKey
        />
        <MetricCard
          title="Visceral Fat"
          value={data.visceralFat}
          subtitle={`Target: ${targets.visceralFat}`}
          isKey
        />
        <MetricCard
          title="Total Body Fat"
          value={`${data.totalBodyFat}%`}
        />
        <MetricCard
          title="Gynoid Fat"
          value={`${data.gynoidFat}%`}
        />
        <MetricCard
          title="RSMI"
          value={data.rsmi}
        />
      </div>
    </div>
  )
} 