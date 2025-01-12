'use server'

import { chromium } from 'playwright'
import { z } from 'zod'
import { anthropic } from '@ai-sdk/anthropic'
import { generateObject } from 'ai'
import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'

const codeBlockSchema = z.object({
  language: z.string().describe('Programming language of the code block'),
  code: z.string().describe('The actual code content'),
  context: z.string().optional().describe('Any surrounding context or explanation for the code'),
})

const technicalDetailSchema = z.object({
  type: z.enum(['formula', 'algorithm', 'configuration', 'architecture', 'other']),
  content: z.string().describe('The technical detail content'),
  explanation: z.string().describe('Explanation or context for the technical detail'),
})

const defaultSchema = z.object({
  metadata: z.object({
    title: z.string().describe('The main title or heading of the page'),
    description: z.string().describe('A brief description or summary of the page content'),
    authors: z.array(z.string()).optional().describe('Authors of the content'),
    publishDate: z.string().optional().describe('Publication date if available'),
    lastUpdated: z.string().optional().describe('Last update date if available'),
    topics: z.array(z.string()).describe('Main topics or categories covered'),
  }),
  content: z.object({
    introduction: z.string().describe('Introduction or overview section'),
    mainPoints: z.array(z.string()).describe('Key points or arguments made in the content'),
    sections: z.array(z.object({
      title: z.string(),
      content: z.string(),
      subsections: z.array(z.object({
        title: z.string(),
        content: z.string(),
      })).optional(),
    })),
    conclusions: z.string().optional().describe('Conclusions or summary if present'),
  }),
  technical: z.object({
    codeBlocks: z.array(codeBlockSchema).describe('Code examples found in the content'),
    technicalDetails: z.array(technicalDetailSchema).describe('Technical details, formulas, or algorithms'),
    technologies: z.array(z.object({
      name: z.string(),
      context: z.string().describe('How/where this technology is used or referenced'),
    })),
  }),
  references: z.array(z.object({
    text: z.string(),
    url: z.string(),
    context: z.string().describe('Where/how this reference is used in the content'),
  })).describe('Links and references with context'),
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

    // Get code blocks
    const codeBlocks = await page.evaluate(() => {
      const blocks = Array.from(document.querySelectorAll('pre code, .highlight'))
      return blocks.map(block => ({
        language: block.className.match(/language-(\w+)/)?.[1] || 'text',
        code: block.textContent || '',
        context: block.parentElement?.previousElementSibling?.textContent || '',
      }))
    })

    await browser.close()

    // Use Claude to extract structured data
    const llm = anthropic('claude-3-sonnet-20240229')
    const { object: data } = await generateObject({
      model: llm,
      schema: defaultSchema,
      messages: [
        {
          role: 'system',
          content: `Extract detailed, structured data from the webpage content. 
          Pay special attention to technical details, code examples, and their context. 
          Preserve all technical information accurately.`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `URL: ${url}\n\nContent: ${content}\n\nCode Blocks: ${JSON.stringify(codeBlocks, null, 2)}`,
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