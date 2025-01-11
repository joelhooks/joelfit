import './globals.css'
import '../styles/cyberpunk.css'
import { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { SiteHeader } from '@/components/site-header'
import { PageFooter } from '@/components/page-footer'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'JoelFit',
  description: 'a personal health & fitness framework',
  openGraph: {
    title: 'JoelFit',
    description: 'a personal health & fitness framework',
    images: [{
      url: '/api/og',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoelFit',
    description: 'a personal health & fitness framework',
    images: ['/api/og'],
  },
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
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <PageFooter />
          </Providers>
        </div>
      </body>
    </html>
  )
}
