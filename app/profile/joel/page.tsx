export const metadata: Metadata = {
  title: "Joel's Profile",
  description: 'Personal metrics, strength areas, and nutrition profile for Joel Hooks',
  openGraph: {
    title: "Joel's Profile",
    description: 'Personal metrics, strength areas, and nutrition profile for Joel Hooks',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Joel\'s Profile')}&description=${encodeURIComponent('Personal metrics, strength areas, and nutrition profile for Joel Hooks')}`,
      width: 1200,
      height: 630,
      alt: 'Joel\'s Profile'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Joel's Profile",
    description: 'Personal metrics, strength areas, and nutrition profile for Joel Hooks',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Joel\'s Profile')}&description=${encodeURIComponent('Personal metrics, strength areas, and nutrition profile for Joel Hooks')}`],
  }
} 