'use client'

import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { scrapeUrl } from './actions'

export default function ScrapePage() {
  const [url] = useQueryState('url')
  const [chunks, setChunks] = useState<string[]>([])

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

  if (!url) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">URL Scraper</h1>
        <p>Add ?url=YOUR_URL to scrape content</p>
        <p className="text-sm text-muted-foreground mt-2">Example: <code>?url=https://upstash.com/blog/degree-guru</code></p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Scraping URL</h1>
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