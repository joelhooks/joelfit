import { Redis } from '@upstash/redis'
import { rateLimit } from '@/lib/rate-limit'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export async function POST(request: Request) {
  const rateLimitResult = await rateLimit({
    uniqueIdentifier: 'clear-cache',
    limit: 30,
    window: 60 * 60, // 1 hour
    errorMessage: 'Rate limit exceeded. Try again in an hour.'
  })

  if (!rateLimitResult.success) {
    return Response.json({
      error: 'Rate limit exceeded',
      limit: rateLimitResult.limit,
      remaining: rateLimitResult.remaining,
      reset: new Date(rateLimitResult.reset).toISOString()
    }, { 
      status: 429,
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.reset.toString()
      }
    })
  }

  const { url } = await request.json()
  if (!url) {
    return Response.json({ error: 'URL is required' }, { status: 400 })
  }

  const cacheKey = `scrape:${url}`
  await redis.del(cacheKey)
  
  return Response.json({ success: true })
} 