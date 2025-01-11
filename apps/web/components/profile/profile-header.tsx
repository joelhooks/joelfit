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
              <div className="flex h-full w-full items-center justify-center bg-muted text-lg font-semibold">
                JH
              </div>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold tracking-tight">{data.name}</h1>
              <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  <span>{data.activity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  <span>{data.weight}</span>
                </div>
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
              <dt className="text-muted-foreground">Age</dt>
              <dd className="font-medium">{data.age}</dd>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <dt className="text-muted-foreground">Height</dt>
              <dd className="font-medium">{data.height}</dd>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <dt className="text-muted-foreground">Training</dt>
              <dd className="font-medium">{data.exercise}</dd>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <dt className="text-muted-foreground">Experience</dt>
              <dd className="font-medium">
                <span className="text-green-500">Lifting: {data.experience.lifting}</span><br />
                <span className="text-blue-500">Cardio: {data.experience.cardio}</span>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
} 