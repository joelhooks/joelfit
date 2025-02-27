'use client'

import { useState } from 'react'
import { z } from 'zod'
import { contentSchema } from './schema'
import { Card } from '@repo/ui'
import { ClipboardCopy, Check } from 'lucide-react'
import { CodeBlock } from '@/components/ui/code-block'
import { Loader2 } from 'lucide-react'

type Content = z.infer<typeof contentSchema>
type Section = Content['sections'][number]
type Subsection = { title: string; content: string }
type CodeExample = NonNullable<Content['codeExamples']>[number]
type TechnicalDetail = NonNullable<Content['technical']>['details'][number]
type TechnicalExample = NonNullable<TechnicalDetail['examples']>[number]

interface LoadingStateProps {
  progress?: string
}

export function LoadingState({ progress }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm text-muted-foreground font-mono">
          {progress || 'Processing content...'}
        </span>
      </div>
    </div>
  )
}

export function ErrorState({ error }: { error: string }) {
  return (
    <Card className="p-4 border-destructive bg-background/50 backdrop-blur">
      <div className="text-destructive">
        <h3 className="font-bold">Error</h3>
        <p>{error}</p>
      </div>
    </Card>
  )
}

export function ScrapedContent({ content }: { content: Content }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const formatted = JSON.stringify(content, null, 2)
    await navigator.clipboard.writeText(formatted)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-background/50 backdrop-blur border border-border rounded-md hover:bg-background/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardCopy className="w-4 h-4" />
              Copy JSON
            </>
          )}
        </button>
      </div>

      <Card className="p-6 bg-background/50 backdrop-blur">
        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          {content.metadata.title}
        </h1>
        {content.metadata.author && (
          <p className="text-sm text-foreground/70">Author: {content.metadata.author}</p>
        )}
        {content.metadata.date && (
          <p className="text-sm text-foreground/70">Date: {content.metadata.date}</p>
        )}
        <p className="mt-4">{content.metadata.summary}</p>
      </Card>

      <Card className="p-6 bg-background/50 backdrop-blur">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Introduction
        </h2>
        <p>{content.introduction}</p>
      </Card>

      <Card className="p-6 bg-background/50 backdrop-blur">
        <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Main Points
        </h2>
        <ul className="list-none pl-0 space-y-2">
          {content.mainPoints.map((point: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2">❯</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </Card>

      {content.sections.map((section: Section, index: number) => (
        <Card key={index} className="p-6 bg-background/50 backdrop-blur">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            {section.title}
          </h2>
          <p>{section.content}</p>
          {section.subsections && section.subsections.length > 0 && (
            <div className="mt-4 space-y-4">
              {section.subsections.map((subsection: Subsection, subIndex: number) => (
                <div key={subIndex} className="pl-4 border-l-2 border-primary/30">
                  <h3 className="text-lg font-semibold mb-2">{subsection.title}</h3>
                  <p>{subsection.content}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}

      {content.codeExamples && content.codeExamples.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Code Examples
          </h2>
          {content.codeExamples.map((example: CodeExample, index: number) => (
            <CodeBlock
              key={index}
              code={example.code}
              language={example.language || 'plaintext'}
              path={example.path}
              explanation={example.explanation}
            />
          ))}
        </div>
      )}

      {content.technical && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Technical Details
          </h2>
          <div className="space-y-6">
            {content.technical.details.map((detail: TechnicalDetail, index: number) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">{detail.title}</h3>
                <p>{detail.description}</p>
                {detail.examples && detail.examples.length > 0 && (
                  <div className="space-y-4">
                    {detail.examples.map((example: TechnicalExample, exampleIndex: number) => (
                      <CodeBlock
                        key={exampleIndex}
                        code={example.code}
                        language={example.language || 'plaintext'}
                        path={example.path}
                        explanation={example.explanation}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {content.references && content.references.length > 0 && (
        <Card className="p-6 bg-background/50 backdrop-blur">
          <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            References
          </h2>
          <ul className="list-none pl-0 space-y-2">
            {content.references.map((ref, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mr-2">❯</span>
                <div className="flex items-center gap-2 flex-1">
                  <a 
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline flex-1"
                  >
                    {ref.title}
                  </a>
                  <button
                    onClick={() => window.location.href = `/scrape?url=${encodeURIComponent(ref.url)}`}
                    className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                  >
                    Scrape
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
} 