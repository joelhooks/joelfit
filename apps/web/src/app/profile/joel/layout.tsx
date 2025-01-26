import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Joel's Profile",
  description: 'Personal metrics, DEXA analysis, and optimization strategies',
  openGraph: {
    title: "Joel's Profile",
    description: 'Personal metrics, DEXA analysis, and optimization strategies',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent("Joel's Profile")}&description=${encodeURIComponent('Personal metrics and optimization strategies')}`,
      width: 1200,
      height: 630,
      alt: "Joel's Profile"
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Joel's Profile",
    description: 'Personal metrics, DEXA analysis, and optimization strategies',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent("Joel's Profile")}&description=${encodeURIComponent('Personal metrics and optimization strategies')}`],
  }
}

export default function JoelProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 