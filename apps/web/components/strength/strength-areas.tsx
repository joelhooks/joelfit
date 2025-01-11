import type { StrengthArea } from '@/types/metrics'

interface StrengthAreasProps {
  data: StrengthArea[]
}

export function StrengthAreas({ data }: StrengthAreasProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((area) => (
        <div key={area.title} className="bg-card border rounded-lg p-4">
          <h3 className="text-lg font-semibold">{area.title}</h3>
          <div className="mt-2">
            <div className="text-2xl font-bold">{area.metric}</div>
            <p className="mt-2 text-sm text-muted-foreground">{area.details}</p>
          </div>
        </div>
      ))}
    </div>
  )
} 