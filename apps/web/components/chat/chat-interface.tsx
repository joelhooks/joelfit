'use client'

import { useChat } from 'ai/react'
import { Button } from '@repo/ui'
import { type Exercise } from '@/lib/repositories/exercise/schema'
import { type MealPlan } from '@/lib/repositories/meal-plan/schema'
import { type Profile } from '@/lib/repositories/profile/schema'
import { type Preparation } from '@/lib/repositories/preparation/schema'
import { type Recipe } from '@/lib/repositories/recipe/schema'
import { useEffect, useRef, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, AlertCircle, RefreshCw } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export type ChatContext = {
  exercises: Exercise[]
  mealPlans: MealPlan[]
  profiles: Profile[]
  preparations: Preparation[]
  recipes: Recipe[]
}

export function ChatInterface({ context }: { context: ChatContext }) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, reload } =
    useChat({
      body: {
        context,
      },
      onFinish: () => {
        scrollToBottom('smooth')
        inputRef.current?.focus()
        setError(null)
      },
      onError: (error) => {
        setError(error.message)
        scrollToBottom('smooth')
      }
    })

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'instant') => {
    messagesEndRef.current?.scrollIntoView({ behavior })
  }, [])

  // Watch for content changes and scroll
  useEffect(() => {
    if (!chatContainerRef.current) return

    const observer = new MutationObserver((mutations) => {
      // Only scroll if content was added/changed
      if (mutations.some(m => m.addedNodes.length > 0 || m.type === 'characterData')) {
        scrollToBottom()
      }
    })

    observer.observe(chatContainerRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => observer.disconnect()
  }, [scrollToBottom])

  // Initial scroll when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit(e as any)
    }
  }

  return (
    <div className="flex flex-col w-full h-[calc(100vh-12rem)]">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-6 p-4"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={cn(
                "flex gap-3 relative group",
                message.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "flex flex-col max-w-[80%] relative",
                message.role === "user" ? "items-end" : "items-start"
              )}>
                <div className={cn(
                  "rounded-lg px-4 py-2 shadow-sm",
                  message.role === "user" 
                    ? "bg-primary font-medium dark:bg-zinc-800" 
                    : "prose bg-muted/60 dark:bg-muted/20 dark:prose-invert"
                )}>
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    className={message.role === "user" ? "prose" : "prose"}
                    components={message.role === "user" ? {
                      p: ({ children }) => <p className="text-white">{children}</p>,
                      strong: ({ children }) => <strong className="text-white">{children}</strong>,
                      ul: ({ children }) => <ul className="text-white">{children}</ul>,
                      ol: ({ children }) => <ol className="text-white">{children}</ol>,
                      li: ({ children }) => <li className="text-white">{children}</li>,
                      a: ({ href, children }) => (
                        <a 
                          href={href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white underline"
                        >
                          {children}
                        </a>
                      )
                    } : {
                      p: ({ children }) => <p>{children}</p>,
                      a: ({ href, children }) => (
                        <a 
                          href={href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary underline dark:text-primary"
                        >
                          {children}
                        </a>
                      )
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {format(new Date(), 'h:mm a')}
                </span>
                {message.role === "assistant" && (
                  <Button
                    onClick={() => copyToClipboard(message.content)}
                    size="icon"
                    variant="ghost"
                    className="absolute -right-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div className="flex gap-1">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-100">●</span>
              <span className="animate-bounce delay-200">●</span>
            </div>
            AI is thinking...
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-destructive bg-destructive/10 rounded-lg p-4"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm flex-1">{error}</p>
            <Button
              size="sm"
              variant="ghost"
              className="flex-shrink-0"
              onClick={() => {
                setError(null)
                reload()
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              className="w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed pr-16"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? "AI is thinking..." : "Ask me anything about fitness and nutrition..."}
              disabled={isLoading}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-muted-foreground hidden sm:inline-block">
              ⌘ + ↵
            </kbd>
          </div>
          <Button type="submit" disabled={isLoading || !input.trim()}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
} 