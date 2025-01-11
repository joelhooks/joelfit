import type { Metrics, Targets } from '@/types/metrics'

interface MetricsGridProps {
  data: Metrics
  targets: Targets
}

export function MetricsGrid({ data, targets }: MetricsGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Android Fat */}
      <div className="bg-card border rounded-lg p-4">
        <h3 className="text-lg font-semibold">Android Fat</h3>
        <div className="mt-2">
          <div className="text-3xl font-bold">{data.androidFat}%</div>
          <div className="text-sm text-muted-foreground">Target: {targets.androidFat}%</div>
        </div>
      </div>

      {/* A/G Ratio */}
      <div className="bg-card border rounded-lg p-4">
        <h3 className="text-lg font-semibold">A/G Ratio</h3>
        <div className="mt-2">
          <div className="text-3xl font-bold">{data.agRatio}</div>
          <div className="text-sm text-muted-foreground">Target: {targets.agRatio}</div>
        </div>
      </div>

      {/* Visceral Fat */}
      <div className="bg-card border rounded-lg p-4">
        <h3 className="text-lg font-semibold">Visceral Fat</h3>
        <div className="mt-2">
          <div className="text-3xl font-bold">{data.visceralFat}</div>
          <div className="text-sm text-muted-foreground">Target: {targets.visceralFat}</div>
        </div>
      </div>

      {/* Total Body Fat */}
      <div className="bg-card border rounded-lg p-4">
        <h3 className="text-lg font-semibold">Total Body Fat</h3>
        <div className="mt-2">
          <div className="text-3xl font-bold">{data.totalBodyFat}%</div>
        </div>
      </div>

      {/* Gynoid Fat */}
      <div className="bg-card border rounded-lg p-4">
        <h3 className="text-lg font-semibold">Gynoid Fat</h3>
        <div className="mt-2">
          <div className="text-3xl font-bold">{data.gynoidFat}%</div>
        </div>
      </div>

      {/* RSMI */}
      <div className="bg-card border rounded-lg p-4">
        <h3 className="text-lg font-semibold">RSMI</h3>
        <div className="mt-2">
          <div className="text-3xl font-bold">{data.rsmi}</div>
        </div>
      </div>
    </div>
  )
} 