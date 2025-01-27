import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { PageFooter } from '@/components/page-footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'JoelFit',
    template: '%s | JoelFit'
  },
  description: 'Personal fitness and nutrition tracking',
  openGraph: {
    title: 'JoelFit',
    description: 'Personal fitness and nutrition tracking',
    url: 'https://www.joelfit.app',
    siteName: 'JoelFit',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('JoelFit')}&description=${encodeURIComponent('Personal fitness and nutrition tracking')}`,
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
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('JoelFit')}&description=${encodeURIComponent('Personal fitness and nutrition tracking')}`],
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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <main className="min-h-screen">
            {children}
          </main>
          <PageFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
