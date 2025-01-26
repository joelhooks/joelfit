import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

export type RateLimitConfig = {
  uniqueIdentifier: string
  limit: number
  window: number // in seconds
  errorMessage?: string
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export async function rateLimit(config: RateLimitConfig): Promise<{
  success: boolean
  limit: number
  remaining: number
  reset: number
}> {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') ?? 'anonymous'
  const key = `rate-limit:${config.uniqueIdentifier}:${ip}`
  
  const window = config.window
  const limit = config.limit

  const [count, timestamp] = await redis
    .pipeline()
    .incr(key)
    .pttl(key)
    .exec() as [number, number]

  // If this is the first request, set expiry
  if (count === 1) {
    await redis.expire(key, window)
  }

  const ttl = timestamp === -1 ? window * 1000 : timestamp
  const reset = Date.now() + ttl

  const remaining = Math.max(0, limit - count)
  const success = count <= limit

  return {
    success,
    limit,
    remaining,
    reset
  }
} 