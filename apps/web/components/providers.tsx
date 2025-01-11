import { type ReactNode } from 'react'
import { RepositoryProvider } from '@repo/core'
import { EquipmentRepository } from '@/lib/repositories/equipment'
import { FrameworkRepository } from '@/lib/repositories/framework/repository'
import { MealPlanRepository } from '@/lib/repositories/meal-plan'
import { ProfileRepository } from '@/lib/repositories/profile'
import { ShoppingRepository } from '@/lib/repositories/shopping'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const repositories = new Map([
    ['equipment', new EquipmentRepository()],
    ['framework', new FrameworkRepository()],
    ['mealPlan', new MealPlanRepository()],
    ['profile', new ProfileRepository()],
    ['shopping', new ShoppingRepository()],
  ])

  return (
    <RepositoryProvider repositories={repositories}>
      {children}
    </RepositoryProvider>
  )
} 