Directory structure:
└── mishushakov-llm-scraper/
    ├── README.md
    ├── LICENSE.md
    ├── package.json
    ├── tsconfig.json
    ├── .prettierrc
    ├── examples/
    │   ├── codegen.ts
    │   ├── hn.ts
    │   ├── local.ts
    │   ├── ollama.ts
    │   └── streaming.ts
    └── src/
        ├── cleanup.ts
        ├── index.ts
        └── models.ts


Files Content:

================================================
File: README.md
================================================
# LLM Scraper

<img width="1800" alt="Screenshot 2024-04-20 at 23 11 16" src="https://github.com/mishushakov/llm-scraper/assets/10400064/ab00e048-a9ff-43b6-81d5-2e58090e2e65">

LLM Scraper is a TypeScript library that allows you to extract structured data from **any** webpage using LLMs.

> [!IMPORTANT]
> [Code-generation](#code-generation) is now supported in LLM Scraper.

> [!TIP]
> Under the hood, it uses function calling to convert pages to structured data. You can find more about this approach [here](https://til.simonwillison.net/gpt3/openai-python-functions-data-extraction).

### Features

- Supports **Local (Ollama, GGUF)**, OpenAI, Vercel AI SDK Providers
- Schemas defined with Zod
- Full type-safety with TypeScript
- Based on Playwright framework
- Streaming objects
- **NEW** [Code-generation](#code-generation)
- Supports 4 formatting modes:
  - `html` for loading raw HTML
  - `markdown` for loading markdown
  - `text` for loading extracted text (using [Readability.js](https://github.com/mozilla/readability))
  - `image` for loading a screenshot (multi-modal only)

**Make sure to give it a star!**

<img width="165" alt="Screenshot 2024-04-20 at 22 13 32" src="https://github.com/mishushakov/llm-scraper/assets/10400064/11e2a79f-a835-48c4-9f85-5c104ca7bb49">

## Getting started

1. Install the required dependencies from npm:

   ```
   npm i zod playwright llm-scraper
   ```

2. Initialize your LLM:

   **OpenAI**

   ```
   npm i @ai-sdk/openai
   ```

   ```js
   import { openai } from '@ai-sdk/openai'

   const llm = openai.chat('gpt-4o')
   ```

   **Groq**

   ```
   npm i @ai-sdk/openai
   ```

   ```js
   import { createOpenAI } from '@ai-sdk/openai'
   const groq = createOpenAI({
     baseURL: 'https://api.groq.com/openai/v1',
     apiKey: process.env.GROQ_API_KEY,
   })

   const llm = groq('llama3-8b-8192')
   ```

   **Ollama**

   ```
   npm i ollama-ai-provider
   ```

   ```js
   import { ollama } from 'ollama-ai-provider'

   const llm = ollama('llama3')
   ```

   **GGUF**

   ```js
   import { LlamaModel } from 'node-llama-cpp'

   const llm = new LlamaModel({ modelPath: 'model.gguf' })
   ```

3. Create a new scraper instance provided with the llm:

   ```js
   import LLMScraper from 'llm-scraper'

   const scraper = new LLMScraper(llm)
   ```

## Example

In this example, we're extracting top stories from HackerNews:

```ts
import { chromium } from 'playwright'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import LLMScraper from 'llm-scraper'

// Launch a browser instance
const browser = await chromium.launch()

// Initialize LLM provider
const llm = openai.chat('gpt-4o')

// Create a new LLMScraper
const scraper = new LLMScraper(llm)

// Open new page
const page = await browser.newPage()
await page.goto('https://news.ycombinator.com')

// Define schema to extract contents into
const schema = z.object({
  top: z
    .array(
      z.object({
        title: z.string(),
        points: z.number(),
        by: z.string(),
        commentsURL: z.string(),
      })
    )
    .length(5)
    .describe('Top 5 stories on Hacker News'),
})

// Run the scraper
const { data } = await scraper.run(page, schema, {
  format: 'html',
})

// Show the result from LLM
console.log(data.top)

await page.close()
await browser.close()
```

## Streaming

Replace your `run` function with `stream` to get a partial object stream (Vercel AI SDK only).

```ts
// Run the scraper in streaming mode
const { stream } = await scraper.stream(page, schema)

// Stream the result from LLM
for await (const data of stream) {
  console.log(data.top)
}
```

## Code-generation

Using the `generate` function you can generate re-usable playwright script that scrapes the contents according to a schema.

```ts
// Generate code and run it on the page
const { code } = await scraper.generate(page, schema)
const result = await page.evaluate(code)
const data = schema.parse(result)

// Show the parsed result
console.log(data.news)
```

## Contributing

As an open-source project, we welcome contributions from the community. If you are experiencing any bugs or want to add some improvements, please feel free to open an issue or pull request.


================================================
File: LICENSE.md
================================================
MIT License

Copyright (c) 2024 Mish Ushakov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


================================================
File: package.json
================================================
{
  "type": "module",
  "name": "llm-scraper",
  "version": "1.5.1",
  "description": "Turn any webpage intro structured data using LLMs",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mishushakov/llm-scraper.git"
  },
  "keywords": [
    "llm",
    "scraper",
    "browser",
    "playwright",
    "puppeteer"
  ],
  "author": "Mish Ushakov <mishushakov@users.noreply.github.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/mishushakov/llm-scraper/issues"
  },
  "homepage": "https://github.com/mishushakov/llm-scraper#readme",
  "dependencies": {
    "ai": "^3.1.12",
    "node-llama-cpp": "^2.8.9",
    "turndown": "^7.1.3",
    "zod-to-json-schema": "^3.22.5"
  },
  "devDependencies": {
    "@ai-sdk/anthropic": "^0.0.30",
    "@ai-sdk/openai": "^0.0.2",
    "@types/node": "^20.12.7",
    "@types/react": "^18.2.79",
    "ollama-ai-provider": "^0.10.0",
    "playwright": "^1.43.1",
    "typescript": "^5.4.5",
    "zod": "^3.22.5"
  }
}


================================================
File: tsconfig.json
================================================
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "lib": ["ESNext", "DOM"],
    "module": "NodeNext",
    "target": "ESNext",
    "moduleResolution": "NodeNext"
  },
  "include": ["src/**/*.ts"]
}


================================================
File: .prettierrc
================================================
{
  "trailingComma": "es5",
  "singleQuote": true,
  "semi": false
}


================================================
File: examples/codegen.ts
================================================
import { chromium } from 'playwright'
import { z } from 'zod'
import { anthropic } from '@ai-sdk/anthropic'
import LLMScraper from './../src'

// Launch a browser instance
const browser = await chromium.launch()

// Initialize LLM provider
const llm = anthropic('claude-3-5-sonnet-20240620')

// Create a new LLMScraper
const scraper = new LLMScraper(llm)

// Open new page
const page = await browser.newPage()
await page.goto('https://www.bbc.com')

// Define schema to extract contents into
const schema = z.object({
  news: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      url: z.string(),
    })
  ),
})

// Generate code and run it on the page
const { code } = await scraper.generate(page, schema)
console.log('code', code)

const result = await page.evaluate(code)
const data = schema.parse(result)

// Show the parsed result
console.log('result', data)

await page.close()
await browser.close()


================================================
File: examples/hn.ts
================================================
import { chromium } from 'playwright'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import LLMScraper from './../src'

// Launch a browser instance
const browser = await chromium.launch()

// Initialize LLM provider
const llm = openai.chat('gpt-4o')

// Create a new LLMScraper
const scraper = new LLMScraper(llm)

// Open new page
const page = await browser.newPage()
await page.goto('https://news.ycombinator.com')

// Define schema to extract contents into
const schema = z.object({
  top: z
    .array(
      z.object({
        title: z.string(),
        points: z.number(),
        by: z.string(),
        commentsURL: z.string(),
      })
    )
    .length(5)
    .describe('Top 5 stories on Hacker News'),
})

// Run the scraper
const { data } = await scraper.run(page, schema, {
  format: 'html',
})

// Show the result from LLM
console.log(data.top)

await page.close()
await browser.close()


================================================
File: examples/local.ts
================================================
import { chromium } from 'playwright'
import { LlamaModel } from 'node-llama-cpp'
import { z } from 'zod'
import LLMScraper from './../src'

// Launch a browser instance
const browser = await chromium.launch()

const modelPath =
  '/Users/mish/jan/models/tinyllama-1.1b/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf'

const llm = new LlamaModel({ modelPath })

// Initialize a new LLMScraper with local model
const scraper = new LLMScraper(llm)

// Open the page
const page = await browser.newPage()
await page.goto('https://example.com')

// Define schema to extract contents into
const schema = z.object({
  h1: z.string().describe('The main heading of the page'),
})

// Run the scraper
const { data } = await scraper.run(page, schema, {
  format: 'text',
})

console.log(data)

await page.close()
await browser.close()


================================================
File: examples/ollama.ts
================================================
import { chromium } from 'playwright'
import { ollama } from 'ollama-ai-provider'
import { z } from 'zod'
import LLMScraper from './../src'

// Launch a browser instance
const browser = await chromium.launch()

// Initialize LLM provider
const llm = ollama('llama3')

// Initialize a new LLMScraper with local model
const scraper = new LLMScraper(llm)

// Open the page
const page = await browser.newPage()
await page.goto('https://example.com')

// Define schema to extract contents into
const schema = z.object({
  h1: z.string().describe('The main heading of the page'),
})

// Run the scraper
const { data } = await scraper.run(page, schema, {
  format: 'html',
})

console.log(data)

await page.close()
await browser.close()


================================================
File: examples/streaming.ts
================================================
import { chromium } from 'playwright'
import { z } from 'zod'
import { openai } from '@ai-sdk/openai'
import LLMScraper from './../src'

// Launch a browser instance
const browser = await chromium.launch()

// Initialize LLM provider
const llm = openai.chat('gpt-4o')

// Create a new LLMScraper
const scraper = new LLMScraper(llm)

// Open new page
const page = await browser.newPage()
await page.goto('https://news.ycombinator.com')

// Define schema to extract contents into
const schema = z.object({
  top: z
    .array(
      z.object({
        title: z.string(),
        points: z.number(),
        by: z.string(),
        commentsURL: z.string(),
      })
    )
    .length(5)
    .describe('Top 5 stories on Hacker News'),
})

// Run the scraper in streaming mode
const { stream } = await scraper.stream(page, schema, {
  format: 'html',
})

// Stream the result from LLM
for await (const data of stream) {
  console.log(data.top)
}

await page.close()
await browser.close()


================================================
File: src/cleanup.ts
================================================
export default function cleanup() {
  const elementsToRemove = [
    'script',
    'style',
    'noscript',
    'iframe',
    'svg',
    'img',
    'audio',
    'video',
    'canvas',
    'map',
    'source',
    'dialog',
    'menu',
    'menuitem',
    'track',
    'object',
    'embed',
    'form',
    'input',
    'button',
    'select',
    'textarea',
    'label',
    'option',
    'optgroup',
    'aside',
    'footer',
    'header',
    'nav',
    'head',
  ]

  const attributesToRemove = [
    'style',
    'src',
    'alt',
    'title',
    'role',
    'aria-',
    'tabindex',
    'on',
    'data-',
  ]

  const elementTree = document.querySelectorAll('*')

  elementTree.forEach((element) => {
    if (elementsToRemove.includes(element.tagName.toLowerCase())) {
      element.remove()
    }

    Array.from(element.attributes).forEach((attr) => {
      if (attributesToRemove.some((a) => attr.name.startsWith(a))) {
        element.removeAttribute(attr.name)
      }
    })
  })
}


================================================
File: src/index.ts
================================================
import { Page } from 'playwright'
import Turndown from 'turndown'
import { LanguageModelV1 } from '@ai-sdk/provider'
import { LlamaModel } from 'node-llama-cpp'
import { z } from 'zod'
import {
  generateLlamaCompletions,
  generateAISDKCompletions,
  streamAISDKCompletions,
  generateAISDKCode,
} from './models.js'

import cleanup from './cleanup.js'

export type ScraperLoadOptions =
  | {
      format?: 'html' | 'text' | 'markdown' | 'cleanup'
    }
  | {
      format: 'custom'
      formatFunction: (page: Page) => Promise<string> | string
    }
  | {
      format: 'image'
      fullPage?: boolean
    }

export type ScraperLoadResult = {
  url: string
  content: string
  format: ScraperLoadOptions['format']
}

export type ScraperLLMOptions = {
  prompt?: string
  temperature?: number
  maxTokens?: number
  topP?: number
  mode?: 'auto' | 'json' | 'tool' | 'grammar'
}

export type ScraperRunOptions = ScraperLLMOptions & ScraperLoadOptions

export default class LLMScraper {
  constructor(private client: LanguageModelV1 | LlamaModel) {
    this.client = client
  }

  // Pre-process a page
  private async preprocess(
    page: Page,
    options: ScraperLoadOptions = { format: 'html' }
  ): Promise<ScraperLoadResult> {
    const url = page.url()
    let content

    if (options.format === 'html') {
      content = await page.content()
    }

    if (options.format === 'markdown') {
      const body = await page.innerHTML('body')
      content = new Turndown().turndown(body)
    }

    if (options.format === 'text') {
      const readable = await page.evaluate(async () => {
        const readability = await import(
          // @ts-ignore
          'https://cdn.skypack.dev/@mozilla/readability'
        )

        return new readability.Readability(document).parse()
      })

      content = `Page Title: ${readable.title}\n${readable.textContent}`
    }

    if (options.format === 'cleanup') {
      await page.evaluate(cleanup)
      content = await page.content()
    }

    if (options.format === 'image') {
      const image = await page.screenshot({ fullPage: options.fullPage })
      content = image.toString('base64')
    }

    if (options.format === 'custom') {
      if (
        !options.formatFunction ||
        typeof options.formatFunction !== 'function'
      ) {
        throw new Error('customPreprocessor must be provided in custom mode')
      }

      content = await options.formatFunction(page)
    }

    return {
      url,
      content,
      format: options.format,
    }
  }

  // Generate completion using AI SDK
  private async generateCompletions<T extends z.ZodSchema<any>>(
    page: ScraperLoadResult,
    schema: T,
    options?: ScraperRunOptions
  ) {
    switch (this.client.constructor) {
      default:
        return generateAISDKCompletions<T>(
          this.client as LanguageModelV1,
          page,
          schema,
          options
        )
      case LlamaModel:
        return generateLlamaCompletions<T>(this.client, page, schema, options)
    }
  }

  // Stream completions using AI SDK
  private async streamCompletions<T extends z.ZodSchema<any>>(
    page: ScraperLoadResult,
    schema: T,
    options?: ScraperRunOptions
  ) {
    switch (this.client.constructor) {
      default:
        return streamAISDKCompletions<T>(
          this.client as LanguageModelV1,
          page,
          schema,
          options
        )
      case LlamaModel:
        throw new Error('Streaming not supported with GGUF models')
    }
  }

  private async generateCode<T extends z.ZodSchema<any>>(
    page: ScraperLoadResult,
    schema: T,
    options?: ScraperLLMOptions
  ) {
    switch (this.client.constructor) {
      default:
        return generateAISDKCode<T>(
          this.client as LanguageModelV1,
          page,
          schema,
          options
        )
      case LlamaModel:
        throw new Error('Code-generation not supported with GGUF models')
    }
  }

  // Pre-process the page and generate completion
  async run<T extends z.ZodSchema<any>>(
    page: Page,
    schema: T,
    options?: ScraperRunOptions
  ) {
    const preprocessed = await this.preprocess(page, options)
    return this.generateCompletions<T>(preprocessed, schema, options)
  }

  // Pre-process the page and stream completion
  async stream<T extends z.ZodSchema<any>>(
    page: Page,
    schema: T,
    options?: ScraperRunOptions
  ) {
    const preprocessed = await this.preprocess(page, options)
    return this.streamCompletions<T>(preprocessed, schema, options)
  }

  // Pre-process the page and generate code
  async generate(page, schema: z.ZodSchema<any>, options?: ScraperLLMOptions) {
    const preprocessed = await this.preprocess(page, {
      ...options,
      format: 'cleanup',
    })
    return this.generateCode(preprocessed, schema, options)
  }
}


================================================
File: src/models.ts
================================================
import { LanguageModelV1 } from '@ai-sdk/provider'
import { generateObject, generateText, streamObject, UserContent } from 'ai'
import { z } from 'zod'
import { ScraperLoadResult, ScraperLLMOptions } from './index.js'
import {
  LlamaModel,
  LlamaJsonSchemaGrammar,
  LlamaContext,
  LlamaChatSession,
  GbnfJsonSchema,
} from 'node-llama-cpp'
import { zodToJsonSchema } from 'zod-to-json-schema'

export type ScraperCompletionResult<T extends z.ZodSchema<any>> = {
  data: z.infer<T>
  url: string
}

const defaultPrompt =
  'You are a sophisticated web scraper. Extract the contents of the webpage'

const defaultCodePrompt = `Provide a scraping function in JavaScript that extracts and formats data according to a schema from the current page.
The function must be IIFE. No comments or imports. The code you generate will be executed straight away, you shouldn't output anything besides runnable code.`

function prepareAISDKPage(page: ScraperLoadResult): UserContent {
  if (page.format === 'image') {
    return [
      {
        type: 'image',
        image: page.content,
      },
    ]
  }

  return [{ type: 'text', text: page.content }]
}

export async function generateAISDKCompletions<T extends z.ZodSchema<any>>(
  model: LanguageModelV1,
  page: ScraperLoadResult,
  schema: T,
  options?: ScraperLLMOptions
) {
  const content = prepareAISDKPage(page)
  const result = await generateObject<z.infer<T>>({
    model,
    messages: [
      { role: 'system', content: options?.prompt || defaultPrompt },
      { role: 'user', content },
    ],
    schema,
    temperature: options?.temperature,
    maxTokens: options?.maxTokens,
    topP: options?.topP,
    mode: options?.mode,
  })

  return {
    data: result.object,
    url: page.url,
  }
}

export async function streamAISDKCompletions<T extends z.ZodSchema<any>>(
  model: LanguageModelV1,
  page: ScraperLoadResult,
  schema: T,
  options?: ScraperLLMOptions
) {
  const content = prepareAISDKPage(page)
  const { partialObjectStream } = await streamObject<z.infer<T>>({
    model,
    messages: [
      { role: 'system', content: options?.prompt || defaultPrompt },
      { role: 'user', content },
    ],
    schema,
    temperature: options?.temperature,
    maxTokens: options?.maxTokens,
    topP: options?.topP,
  })

  return {
    stream: partialObjectStream,
    url: page.url,
  }
}

export async function generateAISDKCode<T extends z.ZodSchema<any>>(
  model: LanguageModelV1,
  page: ScraperLoadResult,
  schema: T,
  options?: ScraperLLMOptions
) {
  const generatedSchema = zodToJsonSchema(schema)
  const result = await generateText({
    model,
    messages: [
      { role: 'system', content: options?.prompt || defaultCodePrompt },
      {
        role: 'user',
        content: `Website: ${page.url}
        Schema: ${JSON.stringify(generatedSchema)}
        Content: ${page.content}`,
      },
    ],
    temperature: options?.temperature,
    maxTokens: options?.maxTokens,
    topP: options?.topP,
  })

  return {
    code: result.text,
    url: page.url,
  }
}

export async function generateLlamaCompletions<T extends z.ZodSchema<any>>(
  model: LlamaModel,
  page: ScraperLoadResult,
  schema: T,
  options?: ScraperLLMOptions
): Promise<ScraperCompletionResult<T>> {
  const generatedSchema = zodToJsonSchema(schema) as GbnfJsonSchema
  const grammar = new LlamaJsonSchemaGrammar(generatedSchema) as any // any, because it has type inference going wild
  const context = new LlamaContext({ model })
  const session = new LlamaChatSession({ context })
  const pagePrompt = `${options?.prompt || defaultPrompt}\n${page.content}`

  const result = await session.prompt(pagePrompt, {
    grammar,
    temperature: options?.temperature,
    maxTokens: options?.maxTokens,
    topP: options?.topP,
  })

  const parsed = grammar.parse(result)
  return {
    data: parsed,
    url: page.url,
  }
}


