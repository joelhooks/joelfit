'use client'

import { useChat } from 'ai/react'
import { Button } from '@repo/ui'
import { type Exercise } from '@/lib/repositories/exercise/schema'
import { type MealPlan } from '@/lib/repositories/meal-plan/schema'
import { type Profile } from '@/lib/repositories/profile/schema'
import { type Preparation } from '@/lib/repositories/preparation/schema'
import { type Recipe } from '@/lib/repositories/recipe/schema'
import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      body: {
        context,
      },
      onFinish: () => {
        scrollToBottom('smooth')
        inputRef.current?.focus()
      },
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-[600px] flex-col space-y-4"
    >
      <div className="flex-1 overflow-y-auto rounded-md border p-4">
        <AnimatePresence mode="popLayout">
          <div ref={chatContainerRef}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-4 whitespace-pre-wrap rounded-lg p-4 ${
                  m.role === 'user'
                    ? 'ml-auto max-w-[80%] bg-primary text-primary-foreground'
                    : 'mr-auto max-w-[80%] bg-muted'
                }`}
              >
                {m.content}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </AnimatePresence>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2"
      >
        <input
          ref={inputRef}
          className="flex-1 rounded-md border bg-background px-4 py-2"
          value={input}
          placeholder={isLoading ? 'AI is thinking...' : 'Ask anything...'}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? 'Thinking...' : 'Send'}
        </Button>
      </form>
    </motion.div>
  )
} 