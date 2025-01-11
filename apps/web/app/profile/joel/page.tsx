'use client'

import { MetricsGrid } from '@/components/metrics/metrics-grid'
import { StrengthAreas } from '@/components/strength/strength-areas'
import { ProfileNav } from '@/components/navigation/profile-nav'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { ActionPlan } from '@/components/action/action-plan'
import { ProgressTracking } from '@/components/progress/progress-tracking'
import { NutritionProfile } from '@/components/nutrition-profile'
import { ProfileHeader } from '@/components/profile/profile-header'
import { personalStats, currentMetrics, targets, strengthAreas, actionPlan, nutritionProfile } from '@/config/joel'

export default function JoelProfilePage() {
  return (
    <div className="container relative">
      <div className="space-y-8 py-8">
        <ProfileHeader data={personalStats} />
        <div className="flex gap-12 pt-6">
          {/* Sidebar Navigation */}
          <div className="hidden w-64 lg:block">
            <ProfileNav />
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl space-y-12">
            <section id="metrics">
              <h2 className="text-2xl font-bold mb-6">Key Metrics</h2>
              <MetricsGrid data={currentMetrics} targets={targets} />
            </section>

            <section id="strength">
              <h2 className="text-2xl font-bold mb-6">Strength Foundation</h2>
              <StrengthAreas data={strengthAreas} />
            </section>

            <section id="action-plan">
              <h2 className="text-2xl font-bold mb-6">Action Plan</h2>
              <ActionPlan data={actionPlan} />
            </section>

            <section id="progress-tracking">
              <h2 className="text-2xl font-bold mb-6">Progress Tracking</h2>
              <ProgressTracking />
            </section>

            <section id="nutrition">
              <h2 className="text-2xl font-bold mb-6">Nutrition Details</h2>
              <NutritionProfile data={nutritionProfile} />
            </section>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  )
} 