import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { NutritionProfile } from '@/components/nutrition-profile'

export const metadata: Metadata = {
  title: 'Nutrition Profile | JoelFit',
  description: 'Personal nutrition profile and meal planning details'
}

export default function ProfilePage() {
  return (
    <div className="container max-w-6xl py-6 space-y-6">
      <PageHeader
        title="Nutrition Profile"
        description="Detailed nutrition targets and meal planning structure"
        breadcrumbs={[
          { title: 'Eat', href: '/eat' },
          { title: 'Profile', href: '/eat/profile' }
        ]}
      />
      <NutritionProfile />
    </div>
  )
} 