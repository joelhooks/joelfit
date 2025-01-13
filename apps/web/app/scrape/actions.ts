'use server'

import { chromium } from 'playwright'
import { openai } from '@ai-sdk/openai'
import { streamUI } from 'ai/rsc'
import { LoadingState, ErrorState, ScrapedContent } from './components'
import { contentSchema } from './schema'

const SCRAPER_MODEL = 'gpt-4-turbo-preview'

export async function scrapeUrl(url: string) {
  return streamUI(async (stream) => {
    try {
      // Launch browser
      await stream.write(<LoadingState />)
      const browser = await chromium.launch()
      const page = await browser.newPage()

      // Navigate to URL
      await stream.write(<LoadingState />)
      await page.goto(url)

      // Extract content
      await stream.write(<LoadingState />)
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
      await stream.write(<LoadingState />)
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

      if (!response.choices[0].message.content) {
        throw new Error('No content in response')
      }

      const data = contentSchema.parse(JSON.parse(response.choices[0].message.content))
      await stream.write(<ScrapedContent content={data} />)

    } catch (error) {
      console.error('Scraping error:', error)
      await stream.write(
        <ErrorState error={error instanceof Error ? error.message : 'An unknown error occurred'} />
      )
    }
  })
} 