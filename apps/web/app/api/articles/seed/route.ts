import { createFirstArticle } from '@/app/articles/actions'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const article = await createFirstArticle()
    return new Response(JSON.stringify(article), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error seeding first article:', error)
    return new Response(JSON.stringify({
      error: 'Failed to seed article',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 