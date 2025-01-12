'use client'

import { z } from 'zod'
import { codeBlockSchema, technicalDetailSchema, contentSchema } from './schema'

type Section = {
  title: string
  content: string
  subsections?: { title: string; content: string }[]
}

type CodeExample = {
  language?: string
  code: string
}

type TechnicalDetail = {
  title: string
  description: string
  examples?: CodeExample[]
}

export function LoadingState() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded"></div>
      <div className="h-4 bg-muted rounded w-5/6"></div>
    </div>
  )
}

export function ErrorState({ error }: { error: string }) {
  return (
    <div className="rounded-lg border border-destructive p-4 text-destructive">
      <h3 className="font-semibold mb-2">Error</h3>
      <p>{error}</p>
    </div>
  )
}

export function CodeBlock({ language, code }: { language?: string; code: string }) {
  return (
    <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
      {language && (
        <div className="text-xs text-muted-foreground mb-2">{language}</div>
      )}
      <code>{code}</code>
    </pre>
  )
}

export function ContentSection({ title, content, subsections }: Section) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{content}</p>
      {subsections?.map((sub, i: number) => (
        <div key={i} className="ml-4 space-y-2">
          <h4 className="text-lg font-medium">{sub.title}</h4>
          <p>{sub.content}</p>
        </div>
      ))}
    </section>
  )
}

export function ScrapedContent({ content }: { content: z.infer<typeof contentSchema> }) {
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <h2 className="text-2xl font-bold">{content.metadata.title}</h2>
        <div className="text-muted-foreground">
          {content.metadata.author && <span>By {content.metadata.author}</span>}
          {content.metadata.date && <span> • {content.metadata.date}</span>}
        </div>
        <p className="text-lg">{content.metadata.summary}</p>
      </header>

      <section>
        <h3 className="text-xl font-semibold mb-4">Introduction</h3>
        <p>{content.introduction}</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Key Points</h3>
        <ul className="list-disc list-inside space-y-2">
          {content.mainPoints.map((point: string, i: number) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </section>

      <div className="space-y-8">
        {content.sections.map((section: Section, i: number) => (
          <ContentSection key={i} {...section} />
        ))}
      </div>

      {content.codeExamples && content.codeExamples.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
          <div className="space-y-4">
            {content.codeExamples.map((example: CodeExample, i: number) => (
              <CodeBlock key={i} {...example} />
            ))}
          </div>
        </section>
      )}

      {content.technical && (
        <section>
          <h3 className="text-xl font-semibold mb-4">Technical Details</h3>
          <div className="space-y-6">
            {content.technical.details.map((detail: TechnicalDetail, i: number) => (
              <div key={i} className="space-y-4">
                <h4 className="text-lg font-medium">{detail.title}</h4>
                <p>{detail.description}</p>
                {detail.examples && detail.examples.length > 0 && (
                  <div className="space-y-4 ml-4">
                    {detail.examples.map((example: CodeExample, j: number) => (
                      <CodeBlock key={j} {...example} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            {content.technical.implementation.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-medium">Implementation</h4>
                {content.technical.implementation.map((example: CodeExample, i: number) => (
                  <CodeBlock key={i} {...example} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {content.references && content.references.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold mb-4">References</h3>
          <ul className="list-disc list-inside space-y-2">
            {content.references.map((ref: string, i: number) => (
              <li key={i}>{ref}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
} 