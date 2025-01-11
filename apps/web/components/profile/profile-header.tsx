import type { PersonalStats } from '@/types/metrics'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui'
import { Activity } from 'lucide-react'

interface ProfileHeaderProps {
  data: PersonalStats
}

export function ProfileHeader({ data }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src="/joel.jpg" alt={data.name} />
        <AvatarFallback>{data.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>{data.activity}</span>
          </div>
          <div>Weight: {data.weight}lbs</div>
          <div>Age: {data.age}</div>
          <div>Height: {data.height}</div>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          <span>Training {data.exercise} days/week • </span>
          <span>Lifting: {data.experience.lifting} years • Cardio: {data.experience.cardio} years</span>
        </div>
      </div>
    </div>
  )
} 