'use client'

import { useState } from 'react'
import { Button } from '@repo/ui'
import { scrapeUrl } from './actions'
import * as React from 'react'
import { LoadingState } from './components'

export default function ScrapePage() {
  const [inputUrl, setInputUrl] = useState('')
  const [component, setComponent] = useState<React.ReactNode | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (inputUrl) {
      try {
        setIsLoading(true)
        setComponent(<LoadingState />)
        const result = await scrapeUrl(inputUrl)
        setComponent(result)
      } catch (error) {
        console.error('Error scraping:', error)
        setComponent(
          <div className="text-red-500">
            Failed to scrape content: {error instanceof Error ? error.message : 'Unknown error'}
          </div>
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleNewScrape = () => {
    setComponent(null)
    setInputUrl('')
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Content Scraper</h1>
        {component && (
          <Button onClick={handleNewScrape}>New Scrape</Button>
        )}
      </div>

      {!component ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter URL to scrape"
              className="w-full p-2 border rounded"
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Scraping...' : 'Scrape Content'}
          </Button>
          <p className="text-sm text-gray-600">
            Example: https://upstash.com/blog/degree-guru
          </p>
        </form>
      ) : (
        <div>{component}</div>
      )}
    </div>
  )
} 