import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'JoelFit | Personal Health & Fitness Framework',
  description: 'A collection of health and fitness programs and resources',
}

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">JoelFit</h1>
      <p className="text-lg text-muted-foreground mb-12">
        A personal health & fitness framework focused on sustainable, evidence-based practices.
      </p>

      <div className="grid gap-6">
        <Link 
          href="/shoulder" 
          className="group block p-6 border rounded-lg bg-card hover:border-primary transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary">
            Shoulder Rehabilitation Program
          </h2>
          <p className="text-muted-foreground">
            A comprehensive program for shoulder rehabilitation, including warm-up and strength exercises 
            designed to improve mobility and stability.
          </p>
        </Link>

        {/* More programs can be added here as they are developed */}
      </div>
    </div>
  )
}