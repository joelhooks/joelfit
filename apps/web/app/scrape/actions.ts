'use server'

import { createDataStreamResponse } from 'ai'
import { openai } from '@ai-sdk/openai'
import { z } from 'zod'
import { chromium } from 'playwright'
import { streamObject } from 'ai'

const SCRAPER_MODEL = 'gpt-4-turbo-preview'

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

function toSerializable(obj: any): any {
  if (obj === undefined || obj === null) {
    return null
  }
  if (Array.isArray(obj)) {
    return obj.map(toSerializable)
  }
  if (typeof obj === 'object') {
    const result: Record<string, any> = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = toSerializable(value)
    }
    return result
  }
  return obj
}

export async function scrapeUrl(url: string) {
  console.log('Starting scrape for URL:', url)
  return createDataStreamResponse({
    execute: async (dataStream) => {
      try {
        console.log('Launching browser')
        const browser = await chromium.launch()
        
        console.log('Creating page')
        const page = await browser.newPage()
        
        console.log('Navigating to:', url)
        await page.goto(url)
        
        const content = await page.content()
        console.log('Content length:', content.length)
        
        const codeBlocks = await page.evaluate(() => {
          const blocks = Array.from(document.querySelectorAll('pre code'))
          console.log('Found code blocks:', blocks.length)
          return blocks.map(block => ({
            language: block.className.replace('language-', ''),
            code: block.textContent || ''
          }))
        })
        console.log('Code blocks extracted:', codeBlocks.length)

        await browser.close()
        console.log('Browser closed')

        dataStream.writeData('Analyzing content...')

        const { partialObjectStream } = await streamObject({
          model: openai(process.env.SCRAPER_MODEL || SCRAPER_MODEL),
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `URL: ${url}\n\nContent: ${content}\n\nCode Blocks: ${JSON.stringify(codeBlocks, null, 2)}` }
          ],
          schema: contentSchema
        })

        for await (const partial of partialObjectStream) {
          dataStream.writeData(toSerializable(partial))
        }

        console.log('Stream completed')
        dataStream.writeData('Analysis complete')

      } catch (error) {
        console.error('Stream error:', error)
        throw error
      }
    },
    onError: (error) => {
      console.error('Stream error:', error)
      throw error
    }
  })
} 