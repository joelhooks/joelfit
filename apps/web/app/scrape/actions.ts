'use server'

import { chromium } from 'playwright'
import OpenAI from 'openai'
import { contentSchema } from './schema'

const SCRAPER_MODEL = 'gpt-4-turbo-preview'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

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
        // Launch browser
        sendProgress('🌐 Launching browser...')
        const browser = await chromium.launch()
        const page = await browser.newPage()

        // Navigate to URL
        sendProgress('📄 Loading page...')
        await page.goto(url)

        // Extract content
        sendProgress('📝 Extracting content...')
        const content = await page.evaluate(() => document.body.innerText)
        const codeBlocks = await page.evaluate(() => {
          const blocks = Array.from(document.querySelectorAll('pre code'))
          return blocks.map(block => ({
            language: block.className.replace('language-', ''),
            code: block.textContent || ''
          }))
        })

        // Close browser
        await browser.close()

        // Analyze content with OpenAI
        sendProgress('🧠 Analyzing content...')
        const response = await openai.chat.completions.create({
          model: process.env.SCRAPER_MODEL || SCRAPER_MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are a technical content analyzer. Extract structured information from the provided content.'
            },
            {
              role: 'user',
              content: `URL: ${url}\n\nContent: ${content}\n\nCode Blocks: ${JSON.stringify(codeBlocks, null, 2)}`
            }
          ],
          response_format: { type: 'json_object' }
        })

        const messageContent = response.choices[0]?.message?.content
        if (!messageContent) {
          throw new Error('No content in response')
        }

        const data = contentSchema.parse(JSON.parse(messageContent))
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              status: 'success',
              data,
              progress: '✅ Content analysis complete'
            })}\n\n`
          )
        )
      } catch (error) {
        console.error('Scraping error:', error)
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              status: 'error',
              error: error instanceof Error ? error.message : 'An unknown error occurred',
              progress: '❌ Error occurred'
            })}\n\n`
          )
        )
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