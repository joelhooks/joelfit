'use client'

import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { scrapeUrl } from './actions'
import { Button } from '@repo/ui'

export default function ScrapePage() {
  const [url, setUrl] = useQueryState('url')
  const [chunks, setChunks] = useState<string[]>([])
  const [inputUrl, setInputUrl] = useState('')

  useEffect(() => {
    if (!url) return

    const scrape = async () => {
      try {
        const response = await scrapeUrl(url)
        if (!response || 'success' in response && !response.success) {
          console.error('Scraping failed:', response)
          setChunks(prev => [...prev, 'Scraping failed: ' + JSON.stringify(response)])
          return
        }

        // Handle streaming response
        if (response instanceof Response) {
          const reader = response.body?.getReader()
          if (!reader) return

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            // Decode and log the chunks
            const text = new TextDecoder().decode(value)
            console.log('Chunk:', text)
            setChunks(prev => [...prev, text])
          }
        }
      } catch (error) {
        console.error('Scraping error:', error)
        setChunks(prev => [...prev, 'Error: ' + (error instanceof Error ? error.message : String(error))])
      }
    }

    setChunks([]) // Clear chunks on new URL
    scrape()
  }, [url])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputUrl) {
      setUrl(inputUrl)
    }
  }

  if (!url) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">URL Scraper</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div className="flex gap-4">
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter URL to scrape..."
              className="flex-1 rounded-md border bg-background px-4 py-2"
              required
            />
            <Button type="submit">Scrape</Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Example: <code>https://upstash.com/blog/degree-guru</code>
          </p>
        </form>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Scraping URL</h1>
        <Button 
          variant="outline" 
          onClick={() => {
            setUrl(null)
            setInputUrl('')
            setChunks([])
          }}
        >
          New Scrape
        </Button>
      </div>
      <p className="font-mono text-sm mb-4">{url}</p>
      <div className="font-mono text-sm whitespace-pre-wrap border rounded-lg p-4 bg-muted/50 min-h-[200px]">
        {chunks.map((chunk, i) => (
          <div key={i} className="mb-2">
            {chunk}
          </div>
        ))}
        {chunks.length === 0 && <div className="text-muted-foreground">Waiting for data...</div>}
      </div>
    </div>
  )
} 