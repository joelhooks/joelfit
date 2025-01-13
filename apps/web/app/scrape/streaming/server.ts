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
        const browser = await chromium.launch()
        
        addProgress('📄 Loading page...')
        const page = await browser.newPage()
        await page.goto(url)
        
        addProgress('📝 Extracting content...')
        const pageContent = await page.evaluate(() => document.body.innerText)
        const codeBlocks = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('pre code')).map(block => block.textContent)
        })
        
        addProgress(`📊 Content length: ${pageContent.length}, found ${codeBlocks.length} code blocks`)
        
        addProgress('🧠 Preparing content for analysis...')
        const prompt = `Analyze this content and code blocks to generate structured content. Return the response as a JSON object following the schema. Content: ${pageContent}\n\nCode Blocks: ${JSON.stringify(codeBlocks)}`
        
        addProgress('🤖 Generating structured content...')
        let responseText = ''
        const openaiStream = await openai.chat.completions.create({
          model: 'gpt-4o-2024-08-06',
          messages: [{ 
            role: 'system',
            content: `You are a content analyzer that returns responses in JSON format following this schema:
{
  "metadata": {
    "title": string,
    "summary": string,
    "url": string
  },
  "introduction": string,
  "mainPoints": string[],
  "sections": {
    "title": string,
    "content": string
  }[]
}

Always include all required fields and ensure the response is valid JSON.`
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
          throw new Error('No content generated')
        }

        addProgress('✨ Parsing response...')
        const parsedContent = contentSchema.parse(JSON.parse(responseText))
        addProgress('✅ Content generation complete')
        await browser.close()

        return parsedContent
      } catch (error) {
        console.error('Error:', error)
        throw error
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
    .catch(() => {
      request.status = 'rejected'
    })

  return getCurrentStreamingState(id)
} 