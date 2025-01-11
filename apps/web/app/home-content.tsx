'use client'

import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Dumbbell, Activity, Scale, Brain, Target } from 'lucide-react'
import Balancer from 'react-wrap-balancer'

interface Section {
  title: string
  description: string
  icon: any // TODO: improve this type
  href: string
  status?: string
  features?: {
    title: string
    description: string
    href?: string
  }[]
}

const sections: Section[] = [
  {
    title: "Meal Prep System",
    description: "High-protein meal prep framework with 1-2-3 rotation for optimal variety.",
    icon: UtensilsCrossed,
    href: "/eat",
    features: [
      {
        title: "Framework",
        description: "3 proteins × 3 starches × 2 veggies",
        href: "/eat/framework"
      },
      {
        title: "Meal Plan",
        description: "5 meals, 2250-2500 cal, 200g+ protein",
        href: "/eat/meal-plan"
      },
      {
        title: "Shopping List",
        description: "Weekly ingredients & pantry staples",
        href: "/eat/shopping"
      },
      {
        title: "Prep Guide",
        description: "2-3 hour Sunday workflow",
        href: "/eat/preparation"
      }
    ]
  },
  {
    title: "Shoulder Rehab",
    description: "Progressive rehab routine focusing on mobility, stability, and strength.",
    icon: Dumbbell,
    href: "/shoulder",
    features: [
      {
        title: "Form-First",
        description: "Quality over quantity approach",
        href: "/shoulder"
      },
      {
        title: "Progressive Load",
        description: "Gradual strength development",
        href: "/shoulder"
      }
    ]
  },
  {
    title: "Personal Metrics",
    description: "Current DEXA analysis, strength metrics, and optimization strategies.",
    icon: Activity,
    href: "/profile/joel",
    status: "Updated Jan 2024",
    features: [
      {
        title: "Body Composition",
        description: "24% body fat, targeting android fat reduction",
        href: "/profile/joel#personal-stats"
      },
      {
        title: "Action Plan",
        description: "Fat loss protocol & training structure",
        href: "/profile/joel#action-plan"
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
          <Balancer>Personal health & fitness frameworks, built for consistency and results.</Balancer>
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <Link 
                href={section.href}
                className="cyberpunk-card block p-6"
              >
                <div className="cyberpunk-card-gradient" />
                
                <div className="flex items-start justify-between relative">
                  <div className="flex items-start gap-4">
                    <section.icon className="h-6 w-6 mt-1 flex-shrink-0 text-primary" />
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="cyberpunk-subtitle">
                          <Balancer>{section.title}</Balancer>
                        </h2>
                        {section.status && (
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {section.status}
                          </span>
                        )}
                      </div>
                      <p className="cyberpunk-text text-muted-foreground mt-1">
                        <Balancer>{section.description}</Balancer>
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 mt-1 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              </Link>

              {section.features && (
                <div className="grid gap-4 sm:grid-cols-2 pl-4 sm:pl-10">
                  {section.features.map((feature) => (
                    feature.href ? (
                      <Link
                        key={feature.title}
                        href={feature.href}
                        className="cyberpunk-feature p-4"
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
                        className="cyberpunk-feature p-4"
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
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 