import { Activity } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'
import { MetricCard } from '@/components/ui/metric-card'
import type { Metrics, Targets } from '@/types/metrics'

interface MetricsGridProps {
  data: Metrics
  targets: Targets
}

function getStatus(current: number, target?: number) {
  if (!target) return 'info'
  const diff = ((current - target) / target) * 100
  if (Math.abs(diff) <= 5) return 'success'
  if (Math.abs(diff) <= 10) return 'caution'
  return 'warning'
}

function formatTarget(value?: number) {
  if (!value) return null
  return `Target: ${value}${value > 1 ? '%' : ''}`
}

export function MetricsGrid({ data, targets }: MetricsGridProps) {
  return (
    <section className="key-metrics">
      <SectionHeader 
        title="Key Metrics" 
        icon={Activity}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Body Fat Distribution */}
        <MetricCard
          title="Android Fat"
          value={
            <div className="flex flex-col space-y-2">
              <div className="text-[32px] font-bold tracking-tight">
                {data.androidFat}%
              </div>
              <div className="text-base text-muted-foreground">
                Upper Body Fat
              </div>
            </div>
          }
          subtitle={formatTarget(targets.androidFat)}
          status={getStatus(data.androidFat, targets.androidFat)}
          className="h-[180px]"
        />
        <MetricCard
          title="Gynoid Fat"
          value={
            <div className="flex flex-col space-y-2">
              <div className="text-[32px] font-bold tracking-tight">
                {data.gynoidFat}%
              </div>
              <div className="text-base text-muted-foreground">
                Lower Body Fat
              </div>
            </div>
          }
          subtitle={formatTarget(targets.gynoidFat)}
          status={getStatus(data.gynoidFat, targets.gynoidFat)}
          className="h-[180px]"
        />
        <MetricCard
          title="A/G Ratio"
          value={
            <div className="flex flex-col space-y-2">
              <div className="text-[32px] font-bold tracking-tight">
                {data.agRatio}
              </div>
              <div className="text-base text-muted-foreground">
                Fat Distribution Balance
              </div>
            </div>
          }
          subtitle={formatTarget(targets.agRatio)}
          status={getStatus(data.agRatio, targets.agRatio)}
          className="h-[180px]"
        />

        {/* Overall Body Composition */}
        <MetricCard
          title="Total Body Fat"
          value={
            <div className="flex flex-col space-y-2">
              <div className="text-[32px] font-bold tracking-tight">
                {data.totalBodyFat}%
              </div>
              <div className="text-base text-muted-foreground">
                Overall Body Fat
              </div>
            </div>
          }
          subtitle={formatTarget(targets.totalBodyFat)}
          status={getStatus(data.totalBodyFat, targets.totalBodyFat)}
          className="h-[180px]"
        />
        <MetricCard
          title="Visceral Fat"
          value={
            <div className="flex flex-col space-y-2">
              <div className="text-[32px] font-bold tracking-tight">
                {data.visceralFat}
              </div>
              <div className="text-base text-muted-foreground">
                Internal Fat Level
              </div>
            </div>
          }
          subtitle={formatTarget(targets.visceralFat)}
          status={getStatus(data.visceralFat, targets.visceralFat)}
          className="h-[180px]"
        />
        <MetricCard
          title="RSMI"
          value={
            <div className="flex flex-col space-y-2">
              <div className="text-[32px] font-bold tracking-tight">
                {data.rsmi}
              </div>
              <div className="text-base text-muted-foreground">
                Relative Skeletal Muscle
              </div>
            </div>
          }
          subtitle={formatTarget(targets.rsmi)}
          status={getStatus(data.rsmi, targets.rsmi)}
          className="h-[180px]"
        />
      </div>
    </section>
  )
} 