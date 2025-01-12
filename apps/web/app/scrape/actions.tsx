'use server'

import { chromium } from 'playwright'
import { openai } from '@ai-sdk/openai'
import { LoadingState, ErrorState, ScrapedContent } from './components'
import { contentSchema } from './schema'
import * as React from 'react'
import { generateObject } from 'ai'

const SCRAPER_MODEL = 'gpt-4-turbo-preview'

type MessageRole = 'system' | 'user' | 'assistant'

export async function scrapeUrl(url: string): Promise<React.ReactNode> {
  const messages = [
    {
      role: 'system' as MessageRole,
      content: 'You are a technical content analyzer. Extract structured information from the provided content.'
    }
  ]

  try {
    // Launch browser
    const browser = await chromium.launch()
    const page = await browser.newPage()

    // Navigate to URL
    await page.goto(url)

    // Extract content
    const pageContent = await page.evaluate(() => document.body.innerText)
    const codeBlocks = await page.evaluate(() => {
      const blocks = Array.from(document.querySelectorAll('pre code'))
      return blocks.map(block => ({
        language: block.className.replace('language-', ''),
        code: block.textContent || ''
      }))
    })

    // Close browser
    await browser.close()

    // Add user message with content
    messages.push({
      role: 'user' as MessageRole,
      content: `URL: ${url}\n\nContent: ${pageContent}\n\nCode Blocks: ${JSON.stringify(codeBlocks, null, 2)}`
    })

    // Get completion from OpenAI
    const data = await generateObject({
      model: openai(SCRAPER_MODEL),
      schema: contentSchema,
      messages,
      schemaDescription: 'Extract structured information from the content'
    })

    return React.createElement(ScrapedContent, { content: data })

  } catch (error) {
    console.error('Scraping error:', error)
    return React.createElement(ErrorState, {
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    })
  }
} 