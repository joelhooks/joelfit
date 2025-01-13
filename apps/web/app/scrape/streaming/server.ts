'use server'

import { StreamedResponse, StreamProgress, StreamedResponseItem } from './types'
import { contentSchema } from '../schema'
import { chromium } from 'playwright'
import OpenAI from 'openai'
import { z } from 'zod'

const openai = new OpenAI()

const generateId = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString();
  });

type StreamingRequest = {
  id: string
  status: 'pending' | 'fulfilled' | 'rejected'
  promise: Promise<z.infer<typeof contentSchema>>
  data: z.infer<typeof contentSchema> | null
  progress: StreamProgress[]
}

const _streamingRequests: Record<string, StreamingRequest[]> = {}

function getCurrentStreamingState(id: string): StreamedResponse {
  if (!_streamingRequests[id]) {
    return {
      id,
      items: [],
      next: null,
    }
  }
  
  const items: StreamedResponseItem[] = _streamingRequests[id].map(({ id, data, status, progress }) => ({
    id,
    status,
    data,
    progress
  }))
  
  return {
    id,
    items,
    next: items.some(item => item.status === 'pending') ? next : null,
  }
}

async function next(id: string): Promise<StreamedResponse> {
  'use server'
  return getCurrentStreamingState(id)
}

export async function scrapeUrl(url: string): Promise<StreamedResponse> {
  if (!url) {
    return { id: '', items: [], next: null }
  }

  const id = generateId()
  const taskId = generateId()
  let browser = null

  const addProgress = (message: string) => {
    const request = _streamingRequests[id]?.[0]
    if (request) {
      request.progress.push({
        message,
        timestamp: Date.now()
      })
    }
  }

  _streamingRequests[id] = [{
    id: taskId,
    status: 'pending',
    progress: [],
    data: null,
    promise: (async () => {
      try {
        addProgress('🌐 Launching browser...')
        browser = await chromium.launch()
        
        addProgress('📄 Loading page...')
        const page = await browser.newPage()
        
        try {
          await page.goto(url, { timeout: 30000 }) // 30 second timeout
        } catch (error) {
          throw new Error(`Failed to load page: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
        
        addProgress('📝 Extracting content...')
        const pageContent = await page.evaluate(() => document.body.innerText)
        const codeBlocks = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('pre code')).map(block => ({
            language: block.className.replace('language-', ''),
            code: block.textContent || ''
          }))
        })
        
        // Close browser early since we don't need it anymore
        await browser.close()
        browser = null
        
        addProgress(`📊 Content length: ${pageContent.length}, found ${codeBlocks.length} code blocks`)
        
        addProgress('🧠 Preparing content for analysis...')
        const prompt = `Analyze this content and code blocks to generate structured content. Return the response as a JSON object following the schema. Content: ${pageContent}\n\nCode Blocks: ${JSON.stringify(codeBlocks)}`
        
        addProgress('🤖 Generating structured content...')
        let responseText = ''
        const openaiStream = await openai.chat.completions.create({
          model: process.env.SCRAPER_MODEL || 'gpt-4o-mini-2024-07-18',
          messages: [{ 
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
          }, { 
            role: 'user', 
            content: prompt 
          }],
          temperature: 0.7,
          max_tokens: 4000,
          response_format: { type: 'json_object' },
          stream: true
        })

        for await (const chunk of openaiStream) {
          const content = chunk.choices[0]?.delta?.content || ''
          responseText += content
          addProgress(`🤖 Generating: ${responseText.length} characters...`)
        }

        if (!responseText) {
          throw new Error('No content generated by AI')
        }

        addProgress('✨ Parsing response...')
        try {
          const parsedContent = contentSchema.parse(JSON.parse(responseText))
          addProgress('✅ Content generation complete')
          return parsedContent
        } catch (error) {
          throw new Error(`Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      } catch (error) {
        console.error('Error in scraping process:', error)
        throw error
      } finally {
        if (browser) {
          await browser.close()
        }
      }
    })()
  }]

  const request = _streamingRequests[id]?.[0]
  if (!request) {
    throw new Error('Failed to create streaming request')
  }

  request.promise
    .then((data) => {
      request.status = 'fulfilled'
      request.data = data
    })
    .catch((error) => {
      request.status = 'rejected'
      request.progress.push({
        message: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: Date.now()
      })
    })

  return getCurrentStreamingState(id)
} 