import * as React from 'react'
import { Metadata } from 'next'
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { PageFooter } from '@/components/page-footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'JoelFit',
    template: '%s | JoelFit'
  },
  description: 'Personal fitness and nutrition tracking',
  openGraph: {
    title: 'JoelFit',
    description: 'Personal fitness and nutrition tracking',
    url: 'https://joel.fit',
    siteName: 'JoelFit',
    images: [{
      url: `https://joel.fit/api/og?title=${encodeURIComponent('JoelFit')}&description=${encodeURIComponent('Personal fitness and nutrition tracking')}`,
      width: 1200,
      height: 630,
      alt: 'JoelFit'
    }],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'JoelFit',
    card: 'summary_large_image',
    description: 'Personal fitness and nutrition tracking',
    images: [`https://joel.fit/api/og?title=${encodeURIComponent('JoelFit')}&description=${encodeURIComponent('Personal fitness and nutrition tracking')}`],
  },
  icons: {
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased overflow-clip",
        GeistSans.variable,
        GeistMono.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <PageFooter />
            </div>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
