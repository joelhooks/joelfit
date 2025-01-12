import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { SYSTEM_PROMPT } from '@/prompts/system-prompt'

export const maxDuration = 30

const DEFAULT_TEMP = 0.7
const DEFAULT_MAX_TOKENS = 1000

export async function POST(req: Request) {
  const { messages } = await req.json()

  const temperature = Number(process.env.AI_TEMPERATURE) || DEFAULT_TEMP
  const maxTokens = Number(process.env.AI_MAX_TOKENS) || DEFAULT_MAX_TOKENS

  const result = streamText({
    model: anthropic('claude-3-sonnet-20240229'),
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ],
    temperature,
    maxTokens,
  })

  return result.toDataStreamResponse()
} 