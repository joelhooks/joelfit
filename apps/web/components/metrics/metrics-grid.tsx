import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import type { Metrics, Targets } from '@/lib/repositories/profile/schema'
import { Activity } from 'lucide-react'

interface MetricsGridProps {
  data: Metrics
  targets: Targets
}

export function MetricsGrid({ data, targets }: MetricsGridProps) {
  return (
    <section>
      <SectionHeader 
        title="Body Composition" 
        icon={Activity} 
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Android Fat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.androidFat}%</div>
            <p className="text-sm text-muted-foreground">Target: {targets.androidFat}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gynoid Fat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.gynoidFat}%</div>
            <p className="text-sm text-muted-foreground">Target: {targets.gynoidFat}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>A/G Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.agRatio}</div>
            <p className="text-sm text-muted-foreground">Target: {targets.agRatio}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visceral Fat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.visceralFat}</div>
            <p className="text-sm text-muted-foreground">Target: {targets.visceralFat}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Body Fat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalBodyFat}%</div>
            <p className="text-sm text-muted-foreground">Target: {targets.totalBodyFat}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>RSMI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.rsmi}</div>
            <p className="text-sm text-muted-foreground">Target: {targets.rsmi}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 