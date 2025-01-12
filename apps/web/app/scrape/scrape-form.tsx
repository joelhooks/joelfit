'use client'

import { useState } from 'react'
import { Card } from '@repo/ui'
import { scrapeUrl } from './actions'
import { ErrorState, LoadingState, ScrapedContent } from './components'
import { useQueryState } from 'nuqs'
import { Content } from './schema'

interface ScrapeState {
  status: 'idle' | 'loading' | 'success' | 'error'
  data?: Content
  error?: string
  progress: string
  fromCache?: boolean
}

export function ScrapeForm() {
  const [url, setUrl] = useQueryState('url')
  const [state, setState] = useState<ScrapeState>({
    status: 'idle',
    progress: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!url) return

    setState({ status: 'loading', progress: 'Starting scrape...' })

    try {
      const response = (await scrapeUrl(url)) as unknown as Response
      if (!response.body) throw new Error('Failed to get response body')

      const reader = response.body.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = new TextDecoder().decode(value)
        const events = text.split('\n\n')

        for (const event of events) {
          if (!event.startsWith('data: ')) continue
          const data = JSON.parse(event.slice(6))

          if (data.status === 'loading') {
            setState(prev => ({ ...prev, status: 'loading', progress: data.progress }))
          } else if (data.status === 'success') {
            setState({
              status: 'success',
              data: data.data,
              progress: '',
              fromCache: data.fromCache,
            })
          } else if (data.status === 'error') {
            setState({
              status: 'error',
              error: data.error,
              progress: '',
            })
          }
        }
      }
    } catch (error) {
      setState({
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to scrape URL',
        progress: '',
      })
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="p-4">
          <div className="flex gap-4">
            <input
              type="url"
              value={url || ''}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to scrape"
              className="flex-1 px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              disabled={state.status === 'loading'}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.status === 'loading' ? 'Scraping...' : 'Scrape'}
            </button>
          </div>
        </Card>
      </form>

      {state.status === 'loading' && <LoadingState progress={state.progress} />}
      {state.status === 'error' && state.error && <ErrorState error={state.error} />}
      {state.status === 'success' && state.data && (
        <>
          {state.fromCache && (
            <Card className="p-4 bg-primary/10">
              <p className="text-sm text-primary">
                ⚡️ Content loaded from cache
              </p>
            </Card>
          )}
          <ScrapedContent content={state.data} />
        </>
      )}
    </div>
  )
} 