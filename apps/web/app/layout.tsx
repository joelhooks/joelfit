import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"

import "./globals.css"
import "../styles/cyberpunk.css"

export const metadata = {
  title: "JoelFit",
  description: "Joel's personal fitness tracking app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <div className="relative flex min-h-screen flex-col">
              <div className="cyberpunk-scanlines" />
              <div className="cyberpunk-noise" />
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
