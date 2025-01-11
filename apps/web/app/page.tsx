import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Dumbbell, Clock, BookOpen, Container, Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: 'JoelFit',
  description: 'My personal health & fitness framework',
}

interface Feature {
  title: string
  description: string
  href?: string
}

interface Section {
  title: string
  description: string
  icon: any // TODO: improve this type
  href: string
  features: Feature[]
}

const sections: Section[] = [
  {
    title: "High-Protein Meal Prep OS",
    description: "A systematic 5-day meal prep framework with 1-2-3 rotation for optimal protein intake and variety.",
    icon: UtensilsCrossed,
    href: "/eat",
    features: [
      {
        title: "5-Meal Structure",
        description: "2250-2500 cal, 200-220g protein",
        href: "/eat/profile"
      },
      {
        title: "2-3 Hour Sunday Prep",
        description: "Rice cooker + dual oven workflow",
        href: "/eat/preparation"
      },
      {
        title: "15 Unique Combos",
        description: "3 proteins × 3 starches × 2 veggies",
        href: "/eat/framework"
      },
      {
        title: "Container System",
        description: "Standardized portions & storage",
        href: "/eat/equipment"
      },
      {
        title: "Base Recipes",
        description: "Core proteins, sauces & sides",
        href: "/eat/recipes"
      },
      {
        title: "Quality Control",
        description: "Weekly tracking & adjustments",
        href: "/eat/tracking"
      }
    ]
  },
  {
    title: "Shoulder Program",
    description: "Progressive rehab routine focusing on mobility, stability, and strength.",
    icon: Dumbbell,
    href: "/shoulder",
    features: [
      {
        title: "Form-First",
        description: "Quality over quantity approach"
      },
      {
        title: "Progressive Load",
        description: "Gradual strength development"
      },
      {
        title: "Daily Practice",
        description: "Consistent improvement focus"
      }
    ]
  }
]

export default function HomePage() {
  return (
    <main className="container py-6">
      <div className="max-w-4xl">
        <h1 className="cyberpunk-title mb-4">
          JoelFit
        </h1>
        <p className="cyberpunk-text text-lg text-muted-foreground mb-12 max-w-2xl">
          My personal health & fitness framework, built for consistency and results.
        </p>

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <Link 
                href={section.href}
                className="cyberpunk-card block p-6"
              >
                <div className="cyberpunk-card-gradient" />
                
                <div className="flex items-start justify-between relative">
                  <div className="flex items-start gap-4">
                    <section.icon className="cyberpunk-icon h-6 w-6 mt-1" />
                    <div>
                      <h2 className="cyberpunk-subtitle mb-2">
                        {section.title}
                      </h2>
                      <p className="cyberpunk-text text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              </Link>

              <div className="grid gap-6 md:grid-cols-3 pl-10">
                {section.features.map((feature) => (
                  feature.href ? (
                    <Link
                      key={feature.title}
                      href={feature.href}
                      className="cyberpunk-feature"
                    >
                      <div className="cyberpunk-feature-gradient" />
                      <div className="relative">
                        <h3 className="cyberpunk-text font-medium mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div 
                      key={feature.title} 
                      className="cyberpunk-feature"
                    >
                      <div className="cyberpunk-feature-gradient" />
                      <div className="relative">
                        <h3 className="cyberpunk-text font-medium mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}