'use server'

import { chromium } from 'playwright'
import { z } from 'zod'
import { anthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

const defaultSchema = z.object({
  title: z.string().describe('The main title or heading of the page'),
  description: z.string().describe('A brief description or summary of the page content'),
  mainContent: z.string().describe('The main content or body text of the page'),
  links: z
    .array(
      z.object({
        text: z.string(),
        url: z.string(),
      }),
    )
    .describe('Important links found on the page'),
})

export async function scrapeUrl(url: string) {
  try {
    // Launch browser
    const browser = await chromium.launch()
    const page = await browser.newPage()
    await page.goto(url)

    // Get page content
    const html = await page.content()
    const dom = new JSDOM(html)
    const reader = new Readability(dom.window.document)
    const article = reader.parse()
    const content = article ? article.textContent : dom.window.document.body.textContent

    await browser.close()

    // Use Claude to extract structured data
    const llm = anthropic('claude-3-sonnet-20240229')
    const { object: data } = await generateObject({
      model: llm,
      schema: defaultSchema,
      messages: [
        {
          role: 'system',
          content: 'Extract structured data from the webpage content.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `URL: ${url}\n\nContent: ${content}`,
            },
          ],
        },
      ],
    })

    return { success: true, data }
  } catch (error) {
    console.error('Scraping failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
} 