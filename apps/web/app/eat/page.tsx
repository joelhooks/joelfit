import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Container, Clock, BookOpen, CalendarDays, User, ShoppingBag, Scale } from 'lucide-react'
import { PageHeader } from '@/components/page-header'

export const metadata: Metadata = {
  title: 'High-Protein Meal Prep OS | JoelFit',
  description: 'My 5-day high-protein meal prep system with 1-2-3 rotation',
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
            <h2 className="text-xl font-semibold mb-4">The 1-2-3 System</h2>
            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <div className="space-y-2">
                <h3 className="font-medium">What It Does</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Creates 15 unique meal combinations per week</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Maintains protein variety while keeping shopping simple</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>2-3 hour Sunday prep for the entire week</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Standardized portions for easy macro tracking</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Core Components</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium">Proteins</p>
                    <p className="text-muted-foreground">🍗 Chicken</p>
                    <p className="text-muted-foreground">🦃 Turkey</p>
                    <p className="text-muted-foreground">🐟 Fish</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Starches</p>
                    <p className="text-muted-foreground">🍚 Rice</p>
                    <p className="text-muted-foreground">🥔 Potato</p>
                    <p className="text-muted-foreground">🌱 Quinoa</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Veggies</p>
                    <p className="text-muted-foreground">❄️ Broccoli & Cauliflower</p>
                    <p className="text-muted-foreground">❄️ Mixed Vegetables</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link 
                href="/eat/meal-plan"
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <CalendarDays className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">View Meal Plan</h3>
                  <p className="text-sm text-muted-foreground">Check portions and mix meals for the week</p>
                </div>
              </Link>
              <Link 
                href="/eat/shopping"
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <ShoppingBag className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">Shopping List</h3>
                  <p className="text-sm text-muted-foreground">Get ingredients for your weekly prep</p>
                </div>
              </Link>
            </div>
          </section>

          {/* All Features */}
          <section>
            <h2 className="text-xl font-semibold mb-4">System Components</h2>
            <div className="grid gap-4">
              {features.map((feature) => (
                <Link 
                  key={feature.title}
                  href={feature.href}
                  className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <feature.icon className="h-6 w-6 mt-1 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 