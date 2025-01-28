import { Metadata } from 'next'
import { ProfileHeader } from '@/components/profile/profile-header'
import { MetricsGrid } from '@/components/metrics/metrics-grid'
import { StrengthAreas } from '@/components/strength/strength-areas'
import { ActionPlan } from '@/components/action/action-plan'
import { NutritionProfile } from '@/components/nutrition-profile'
import { ProfileRepository } from '@/lib/repositories/profile'

export const metadata: Metadata = {
  title: "Joel's Profile",
  description: 'Personal metrics, strength areas, and nutrition profile for Joel Hooks',
  openGraph: {
    title: "Joel's Profile",
    description: 'Personal metrics, strength areas, and nutrition profile for Joel Hooks',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent("Joel's Profile")}&description=${encodeURIComponent('Personal metrics, strength areas, and nutrition profile for Joel Hooks')}`,
      width: 1200,
      height: 630,
      alt: "Joel's Profile"
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Joel's Profile",
    description: 'Personal metrics, strength areas, and nutrition profile for Joel Hooks',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent("Joel's Profile")}&description=${encodeURIComponent('Personal metrics, strength areas, and nutrition profile for Joel Hooks')}`],
  }
}

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