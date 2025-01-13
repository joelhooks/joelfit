import { scrapeUrl } from '@/app/scrape/actions'
import { rateLimit } from '@/lib/rate-limit'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) {
    return new Response('URL parameter is required', { status: 400 })
  }

  const rateLimitResult = await rateLimit({
    uniqueIdentifier: 'scrape',
    limit: 10,
    window: 60 * 60, // 1 hour
    errorMessage: 'Rate limit exceeded. Try again in an hour.'
  })

  if (!rateLimitResult.success) {
    return new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        limit: rateLimitResult.limit,
        remaining: rateLimitResult.remaining,
        reset: new Date(rateLimitResult.reset).toISOString()
      }),
      { 
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString()
        }
      }
    )
  }

  return scrapeUrl(url)
} 