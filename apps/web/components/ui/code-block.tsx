'use client'

import { useEffect, useState } from 'react'
import { getHighlighter } from 'shiki'
import { useTheme } from 'next-themes'
import { Card } from '@repo/ui'
import { ClipboardCopy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language: string
  path?: string
  explanation?: string
}

export function CodeBlock({ code, language, path, explanation }: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState('')
  const [copied, setCopied] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    async function highlight() {
      const highlighter = await getHighlighter({
        themes: ['github-dark', 'github-light'],
        langs: [language]
      })

      const highlighted = await highlighter.codeToHtml(code, {
        lang: language,
        theme: theme === 'dark' ? 'github-dark' : 'github-light'
      })

      setHighlightedCode(highlighted)
    }

    highlight()
  }, [code, language, theme])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative overflow-hidden my-4 rounded-lg border border-primary/20 bg-background/40">
      {path && (
        <div className="text-sm px-3 py-1.5 border-b border-primary/20 text-primary/80 bg-primary/5">
          {path}
        </div>
      )}
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 p-1.5 rounded-md transition-colors bg-primary/10 hover:bg-primary/20 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <ClipboardCopy className="h-3.5 w-3.5 text-primary/70" />
          )}
        </button>
        <div 
          className="p-3 overflow-x-auto font-mono text-sm [&>pre]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
      {explanation && (
        <div className="px-3 py-1.5 border-t border-primary/20 text-sm text-primary/80 bg-primary/5">
          {explanation}
        </div>
      )}
    </div>
  )
} 