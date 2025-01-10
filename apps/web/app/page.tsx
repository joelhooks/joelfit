import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'JoelFit',
  description: 'My personal health & fitness framework',
}

export default function HomePage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">JoelFit</h1>
        <p className="text-lg text-muted-foreground mb-12">
          My health & fitness notes and programs.
        </p>

        <div className="grid gap-6">
          <Link 
            href="/shoulder" 
            className="group block p-6 border rounded-lg bg-card hover:border-primary transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary">
              Shoulder Program
            </h2>
            <p className="text-muted-foreground">
              Rehab exercises for my fucked up shoulder.
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}