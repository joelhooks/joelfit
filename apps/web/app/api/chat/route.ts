import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'
import { SYSTEM_PROMPT } from '@/prompts/system-prompt'

export const maxDuration = 30

const DEFAULT_TEMP = 0.7
const DEFAULT_MAX_TOKENS = 1000
const DEFAULT_MODEL = 'claude-3-sonnet-latest'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const temperature = Number(process.env.AI_TEMPERATURE) || DEFAULT_TEMP
  const maxTokens = Number(process.env.AI_MAX_TOKENS) || DEFAULT_MAX_TOKENS
  const model = process.env.AI_MODEL || DEFAULT_MODEL

  const result = streamText({
    model: anthropic(model),
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ],
    temperature,
    maxTokens,
  })

  return result.toDataStreamResponse()
} 