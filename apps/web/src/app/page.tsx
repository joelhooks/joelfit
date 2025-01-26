import { Metadata } from 'next'
import { HomeContent } from './home-content'

export const metadata: Metadata = {
  title: 'JoelFit',
  description: 'My personal health & fitness framework',
}

export default function HomePage() {
  return <HomeContent />
}