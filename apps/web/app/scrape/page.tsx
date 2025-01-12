'use client'

import { useState } from 'react'
import { Button } from '@repo/ui'
import { ScrollArea } from '@repo/ui'
import { scrapeUrl } from './actions'

export default function ScrapePage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await scrapeUrl(url)
      if (response.success) {
        setResult(response.data)
      } else {
        setError(response.error)
      }
    } catch (err) {
      setError('Failed to scrape URL')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Web Scraper</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to scrape..."
            className="flex-1 rounded-md border bg-background px-4 py-2"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Scraping...' : 'Scrape'}
          </Button>
        </div>
      </form>

      {error && (
        <div className="mb-8 rounded-md bg-destructive/10 p-4 text-destructive">
          {error}
        </div>
      )}

      {result && (
        <ScrollArea className="h-[500px] rounded-md border p-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Title</h2>
              <p>{result.title}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Description</h2>
              <p>{result.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Main Content</h2>
              <p className="whitespace-pre-wrap">{result.mainContent}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Links</h2>
              <ul className="list-inside list-disc">
                {result.links.map((link: any, i: number) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  )
} 