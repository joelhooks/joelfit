import { type Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { MealPlanRepository } from '@/lib/repositories/meal-plan'
import { ClientTabs } from './client-tabs'

export const metadata: Metadata = {
  title: 'Meal Plan Details | High-Protein Meal Prep OS',
  description: 'Detailed meal plans and portion guides for the 1-2-3 rotation system',
  openGraph: {
    title: 'Meal Plan Details | High-Protein Meal Prep OS',
    description: 'Detailed meal plans and portion guides for the 1-2-3 rotation system',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Meal Plan Details')}&description=${encodeURIComponent('Detailed meal plans and portion guides for the 1-2-3 rotation system')}`,
      width: 1200,
      height: 630,
      alt: 'Meal Plan Details'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meal Plan Details | High-Protein Meal Prep OS',
    description: 'Detailed meal plans and portion guides for the 1-2-3 rotation system',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Meal Plan Details')}&description=${encodeURIComponent('Detailed meal plans and portion guides for the 1-2-3 rotation system')}`],
  }
}

async function getMealPlans() {
  const repo = new MealPlanRepository()
  return repo.getMealPlans()
}

export default async function MealPlanPage() {
  const mealPlans = await getMealPlans()
  const defaultPlan = mealPlans[0]?.slug || ''
  
  return (
    <main className="container py-6 space-y-12">
      <PageHeader
        title="Meal Plan Details"
        description="Detailed meal plans and portion guides for the 1-2-3 rotation system"
      />

      <ClientTabs mealPlans={mealPlans} defaultPlan={defaultPlan} />
    </main>
  )
} 