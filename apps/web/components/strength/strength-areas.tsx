import { type StrengthArea } from '@/lib/repositories/profile/schema'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui'
import { SectionHeader } from '@/components/ui/section-header'
import { Dumbbell } from 'lucide-react'

interface StrengthAreasProps {
  data: StrengthArea[]
}

export function StrengthAreas({ data }: StrengthAreasProps) {
  return (
    <section>
      <SectionHeader 
        title="Strength Areas" 
        icon={Dumbbell} 
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((area) => (
          <Card key={area.title}>
            <CardHeader>
              <CardTitle>{area.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{area.metric}</div>
              <p className="text-sm text-muted-foreground">{area.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 