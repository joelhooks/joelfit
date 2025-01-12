'use client'

import { type ComponentProps } from 'react'
import dynamic from 'next/dynamic'
import { Card } from '@repo/ui'
import { ClipboardCopy, Check, Loader2 } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language: string
  path?: string
  explanation?: string
}

// Loading component shown while Shiki loads
function CodeBlockLoading() {
  return (
    <div className="relative overflow-hidden my-4 rounded-lg border border-primary/20 bg-background/40">
      <div className="relative group">
        <div className="p-3 overflow-x-auto font-mono text-sm flex items-center justify-center min-h-[50px]">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}

// Dynamically import the Shiki version with a loading state
const DynamicCodeBlock = dynamic<CodeBlockProps>(() => import('./code-block-with-shiki'), {
  loading: CodeBlockLoading,
  ssr: false
})

export const CodeBlock = DynamicCodeBlock 