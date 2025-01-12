import { type StrengthArea } from '@/lib/repositories/profile/schema'
import { Text } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import { MetricCard } from '@/components/ui/metric-card'
import { Dumbbell } from 'lucide-react'

interface StrengthAreasProps {
  data: StrengthArea[]
}

export function StrengthAreas({ data }: StrengthAreasProps) {
  return (
    <section className="strength-foundation">
      <SectionHeader 
        title="Strength Foundation" 
        icon={Dumbbell} 
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((area) => (
          <MetricCard
            key={area.title}
            title={area.title}
            value={
              <div className="flex flex-col space-y-2">
                <Text className="text-3xl lg:text-4xl font-bold tracking-tight">
                  {area.metric}
                </Text>
              </div>
            }
            subtitle={area.details}
            className="h-[180px]"
          />
        ))}
      </div>
    </section>
  )
} 