import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Container, Clock, BookOpen, CalendarDays, User, ShoppingBag, Scale } from 'lucide-react'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'High-Protein Meal Prep OS | JoelFit',
  description: 'My 5-day high-protein meal prep system with 1-2-3 rotation',
  openGraph: {
    title: 'High-Protein Meal Prep OS | JoelFit',
    description: 'My 5-day high-protein meal prep system with 1-2-3 rotation',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('High-Protein Meal Prep OS')}&description=${encodeURIComponent('My 5-day high-protein meal prep system with 1-2-3 rotation')}`,
      width: 1200,
      height: 630,
      alt: 'High-Protein Meal Prep OS'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High-Protein Meal Prep OS | JoelFit',
    description: 'My 5-day high-protein meal prep system with 1-2-3 rotation',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('High-Protein Meal Prep OS')}&description=${encodeURIComponent('My 5-day high-protein meal prep system with 1-2-3 rotation')}`],
  }
}

const features = [
  {
    title: "Core Framework",
    description: "The 1-2-3 rotation system for daily variety",
    icon: Clock,
    href: "/eat/framework"
  },
  {
    title: "Meal Plan",
    description: "Detailed meal plans and portion guides",
    icon: CalendarDays,
    href: "/eat/meal-plan"
  },
  {
    title: "Shopping List",
    description: "Weekly items and pantry staples",
    icon: ShoppingBag,
    href: "/eat/shopping"
  },
  {
    title: "Container System",
    description: "Equipment and storage logistics",
    icon: Container,
    href: "/eat/equipment"
  },
  {
    title: "Prep Workflow",
    description: "2-3 hour Sunday prep process",
    icon: UtensilsCrossed,
    href: "/eat/preparation"
  },
  {
    title: "Base Recipes",
    description: "Proteins, starches, and sauce system",
    icon: BookOpen,
    href: "/eat/recipes"
  },
  {
    title: "Profile & Targets",
    description: "Personal nutrition profile and targets",
    icon: User,
    href: "/eat/profile"
  },
  {
    title: "Progress & QC",
    description: "Track progress and maintain quality standards",
    icon: Scale,
    href: "/eat/tracking"
  }
]

export default function EatPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="High-Protein Meal Prep OS"
          description="A systematic approach to high-protein meal prep that takes the thought out of eating while maintaining variety."
          breadcrumbs={[
            { title: "Eat", href: "/eat" }
          ]}
        />

        <div className="space-y-12">
          {/* Core System Overview */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              The 1-2-3 System
            </h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 mb-6">
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">What It Does</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>Creates 15 unique meal combinations per week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>Maintains protein variety while keeping shopping simple</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>2-3 hour Sunday prep for the entire week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                    <span>Standardized portions for easy macro tracking</span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Core Components</h3>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-sm">
                  <div className="bg-muted/50 rounded p-3">
                    <p className="font-medium mb-2">Proteins</p>
                    <div className="space-y-1 text-muted-foreground">
                      <p>🍗 Chicken</p>
                      <p>🦃 Turkey</p>
                      <p>🐟 Fish</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded p-3">
                    <p className="font-medium mb-2">Starches</p>
                    <div className="space-y-1 text-muted-foreground">
                      <p>🍚 Rice</p>
                      <p>🥔 Potato</p>
                      <p>🌱 Quinoa</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded p-3">
                    <p className="font-medium mb-2">Veggies</p>
                    <div className="space-y-1 text-muted-foreground">
                      <p>❄️ Broccoli & Cauliflower</p>
                      <p>❄️ Mixed Vegetables</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-primary flex-shrink-0" />
              Quick Actions
            </h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <Link 
                href="/eat/meal-plan"
                className="flex items-start gap-3 sm:gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <CalendarDays className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-medium mb-1">View Meal Plan</h3>
                  <p className="text-sm text-muted-foreground">Check portions and mix meals for the week</p>
                </div>
              </Link>
              <Link 
                href="/eat/shopping"
                className="flex items-start gap-3 sm:gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <ShoppingBag className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-medium mb-1">Shopping List</h3>
                  <p className="text-sm text-muted-foreground">Get ingredients for your weekly prep</p>
                </div>
              </Link>
            </div>
          </section>

          {/* All Features */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
              System Components
            </h2>
            <div className="grid gap-4">
              {features.map((feature) => (
                <Link 
                  key={feature.title}
                  href={feature.href}
                  className="flex items-start gap-3 sm:gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <feature.icon className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 mt-0.5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-all" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 