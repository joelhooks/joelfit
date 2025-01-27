'use client'

import { Article } from '@/lib/repositories/article/schema'
import { Exercise } from '@/lib/repositories/exercise/schema'
import { MealPlan } from '@/lib/repositories/meal-plan/schema'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@repo/ui'

interface ArticleSidebarProps {
  article: Article
  relatedExercises?: Exercise[]
  relatedMealPlans?: MealPlan[]
  relatedArticles?: Article[]
}

const setsDisplay = (sets: Exercise['sets']) => {
  if (sets.type === 'standard') {
    return `${sets.count} sets × ${sets.reps} reps${sets.hold ? ` (${sets.hold}s hold)` : ''}`
  }
  if (sets.type === 'distance') {
    return `${sets.count} sets × ${sets.distance}`
  }
  if (sets.type === 'duration') {
    return `${sets.count} sets × ${sets.duration}s`
  }
}

export function ArticleSidebar({
  article,
  relatedExercises = [],
  relatedMealPlans = [],
  relatedArticles = []
}: ArticleSidebarProps) {
  return (
    <aside className="space-y-6">
      {relatedArticles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {relatedArticles.map(article => (
                <li key={article.id}>
                  <Link 
                    href={`/articles/${article.slug}`}
                    className="block hover:text-primary transition-colors"
                  >
                    <h3 className="font-medium">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {relatedExercises.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {relatedExercises.map(exercise => (
                <li key={exercise.id}>
                  <Link 
                    href={`/exercises/${exercise.slug}`}
                    className="block hover:text-primary transition-colors"
                  >
                    <h3 className="font-medium">{exercise.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {setsDisplay(exercise.sets)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {relatedMealPlans.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Meal Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {relatedMealPlans.map(plan => (
                <li key={plan.id}>
                  <Link 
                    href={`/meal-plans/${plan.slug}`}
                    className="block hover:text-primary transition-colors"
                  >
                    <h3 className="font-medium">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.calories} calories
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </aside>
  )
} 