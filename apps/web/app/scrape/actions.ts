'use server'

import { chromium } from 'playwright'
import { z } from 'zod'
import { anthropic } from '@ai-sdk/anthropic'
import LLMScraper from 'llm-scraper'

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

    // Initialize scraper with Claude
    const llm = anthropic('claude-3-sonnet-20240229')
    const scraper = new LLMScraper(llm)

    // Run the scraper
    const { data } = await scraper.run(page, defaultSchema, {
      format: 'text',
      temperature: 0.7,
    })

    await browser.close()

    return { success: true, data }
  } catch (error) {
    console.error('Scraping failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
} 