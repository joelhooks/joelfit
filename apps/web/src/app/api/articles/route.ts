import { ArticleRepository } from '@/lib/repositories/article/repository'
import { articleSchema } from '@/lib/repositories/article/schema'
import { NextRequest } from 'next/server'

const repository = new ArticleRepository()

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const data = await request.json()
    
    // Validate input data
    const result = articleSchema.omit({
      id: true,
      slug: true,
      createdAt: true,
      updatedAt: true
    }).safeParse(data)

    if (!result.success) {
      return new Response(JSON.stringify({
        error: 'Invalid article data',
        details: result.error.message
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const article = await repository.create(data)
    
    return new Response(JSON.stringify(article), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error creating article:', error)
    return new Response(JSON.stringify({
      error: 'Failed to create article',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = request.nextUrl
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const exerciseId = searchParams.get('exerciseId')
    const mealPlanId = searchParams.get('mealPlanId')

    let articles
    if (category) {
      articles = await repository.findByCategory(category as any)
    } else if (tag) {
      articles = await repository.findByTag(tag as any)
    } else if (exerciseId) {
      articles = await repository.findRelatedToExercise(exerciseId)
    } else if (mealPlanId) {
      articles = await repository.findRelatedToMealPlan(mealPlanId)
    } else {
      articles = await repository.findAll()
    }

    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return new Response(JSON.stringify({
      error: 'Failed to fetch articles',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 