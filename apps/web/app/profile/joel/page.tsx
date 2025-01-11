import { ProfileHeader } from '@/components/profile/profile-header'
import { MetricsGrid } from '@/components/metrics/metrics-grid'
import { StrengthAreas } from '@/components/strength/strength-areas'
import { ActionPlan } from '@/components/action/action-plan'
import { NutritionProfile } from '@/components/nutrition-profile'
import { ProfileRepository } from '@/lib/repositories/profile'

export default async function JoelProfilePage() {
  const repo = new ProfileRepository()
  const profile = await repo.findBySlug('joel-hooks')

  return (
    <div className="container relative">
      <div className="space-y-8 py-8">
        <ProfileHeader data={profile} />
        <MetricsGrid data={profile.metrics} targets={profile.targets} />
        <StrengthAreas data={profile.strengthAreas} />
        <ActionPlan data={profile.actionPlan} />
        <NutritionProfile data={profile} />
      </div>
    </div>
  )
} 