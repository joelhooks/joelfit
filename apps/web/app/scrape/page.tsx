import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ScrapeForm } from './scrape-form'

export const metadata: Metadata = {
  title: 'Content Scraper | JoelFit',
  description: 'AI-powered content scraping and processing',
  openGraph: {
    title: 'Content Scraper | JoelFit',
    description: 'AI-powered content scraping and processing',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(
          'Content Scraper',
        )}&description=${encodeURIComponent(
          'AI-powered content scraping and processing',
        )}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Content Scraper | JoelFit',
    description: 'AI-powered content scraping and processing',
  },
}

export default function ScrapePage() {
  return (
    <div className="container relative">
      <PageHeader
        title="Content Scraper"
        description="AI-powered content scraping and processing"
      />
      <ScrapeForm />
    </div>
  )
} 