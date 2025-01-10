import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Container, Clock, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Meal Prep OS | JoelFit',
  description: 'My systematic approach to meal preparation',
}

const features = [
  {
    title: "Core Framework",
    description: "The 1-2-3 system for efficient meal rotation",
    icon: Clock,
    href: "/eat/framework"
  },
  {
    title: "Container System",
    description: "Equipment and organization methods",
    icon: Container,
    href: "/eat/equipment"
  },
  {
    title: "Prep Workflow",
    description: "Step-by-step preparation process",
    icon: UtensilsCrossed,
    href: "/eat/preparation"
  },
  {
    title: "Base Recipes",
    description: "Core recipes and variations",
    icon: BookOpen,
    href: "/eat/recipes"
  }
]

export default function EatPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Meal Prep OS</h1>
        <p className="text-lg text-muted-foreground mb-8">
          My systematic approach to meal prep, focusing on efficiency and consistency.
        </p>

        <div className="bg-card border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">The 1-2-3 Framework</h2>
          <p className="text-muted-foreground mb-4">
            A structured system for meal rotation that ensures variety while maintaining simplicity:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-4">
            <li>• 1 weekly prep session</li>
            <li>• 2 main meal variations per week</li>
            <li>• 3 component categories (protein, carbs, vegetables)</li>
          </ul>
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