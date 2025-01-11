'use client'

import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Dumbbell, Clock, BookOpen, Container, Scale } from 'lucide-react'
import Balancer from 'react-wrap-balancer'

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
        href: "/profile/joel"
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

export function HomeContent() {
  return (
    <main className="container py-6">
      <div className="max-w-4xl">
        <h1 className="cyberpunk-title mb-4">
          <Balancer>JoelFit</Balancer>
        </h1>
        <p className="cyberpunk-text text-lg text-muted-foreground mb-12 max-w-2xl">
          <Balancer>My personal health & fitness framework, built for consistency and results.</Balancer>
        </p>

        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <Link 
                href={section.href}
                className="cyberpunk-card block p-4 sm:p-6"
              >
                <div className="cyberpunk-card-gradient" />
                
                <div className="flex items-start justify-between relative">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <section.icon className="h-6 w-6 mt-0.5 flex-shrink-0 text-primary" />
                    <div>
                      <h2 className="cyberpunk-subtitle mb-2">
                        <Balancer>{section.title}</Balancer>
                      </h2>
                      <p className="cyberpunk-text text-muted-foreground">
                        <Balancer>{section.description}</Balancer>
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 mt-0.5 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              </Link>

              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pl-4 sm:pl-10">
                {section.features.map((feature) => (
                  feature.href ? (
                    <Link
                      key={feature.title}
                      href={feature.href}
                      className="cyberpunk-feature p-4 sm:p-6"
                    >
                      <div className="cyberpunk-feature-gradient" />
                      <div className="relative">
                        <h3 className="cyberpunk-text font-medium mb-1">
                          <Balancer>{feature.title}</Balancer>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          <Balancer>{feature.description}</Balancer>
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <div 
                      key={feature.title} 
                      className="cyberpunk-feature p-4 sm:p-6"
                    >
                      <div className="cyberpunk-feature-gradient" />
                      <div className="relative">
                        <h3 className="cyberpunk-text font-medium mb-1">
                          <Balancer>{feature.title}</Balancer>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          <Balancer>{feature.description}</Balancer>
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