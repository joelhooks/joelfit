'use server'

import { z } from 'zod'
import { contentSchema } from './schema'
import { chromium } from 'playwright'
import OpenAI from 'openai'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

const CACHE_TTL = 24 * 60 * 60 // 24 hours

export async function scrapeUrl(url: string) {
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const sendProgress = (message: string) => {
        const data = JSON.stringify({
          status: 'loading',
          progress: message
        })
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }

      try {
        // Check cache first
        const cacheKey = `scrape:${url}`
        const cachedContent = await redis.get<z.infer<typeof contentSchema>>(cacheKey)
        if (cachedContent) {
          sendProgress('📦 Found cached content')
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                status: 'success',
                data: cachedContent,
                fromCache: true,
                progress: 'Retrieved from cache'
              })}\n\n`
            )
          )
          return
        }

        // Launch browser and scrape content
        sendProgress('🌐 Launching browser...')
        const browser = await chromium.launch()
        const page = await browser.newPage()

        // Load page and extract content
        sendProgress('📄 Loading page...')
        await page.goto(url)
        
        sendProgress('📝 Extracting content...')
        const content = await page.evaluate(() => document.body.innerText)
        const codeBlocks = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('pre code')).map(block => {
            const language = block.className.replace('language-', '')
            return {
              language,
              code: block.textContent || ''
            }
          })
        })

        sendProgress(`📊 Content length: ${content.length}, found ${codeBlocks.length} code blocks`)
        
        // Close browser
        await browser.close()

        // Generate structured content
        sendProgress('🧠 Preparing content for analysis...')
        const stream = await openai.chat.completions.create({
          model: process.env.SCRAPER_MODEL || 'gpt-4o-mini-2024-07-18',
          messages: [
            {
              role: 'system',
              content: `You are a technical content analyzer. Return a JSON response with this exact structure:
{
  "metadata": {
    "title": string,
    "author": string (optional),
    "date": string (optional),
    "summary": string (REQUIRED)
  },
  "introduction": string,
  "mainPoints": string[] (REQUIRED, at least one point),
  "sections": [{
    "title": string,
    "content": string (MUST be a string, not an array),
    "subsections": [{ "title": string, "content": string }] (optional)
  }],
  "codeExamples": [{
    "language": string,
    "code": string,
    "path": string (optional),
    "explanation": string (optional)
  }] (optional),
  "technical": {
    "details": [{
      "title": string,
      "description": string,
      "examples": [{
        "language": string,
        "code": string,
        "path": string (optional),
        "explanation": string (optional)
      }] (optional)
    }],
    "implementation": [{
      "language": string,
      "code": string,
      "path": string (optional),
      "explanation": string (optional)
    }]
  } (optional),
  "references": [{
    "title": string,
    "url": string (must be a valid URL)
  }] (optional)
}

IMPORTANT:
1. metadata.summary is REQUIRED
2. mainPoints must be an array of strings and is REQUIRED
3. section content must be a string, NOT an array
4. Ensure all required fields are present
5. Format code blocks with proper indentation
6. References must include both title and valid URL`
            },
            {
              role: 'user',
              content: `Please analyze this content and code blocks:\n\nContent: ${content}\n\nCode Blocks: ${JSON.stringify(codeBlocks, null, 2)}`
            }
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' },
          stream: true
        })

        let responseText = ''
        let validated
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || ''
          responseText += content
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ progress: `🤖 Generating content... ${responseText.length} chars` })}\n\n`))
        }

        try {
          const parsed = JSON.parse(responseText)
          validated = contentSchema.parse(parsed)
          
          // Cache first
          if (validated) {
            sendProgress('💾 Caching content for future requests')
            await redis.set(cacheKey, validated, { ex: CACHE_TTL })
          }
          
          // Then send success response
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            status: 'success',
            data: validated, 
            progress: '✅ Content generation complete' 
          })}\n\n`))
        } catch (error) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Failed to parse AI response', progress: ['❌ Error parsing AI response'] })}\n\n`))
          throw error
        }

      } catch (error) {
        console.error('Error in scrapeUrl:', error)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          progress: 'Error occurred during scraping'
        })}\n\n`))
      } finally {
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
} 