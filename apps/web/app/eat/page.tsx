import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Container, Clock, BookOpen } from 'lucide-react'

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
  }
]

export default function EatPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">High-Protein Meal Prep OS</h1>
        <p className="text-lg text-muted-foreground mb-8">
          A 5-day high-protein meal prep system that takes the thought out of eating while maintaining variety.
        </p>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Daily Macro Targets</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="font-medium">Protein</p>
              <p className="text-muted-foreground">220-240g</p>
            </div>
            <div>
              <p className="font-medium">Carbs</p>
              <p className="text-muted-foreground">300-350g</p>
            </div>
            <div>
              <p className="font-medium">Fat</p>
              <p className="text-muted-foreground">65-80g</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            ~2700-2900 calories daily, adjustable based on needs
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">The 1-2-3 Framework</h2>
          <p className="text-muted-foreground mb-4">
            A rotation system using three components to create variety without complexity:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li>• 3 proteins (chicken, turkey, fish)</li>
            <li>• 3 starches (rice, yams, quinoa)</li>
            <li>• 3 vegetables (peas, broccoli, zucchini)</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Rotated across 15 meals per week (M-F, 3 meals per day)
          </p>
        </div>

        <div className="grid gap-6">
          {features.map((feature) => (
            <Link 
              key={feature.title}
              href={feature.href}
              className="group flex items-center justify-between p-6 border rounded-lg bg-card hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <feature.icon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-1 group-hover:text-primary">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 