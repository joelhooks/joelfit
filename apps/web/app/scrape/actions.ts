'use server'

import { chromium } from 'playwright'
import { z } from 'zod'
import { openai } from '@/lib/openai'
import { streamObject, createDataStreamResponse } from 'ai'
import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

const codeBlockSchema = z.object({
  language: z.string().default('text'),
  code: z.string(),
  context: z.string().optional(),
})

const technicalDetailSchema = z.object({
  type: z.enum(['formula', 'algorithm', 'configuration', 'architecture', 'other']).default('other'),
  content: z.string(),
  explanation: z.string().optional(),
})

const contentSchema = z.object({
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    authors: z.array(z.string()).default([]),
    publishDate: z.string().optional(),
    lastUpdated: z.string().optional(),
    topics: z.array(z.string()).default([]),
  }),
  content: z.object({
    introduction: z.string(),
    mainPoints: z.array(z.string()).default([]),
    sections: z.array(z.object({
      title: z.string(),
      content: z.string(),
      subsections: z.array(z.object({
        title: z.string(),
        content: z.string(),
      })).optional(),
    })).default([]),
    conclusions: z.string().optional(),
  }),
  technical: z.object({
    codeBlocks: z.array(codeBlockSchema).default([]),
    technicalDetails: z.array(technicalDetailSchema).default([]),
    technologies: z.array(z.object({
      name: z.string(),
      context: z.string(),
    })).default([]),
  }).default({}),
  references: z.array(z.object({
    text: z.string(),
    url: z.string(),
    context: z.string().optional(),
  })).default([]),
})

const SYSTEM_PROMPT = `You are a technical content analyzer. Your task is to extract structured information from web content.

Follow these guidelines:
1. Always include metadata.title and metadata.description
2. Always include content.introduction
3. Break down the content into logical sections
4. Identify and preserve all technical information:
   - Code blocks with their context
   - Technical concepts and explanations
   - Technologies mentioned and how they're used
5. Capture all relevant links and references
6. Keep technical details accurate and complete

If certain fields are not present in the content, use empty arrays or omit optional fields rather than making up information.`

// Default model for content extraction
const SCRAPER_MODEL = 'gpt-4o-2024-08-06'

export async function scrapeUrl(url: string) {
  try {
    return createDataStreamResponse({
      execute: async (dataStream) => {
        // Launch browser
        dataStream.writeData('Launching browser...')
        const browser = await chromium.launch()
        const page = await browser.newPage()
        await page.goto(url)

        // Get page content
        dataStream.writeData('Extracting content...')
        const html = await page.content()
        const dom = new JSDOM(html)
        const reader = new Readability(dom.window.document)
        const article = reader.parse()
        const content = article ? article.textContent : dom.window.document.body.textContent

        // Get code blocks
        dataStream.writeData('Extracting code blocks...')
        const codeBlocks = await page.evaluate(() => {
          const blocks = Array.from(document.querySelectorAll('pre code, .highlight'))
          return blocks.map(block => ({
            language: block.className.match(/language-(\w+)/)?.[1] || 'text',
            code: block.textContent || '',
            context: block.parentElement?.previousElementSibling?.textContent || '',
          }))
        })

        await browser.close()

        dataStream.writeData('Analyzing content...')

        // Stream the AI analysis
        const { partialObjectStream } = streamObject({
          model: openai(process.env.SCRAPER_MODEL || SCRAPER_MODEL),
          schema: contentSchema,
          schemaName: 'TechnicalContent',
          schemaDescription: 'Structured representation of technical content from a webpage',
          messages: [
            {
              role: 'system',
              content: SYSTEM_PROMPT,
            },
            {
              role: 'user',
              content: `URL: ${url}\n\nContent: ${content}\n\nCode Blocks: ${JSON.stringify(codeBlocks, null, 2)}`,
            },
          ],
        })

        // Stream partial objects as they're generated
        for await (const partial of partialObjectStream) {
          dataStream.writeData(JSON.stringify(partial))
        }
        
        dataStream.writeData('Complete!')
      },
      onError: (error) => {
        console.error('Scraping failed:', error)
        return error instanceof Error ? error.message : 'Unknown error'
      },
    })
  } catch (error) {
    console.error('Scraping failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
} 