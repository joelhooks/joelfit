import { ChatInterface } from '@/components/chat/chat-interface'

export default function ChatPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Chat with JoelFit AI</h1>
      <ChatInterface />
    </div>
  )
} 