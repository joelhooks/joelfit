import { scrapeUrl } from '@/app/scrape/actions'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) {
    return new Response('URL parameter is required', { status: 400 })
  }

  return scrapeUrl(url)
} 