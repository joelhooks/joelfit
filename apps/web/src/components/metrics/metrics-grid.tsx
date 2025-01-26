import { SectionHeader } from '@/components/ui/section-header'
import { MetricCard } from '@/components/ui/metric-card'
import type { Metrics, Targets } from '@/lib/repositories/profile/schema'
import { Activity } from 'lucide-react'
import { Text } from '@repo/ui'

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
              <Text as="div" weight="bold" className="text-3xl lg:text-4xl tracking-tight">
                {data.androidFat}%
              </Text>
              <Text variant="meta">
                Upper Body Fat
              </Text>
            </div>
          }
          subtitle={`Target: ${targets.androidFat}%`}
          status={getStatus(data.androidFat, targets.androidFat)}
          className="h-[180px]"
        />
        <MetricCard
          title="Gynoid Fat"
          value={
            <div className="flex flex-col space-y-2">
              <Text as="div" weight="bold" className="text-3xl lg:text-4xl tracking-tight">
                {data.gynoidFat}%
              </Text>
              <Text variant="meta">
                Lower Body Fat
              </Text>
            </div>
          }
          subtitle={`Target: ${targets.gynoidFat}%`}
          status={getStatus(data.gynoidFat, targets.gynoidFat)}
          className="h-[180px]"
        />
        <MetricCard
          title="A/G Ratio"
          value={
            <div className="flex flex-col space-y-2">
              <Text as="div" weight="bold" className="text-3xl lg:text-4xl tracking-tight">
                {data.agRatio}
              </Text>
              <Text variant="meta">
                Fat Distribution Balance
              </Text>
            </div>
          }
          subtitle={`Target: ${targets.agRatio}`}
          status={getStatus(data.agRatio, targets.agRatio)}
          className="h-[180px]"
        />

        {/* Overall Body Composition */}
        <MetricCard
          title="Total Body Fat"
          value={
            <div className="flex flex-col space-y-2">
              <Text as="div" weight="bold" className="text-3xl lg:text-4xl tracking-tight">
                {data.totalBodyFat}%
              </Text>
              <Text variant="meta">
                Overall Body Fat
              </Text>
            </div>
          }
          subtitle={`Target: ${targets.totalBodyFat}%`}
          status={getStatus(data.totalBodyFat, targets.totalBodyFat)}
          className="h-[180px]"
        />
        <MetricCard
          title="Visceral Fat"
          value={
            <div className="flex flex-col space-y-2">
              <Text as="div" weight="bold" className="text-3xl lg:text-4xl tracking-tight">
                {data.visceralFat}
              </Text>
              <Text variant="meta">
                Internal Fat Level
              </Text>
            </div>
          }
          subtitle={`Target: ${targets.visceralFat}`}
          status={getStatus(data.visceralFat, targets.visceralFat)}
          className="h-[180px]"
        />
        <MetricCard
          title="RSMI"
          value={
            <div className="flex flex-col space-y-2">
              <Text as="div" weight="bold" className="text-3xl lg:text-4xl tracking-tight">
                {data.rsmi}
              </Text>
              <Text variant="meta">
                Relative Skeletal Muscle
              </Text>
            </div>
          }
          subtitle={`Target: ${targets.rsmi}`}
          status={getStatus(data.rsmi, targets.rsmi)}
          className="h-[180px]"
        />
      </div>
    </section>
  )
} 