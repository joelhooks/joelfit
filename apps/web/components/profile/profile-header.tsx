import { Profile } from '@/lib/repositories/profile/schema'
import { Avatar, AvatarFallback, AvatarImage, H1, Text } from '@repo/ui'
import { Activity } from 'lucide-react'

interface ProfileHeaderProps {
  data: Profile
}

export function ProfileHeader({ data }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src="/joel.jpg" alt={data.name} />
        <AvatarFallback>{data.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <H1>{data.name}</H1>
        <div className="mt-1 flex items-center gap-4">
          <Text variant="meta" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span>{data.metrics.activity}</span>
          </Text>
          <Text variant="meta">Weight: {data.metrics.weight}lbs</Text>
          <Text variant="meta">Age: {data.metrics.age}</Text>
          <Text variant="meta">Height: {data.metrics.height}</Text>
        </div>
        <div className="mt-2">
          <Text variant="meta">
            Training {data.metrics.exercise} days/week • Lifting: {data.metrics.experience.lifting} • Cardio: {data.metrics.experience.cardio}
          </Text>
        </div>
      </div>
    </div>
  )
} 