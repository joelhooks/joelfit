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
  console.log('Converting to serializable:', typeof obj, obj === null ? 'null' : Array.isArray(obj) ? 'array' : typeof obj)
  
  if (obj === null || obj === undefined) {
    console.log('Handling null/undefined')
    return null
  }

  if (typeof obj !== 'object') {
    console.log('Handling primitive:', typeof obj)
    return obj
  }

  if (Array.isArray(obj)) {
    console.log('Handling array of length:', obj.length)
    return obj.map(toSerializable)
  }

  console.log('Converting object with keys:', Object.keys(obj))
  const plainObj: Record<string, any> = {}
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      console.log('Processing key:', key)
      const value = obj[key]
      plainObj[key] = toSerializable(value)
    }
  }

  return plainObj
}

type StreamMessage = {
  type: 'status' | 'partial' | 'error';
  message?: string;
  data?: Record<string, any>;
}

export async function scrapeUrl(url: string) {
  console.log('Starting scrape for URL:', url)
  
  const stream = new TransformStream()
  const writer = stream.writable.getWriter()
  const encoder = new TextEncoder()

  const writeToStream = (msg: StreamMessage) => {
    console.log('Writing to stream:', JSON.stringify(msg))
    writer.write(encoder.encode(`data: ${JSON.stringify(msg)}\n\n`))
  }

  // Start processing in the background
  (async () => {
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

      writeToStream({ type: 'status', message: 'Analyzing content...' })

      console.log('Starting streamObject')
      const { partialObjectStream } = await streamObject({
        model: openai(process.env.SCRAPER_MODEL || SCRAPER_MODEL),
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `URL: ${url}\n\nContent: ${content}\n\nCode Blocks: ${JSON.stringify(codeBlocks, null, 2)}` }
        ],
        schema: contentSchema
      })

      console.log('Processing stream')
      for await (const partial of partialObjectStream) {
        console.log('Received partial object with keys:', Object.keys(partial))
        const serialized = toSerializable(partial)
        writeToStream({ type: 'partial', data: serialized })
      }

      writeToStream({ type: 'status', message: 'Analysis complete' })
      
    } catch (error) {
      console.error('Stream error:', error)
      console.log('Error type:', error?.constructor?.name)
      console.log('Error properties:', Object.keys(error || {}))
      writeToStream({ 
        type: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      })
    } finally {
      writer.close()
    }
  })()

  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
} 