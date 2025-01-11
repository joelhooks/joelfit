'use client'

import { PageHeader } from '@/components/page-header'
import { MetricsGrid } from '@/components/metrics/metrics-grid'
import { StrengthAreas } from '@/components/strength/strength-areas'
import { ProfileNav, sections } from '@/components/navigation/profile-nav'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ActionPlan } from '@/components/action/action-plan'

export default function JoelProfilePage() {
  return (
    <div className="container py-6">
      <PageHeader
        title="Joel's Profile"
        description="Personal metrics and optimization strategies"
        breadcrumbs={[
          { title: 'Profile', href: '/profile/joel' }
        ]}
      />
      
      <div className="flex gap-12 pt-6">
        {/* Sidebar Navigation */}
        <div className="hidden w-64 lg:block">
          <ProfileNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl space-y-12">
          <section id="metrics">
            <h2 className="text-2xl font-bold mb-6">Key Metrics</h2>
            <MetricsGrid />
          </section>

          <section id="strength">
            <h2 className="text-2xl font-bold mb-6">Strength Foundation</h2>
            <StrengthAreas />
          </section>

          <section id="action-plan">
            <h2 className="text-2xl font-bold mb-6">Action Plan</h2>
            <ActionPlan />
          </section>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
} 