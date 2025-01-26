import { ChatInterface } from '@/components/chat/chat-interface'
import { ExerciseRepository } from '@/lib/repositories/exercise/repository'
import { MealPlanRepository } from '@/lib/repositories/meal-plan/repository'
import { ProfileRepository } from '@/lib/repositories/profile/repository'
import { PreparationRepository } from '@/lib/repositories/preparation/repository'
import { RecipeRepository } from '@/lib/repositories/recipe/repository'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat with JoelFit AI',
  description: 'Your personal AI fitness and nutrition assistant',
  openGraph: {
    title: 'Chat with JoelFit AI',
    description: 'Your personal AI fitness and nutrition assistant',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Chat with JoelFit AI')}&description=${encodeURIComponent('Your personal AI fitness and nutrition assistant')}`,
      width: 1200,
      height: 630,
      alt: 'Chat with JoelFit AI'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat with JoelFit AI',
    description: 'Your personal AI fitness and nutrition assistant',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Chat with JoelFit AI')}&description=${encodeURIComponent('Your personal AI fitness and nutrition assistant')}`],
  }
}

export default async function ChatPage() {
  const exerciseRepo = new ExerciseRepository()
  const mealPlanRepo = new MealPlanRepository()
  const profileRepo = new ProfileRepository()
  const preparationRepo = new PreparationRepository()
  const recipeRepo = new RecipeRepository()

  const [exercises, mealPlans, profiles, preparations, recipes] = await Promise.all([
    exerciseRepo.findAll(),
    mealPlanRepo.findAll(),
    profileRepo.findAll(),
    preparationRepo.findAll(),
    recipeRepo.findAll(),
  ])

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Chat with JoelFit AI</h1>
      <ChatInterface 
        context={{
          exercises,
          mealPlans,
          profiles,
          preparations,
          recipes,
        }} 
      />
    </div>
  )
} 