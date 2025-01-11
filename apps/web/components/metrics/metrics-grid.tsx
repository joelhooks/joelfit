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
    if (!target) return 'default'
    const diff = isLowerBetter ? current - target : target - current
    if (diff > target * 0.1) return 'warning'
    if (diff < 0) return 'success'
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
          status={getStatus(data.totalBodyFat, 20)} // Assuming 20% is a good target
        />
        <MetricCard
          title="Gynoid Fat"
          value={`${data.gynoidFat}%`}
          status="info"
        />
        <MetricCard
          title="RSMI"
          value={data.rsmi}
          status="success" // High RSMI is good
        />
      </div>
    </div>
  )
} 