import type { Metrics, Targets } from '@/types/metrics'
import { MetricCard } from '@/components/ui/metric-card'
import { SectionHeader } from '@/components/ui/section-header'
import { Activity } from 'lucide-react'

interface MetricsGridProps {
  data: Metrics
  targets: Targets
}

export function MetricsGrid({ data, targets }: MetricsGridProps) {
  // Helper to determine status based on current vs target value
  const getStatus = (current: number, target: number | undefined, isLowerBetter = true) => {
    if (!target) return 'info'
    const diff = isLowerBetter ? current - target : target - current
    const percentDiff = (diff / target) * 100

    if (percentDiff > 20) return 'warning'
    if (percentDiff > 5) return 'caution'
    if (percentDiff < 0) return 'success'
    return 'info'
  }

  return (
    <div>
      <SectionHeader title="Key Metrics" icon={Activity} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="Android Fat"
          value={`${data.androidFat}%`}
          subtitle={`Target: ${targets.androidFat}%`}
          status={getStatus(data.androidFat, targets.androidFat)}
          isKey
        />
        <MetricCard
          title="A/G Ratio"
          value={data.agRatio}
          subtitle={`Target: ${targets.agRatio}`}
          status={getStatus(data.agRatio, targets.agRatio)}
          isKey
        />
        <MetricCard
          title="Visceral Fat"
          value={data.visceralFat}
          subtitle={`Target: ${targets.visceralFat}`}
          status={getStatus(data.visceralFat, targets.visceralFat)}
          isKey
        />
        <MetricCard
          title="Total Body Fat"
          value={`${data.totalBodyFat}%`}
          status={getStatus(data.totalBodyFat, 20)}
        />
        <MetricCard
          title="Gynoid Fat"
          value={`${data.gynoidFat}%`}
          status="info"
        />
        <MetricCard
          title="RSMI"
          value={data.rsmi}
          status={getStatus(data.rsmi, 8, false)} // Higher is better, target minimum of 8
        />
      </div>
    </div>
  )
} 