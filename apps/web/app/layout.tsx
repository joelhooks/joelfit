import './globals.css'
import { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
  title: 'JoelFit',
  description: 'Evidence-based fitness & rehabilitation',
  openGraph: {
    title: 'JoelFit',
    description: 'Evidence-based fitness & rehabilitation',
    images: [{
      url: '/api/og',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoelFit',
    description: 'Evidence-based fitness & rehabilitation',
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
      <body>{children}</body>
    </html>
  )
}
