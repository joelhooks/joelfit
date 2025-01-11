import { Card, CardContent, Avatar } from '@repo/ui'
import { Activity, Scale } from 'lucide-react'
import type { PersonalStats } from '@/types/metrics'

interface ProfileHeaderProps {
  data: PersonalStats
}

export function ProfileHeader({ data }: ProfileHeaderProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Basic Stats */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <div className="flex h-full w-full items-center justify-center bg-muted">
                JH
              </div>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{data.name}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4" />
                <span>{data.activity}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Scale className="h-4 w-4" />
                <span>{data.weight}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience & Training */}
      <Card>
        <CardContent className="pt-6">
          <dl className="grid gap-3">
            <div className="grid grid-cols-2 text-sm">
              <dt className="font-medium">Age:</dt>
              <dd className="text-muted-foreground">{data.age}</dd>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <dt className="font-medium">Height:</dt>
              <dd className="text-muted-foreground">{data.height}</dd>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <dt className="font-medium">Training:</dt>
              <dd className="text-muted-foreground">{data.exercise}</dd>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <dt className="font-medium">Experience:</dt>
              <dd className="text-muted-foreground">
                Lifting: {data.experience.lifting}<br />
                Cardio: {data.experience.cardio}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
} 