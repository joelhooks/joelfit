import { type Metrics, type Targets } from '../../types/metrics'
import { MetricCard } from './metric-card'
import { currentMetrics, targets } from '@/config/joel'

const metricConfig = {
  androidFat: {
    title: 'Android Fat',
    unit: '%'
  },
  gynoidFat: {
    title: 'Gynoid Fat',
    unit: '%'
  },
  agRatio: {
    title: 'A/G Ratio',
    unit: ''
  },
  visceralFat: {
    title: 'Visceral Fat',
    unit: ' lbs'
  },
  totalBodyFat: {
    title: 'Total Body Fat',
    unit: '%'
  },
  rsmi: {
    title: 'RSMI',
    unit: ''
  }
} as const

export function MetricsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {(Object.keys(currentMetrics) as Array<keyof Metrics>).map((key) => {
        const config = metricConfig[key]
        const targetValue = key in targets ? targets[key as keyof Targets] : undefined

        return (
          <MetricCard
            key={key}
            title={config.title}
            metricKey={key}
            currentValue={currentMetrics[key]}
            targetValue={targetValue}
            unit={config.unit}
          />
        )
      })}
    </div>
  )
} 