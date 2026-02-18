'use client'

import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Dumbbell } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Balancer from 'react-wrap-balancer'

interface Section {
  title: string
  description: string
  icon: LucideIcon
  href: string
  features: {
    title: string
    description: string
    href: string
  }[]
}

const sections: Section[] = [
  {
    title: "Shoulder Program",
    description: "A progressive shoulder routine built around mobility, stability, and strength.",
    icon: Dumbbell,
    href: "/shoulder",
    features: [
      {
        title: "Daily Routine",
        description: "Follow the rehab workflow with set tracking and timers.",
        href: "/shoulder"
      }
    ]
  },
  {
    title: "Eat",
    description: "Meal prep framework, recipes, shopping, preparation, and weekly tracking.",
    icon: UtensilsCrossed,
    href: "/eat",
    features: [
      {
        title: "Framework",
        description: "The 1-2-3 rotation that drives the system.",
        href: "/eat/framework"
      },
      {
        title: "Meal Plan",
        description: "Daily structure and portions for the week.",
        href: "/eat/meal-plan"
      },
      {
        title: "Recipes",
        description: "Proteins, vegetables, and sauces you can batch prep.",
        href: "/eat/recipes"
      },
      {
        title: "Shopping",
        description: "Weekly list organized for efficient shopping.",
        href: "/eat/shopping"
      }
    ]
  }
]

export function HomeContent() {
  return (
    <main className="container py-6">
      <div className="max-w-4xl">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          <Balancer>JoelFit</Balancer>
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-muted-foreground">
          <Balancer>Shoulder training and nutrition systems designed for consistency.</Balancer>
        </p>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <Link
                href={section.href}
                className="group block rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <section.icon className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">
                        <Balancer>{section.title}</Balancer>
                      </h2>
                      <p className="mt-1 text-muted-foreground">
                        <Balancer>{section.description}</Balancer>
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              <div className="grid gap-4 pl-4 sm:grid-cols-2 sm:pl-10">
                {section.features.map((feature) => (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className="rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <h3 className="mb-1 font-medium">
                      <Balancer>{feature.title}</Balancer>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <Balancer>{feature.description}</Balancer>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
