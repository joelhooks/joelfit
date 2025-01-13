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
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="flex-1 min-h-0 overflow-y-auto space-y-4 p-2 sm:space-y-6 sm:p-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-muted relative before:absolute before:top-0 before:left-0 before:right-0 before:h-8 before:bg-gradient-to-b before:from-background before:to-transparent before:z-10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-8 after:bg-gradient-to-t after:from-background after:to-transparent after:z-10"
      >
        <AnimatePresence initial={false} mode="sync">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className={cn(
                "flex gap-2 sm:gap-3 relative group",
                message.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "flex flex-col max-w-[90%] sm:max-w-[80%] relative",
                message.role === "user" ? "items-end" : "items-start"
              )}>
                <motion.div 
                  layout="position"
                  className={cn(
                    "rounded-lg px-3 py-2 sm:px-4 shadow-sm",
                    message.role === "user" 
                      ? "bg-primary font-medium dark:bg-zinc-800" 
                      : "prose prose-sm sm:prose-base bg-muted/60 dark:bg-muted/20 dark:prose-invert"
                  )}
                >
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
                </motion.div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.3 }}
                  className="text-[10px] sm:text-xs text-muted-foreground mt-1"
                >
                  {format(new Date(), 'h:mm a')}
                </motion.span>
                {message.role === "assistant" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      onClick={() => copyToClipboard(message.content)}
                      size="icon"
                      variant="ghost"
                      className="absolute -right-8 sm:-right-12 top-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300"
                    >
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div className="flex gap-1.5">
              <motion.span
                animate={{
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="size-1 rounded-full bg-current"
              />
              <motion.span
                animate={{
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
                className="size-1 rounded-full bg-current"
              />
              <motion.span
                animate={{
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
                className="size-1 rounded-full bg-current"
              />
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

      <form onSubmit={handleSubmit} className="flex-shrink-0 p-2 sm:p-4 border-t">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              className="w-full px-3 py-2 sm:px-4 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed pr-12 sm:pr-16 text-sm sm:text-base"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? "AI is thinking..." : "Ask anything..."}
              disabled={isLoading}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] sm:text-xs text-muted-foreground hidden sm:inline-block">
              ⌘ + ↵
            </kbd>
          </div>
          <Button type="submit" disabled={isLoading || !input.trim()} size="sm" className="sm:text-base sm:h-10">
            Send
          </Button>
        </div>
      </form>
    </div>
  )
} 