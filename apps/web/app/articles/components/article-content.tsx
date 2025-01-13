'use client'

import { Article } from '@/lib/repositories/article/schema'
import { MDXRemote } from 'next-mdx-remote'
import { format } from 'date-fns'
import { Badge } from '@repo/ui/components/badge'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ArticleContentProps {
  article: Article
  serializedContent: any
}

const components = {
  pre: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  code: ({ className, children }: { className?: string; children: React.ReactNode }) => {
    const language = className?.replace('language-', '')
    return language ? (
      <SyntaxHighlighter language={language} style={oneDark}>
        {String(children).trim()}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-muted px-1.5 py-0.5 rounded-md">{children}</code>
    )
  }
}

export function ArticleContent({ article, serializedContent }: ArticleContentProps) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      <header className="mb-8 not-prose">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          {article.source?.author && (
            <span className="text-sm">By {article.source.author}</span>
          )}
          {article.source?.publishedAt && (
            <time className="text-sm">
              {format(new Date(article.source.publishedAt), 'MMMM d, yyyy')}
            </time>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{article.category}</Badge>
          {article.tags.map(tag => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </header>
      
      <div className="mb-6">
        <p className="text-lg text-muted-foreground italic">
          {article.summary}
        </p>
      </div>

      <div className="mdx-content">
        <MDXRemote {...serializedContent} components={components} />
      </div>

      {article.source?.url && (
        <footer className="mt-8 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Originally published at{' '}
            <a 
              href={article.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              {new URL(article.source.url).hostname}
            </a>
          </p>
        </footer>
      )}
    </article>
  )
} 