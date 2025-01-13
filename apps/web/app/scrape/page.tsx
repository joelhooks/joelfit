'use client'

import { useState, useEffect } from 'react'
import { Card } from '@repo/ui'
import { scrapeUrl } from './actions'
import { ErrorState, ScrapedContent } from './components'
import { LoadingState } from './components/loading-state'
import { useQueryState } from 'nuqs'
import { Trash2 } from 'lucide-react'
import { Content } from './schema'

interface ScrapeState {
  status: 'idle' | 'loading' | 'success' | 'error'
  data?: Content
  error?: string
  progress: string
  fromCache?: boolean
}

export default function ScrapePage() {
  const [url, setUrl] = useQueryState('url', {
    defaultValue: '',
    parse: (value: string | null): string => value ?? '',
  })
  const [state, setState] = useState<ScrapeState>({ 
    status: 'idle',
    progress: ''
  })

  useEffect(() => {
    if (url && state.status === 'idle') {
      handleSubmit(new Event('submit') as any)
    }
  }, [url]) // Only trigger on URL changes when idle

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setState({ status: 'loading', progress: '🔍 Checking cache...' })

    try {
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = new TextDecoder().decode(value)
        const lines = text.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(5))
              setState(prev => ({
                ...prev,
                ...data,
                progress: data.progress || prev.progress
              }))
            } catch (e) {
              console.error('Failed to parse SSE data:', e)
            }
          }
        }
      }
    } catch (error) {
      setState({ 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        progress: ''
      })
    }
  }

  const handleClearCache = async () => {
    if (!url) return
    
    const response = await fetch('/api/clear-cache', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })

    if (!response.ok) {
      console.error('Failed to clear cache')
      return
    }

    // Re-scrape after clearing cache
    handleSubmit(new Event('submit') as any)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="mb-8">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Content Scraper</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-2">
                URL to Scrape
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="https://example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!url || state.status === 'loading'}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.status === 'loading' ? 'Scraping...' : 'Scrape Content'}
            </button>
          </form>
        </div>
      </Card>

      {state.status === 'loading' && (
        <LoadingState progress={state.progress} />
      )}
      
      {state.status === 'error' && (
        <Card className="mb-8">
          <div className="p-6">
            <ErrorState error={state.error!} />
            {state.progress.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Progress Log</h3>
                <div className="space-y-1">
                  <div className="text-sm text-gray-600 font-mono">{state.progress}</div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
      
      {state.status === 'success' && state.data && (
        <>
          <Card className="mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Analysis Results</h2>
                <div className="flex items-center gap-2">
                  {state.fromCache && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <span className="mr-1">📦</span>
                      From Cache
                    </span>
                  )}
                  <button
                    onClick={handleClearCache}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear Cache
                  </button>
                </div>
              </div>
            </div>
          </Card>
          <ScrapedContent content={state.data} />
        </>
      )}
    </div>
  )
} 