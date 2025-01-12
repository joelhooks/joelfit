import './globals.css'
import '../styles/cyberpunk.css'
import { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SiteHeader } from '@/components/site-header'
import { PageFooter } from '@/components/page-footer'
import { Providers } from '@/components/providers'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const metadata: Metadata = {
  metadataBase: new URL('https://joelfit.app'),
  title: 'JoelFit',
  description: 'a personal health & fitness framework',
  openGraph: {
    title: 'JoelFit',
    description: 'a personal health & fitness framework',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('JoelFit')}&description=${encodeURIComponent('a personal health & fitness framework')}`,
        width: 1200,
        height: 630,
        alt: 'JoelFit'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoelFit',
    description: 'a personal health & fitness framework',
    images: [`/api/og?title=${encodeURIComponent('JoelFit')}&description=${encodeURIComponent('a personal health & fitness framework')}`]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans">
        <div className="relative flex min-h-screen flex-col">
          <div className="cyberpunk-scanlines" />
          <div className="cyberpunk-noise" />
          
          <Providers>
            <NuqsAdapter>
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <PageFooter />
            </NuqsAdapter>
          </Providers>
        </div>
      </body>
    </html>
  )
}
