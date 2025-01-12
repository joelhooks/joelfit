import { NextResponse, type NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Create a new ratelimiter that allows 50 requests per hour
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, '1 h'),
  analytics: true,
  prefix: '@joelfit/chat',
})

// Get the real IP, considering forwarded headers
function getIP(request: NextRequest) {
  const xff = request.headers.get('x-forwarded-for')
  return xff ? xff.split(',')[0] : '127.0.0.1'
}

export async function middleware(request: NextRequest) {
  // Only rate limit the chat endpoint
  if (!request.nextUrl.pathname.startsWith('/api/chat')) {
    return NextResponse.next()
  }

  const ip = getIP(request)
  const { success, limit, remaining, reset } = await ratelimit.limit(
    `ratelimit_${ip}`,
  )

  if (!success) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        limit,
        remaining,
        reset,
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      },
    )
  }

  const response = NextResponse.next()

  // Add rate limit headers to successful requests too
  response.headers.set('X-RateLimit-Limit', limit.toString())
  response.headers.set('X-RateLimit-Remaining', remaining.toString())
  response.headers.set('X-RateLimit-Reset', reset.toString())

  return response
}

export const config = {
  matcher: '/api/chat',
} 