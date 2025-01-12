'use client'

import { useChat } from 'ai/react'
import { Button } from '@repo/ui'
import { ScrollArea } from '@repo/ui'

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat()

  return (
    <div className="flex h-[600px] flex-col space-y-4">
      <ScrollArea className="flex-1 rounded-md border p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 whitespace-pre-wrap rounded-lg p-4 ${
              m.role === 'user'
                ? 'ml-auto max-w-[80%] bg-primary text-primary-foreground'
                : 'mr-auto max-w-[80%] bg-muted'
            }`}
          >
            {m.content}
          </div>
        ))}
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2"
      >
        <input
          className="flex-1 rounded-md border bg-background px-4 py-2"
          value={input}
          placeholder="Ask anything..."
          onChange={handleInputChange}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Thinking...' : 'Send'}
        </Button>
      </form>
    </div>
  )
} 