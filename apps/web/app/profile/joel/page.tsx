'use client'

import { ProfileHeader } from '@/components/profile/profile-header'
import { MetricsGrid } from '@/components/metrics/metrics-grid'
import { StrengthAreas } from '@/components/strength/strength-areas'
import { ActionPlan } from '@/components/action/action-plan'
import { NutritionProfile } from '@/components/nutrition-profile'
import { personalStats, currentMetrics, targets, strengthAreas, actionPlan, nutritionProfile } from '@/config/joel'

export default function JoelProfilePage() {
  return (
    <div className="container relative">
      <div className="space-y-8 py-8">
        <ProfileHeader data={personalStats} />
        <MetricsGrid data={currentMetrics} targets={targets} />
        <StrengthAreas data={strengthAreas} />
        <ActionPlan data={actionPlan} />
        <NutritionProfile data={nutritionProfile} />
      </div>
    </div>
  )
} 