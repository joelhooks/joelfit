'use client'

import { useEffect, useRef, useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@repo/ui'
import { NutritionProfile } from '@/components/nutrition-profile'
import { Activity, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'

type MetricKey = 'androidFat' | 'gynoidFat' | 'agRatio' | 'visceralFat' | 'totalBodyFat' | 'rsmi'
type TargetKey = 'androidFat' | 'agRatio' | 'visceralFat'

const sections = [
  { id: 'personal-stats', title: 'Personal Stats' },
  { id: 'strength-foundation', title: 'Strength Foundation' },
  { id: 'action-plan', title: 'Action Plan' },
  { id: 'progress-tracking', title: 'Progress Tracking' },
  { id: 'nutrition-details', title: 'Nutrition Details' }
] as const

export default function JoelProfilePage() {
  const [activeSection, setActiveSection] = useState('personal-stats')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const setRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(({ id }) => {
      const element = sectionRefs.current[id]
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const personalStats = {
    name: 'Joel Hooks',
    age: 50,
    height: '6\'3" (75 inches)',
    weight: '251 lbs',
    activity: 'Moderately Active',
    exercise: '4-6 sessions per week',
    experience: {
      lifting: 'Advanced',
      cardio: 'Intermediate'
    }
  }

  const currentMetrics: Record<MetricKey, string> = {
    androidFat: "34.0%",
    gynoidFat: "22.5%",
    agRatio: "1.50",
    visceralFat: "3.08 lbs",
    totalBodyFat: "24.0%",
    rsmi: "11.16"
  }

  const targets: Record<TargetKey, string> = {
    androidFat: "< 24.0%",
    agRatio: "< 1.0",
    visceralFat: "< 2.0 lbs"
  }

  const strengthAreas = [
    {
      title: "Muscle Mass",
      metric: "RSMI 11.16",
      details: "53% above minimum threshold, excellent foundation for metabolic health"
    },
    {
      title: "Bone Density",
      metric: "Z-score 2.9",
      details: "97-99th percentile, indicates strong resistance training history"
    },
    {
      title: "Muscle Balance",
      metric: "< 0.5% difference",
      details: "Nearly perfect symmetry between left/right sides"
    }
  ]

  const actionPlan = [
    {
      category: "Nutrition",
      items: [
        {
          title: "Caloric Strategy",
          description: "Small deficit of 300-500 calories targeting android fat",
          detail: "Current body fat distribution suggests focusing on fat loss while preserving muscle"
        },
        {
          title: "Macro Distribution",
          description: "40% protein / 35% carb / 25% fat",
          detail: "High protein to preserve muscle, moderate carbs for training, strategic fat intake"
        },
        {
          title: "Nutrient Timing",
          description: "Carb periodization around training",
          detail: "Higher carbs pre/post workout, lower carbs on rest days"
        }
      ]
    },
    {
      category: "Training",
      items: [
        {
          title: "Resistance Focus",
          description: "Maintain 3-4x/week heavy compound movements",
          detail: "Critical for maintaining excellent RSMI and bone density scores"
        },
        {
          title: "Metabolic Work",
          description: "2-3x/week strategic HIIT",
          detail: "10-15 minute sessions targeting android fat mobilization"
        },
        {
          title: "Recovery",
          description: "24-36 hours between resistance sessions",
          detail: "Crucial for maintaining muscle mass during fat loss phase"
        }
      ]
    },
    {
      category: "Lifestyle",
      items: [
        {
          title: "Sleep Optimization",
          description: "7-8 hours prioritizing 10pm-6am window",
          detail: "Critical for cortisol management and abdominal fat reduction"
        },
        {
          title: "Stress Management",
          description: "Daily relaxation practice",
          detail: "Cortisol impact on android fat distribution"
        },
        {
          title: "Movement Pattern",
          description: "Hourly movement breaks",
          detail: "Frequent movement supports insulin sensitivity"
        }
      ]
    }
  ]

  return (
    <div className="container py-6">
      <PageHeader
        title="Joel's Profile"
        description="Personal metrics and optimization strategies"
        breadcrumbs={[
          { title: 'Profile', href: '/profile/joel' }
        ]}
      />
      
      <div className="flex gap-12 pt-6">
        {/* Sidebar Navigation */}
        <div className="w-64 hidden lg:block">
          <div className="sticky top-6">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <nav className="space-y-1">
                {sections.map(({ id, title }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={cn(
                      "block px-3 py-2 text-sm font-medium rounded-md hover:bg-muted transition-colors",
                      activeSection === id ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                  >
                    {title}
                  </a>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl space-y-12">
          {/* Personal Stats */}
          <section id="personal-stats" ref={setRef('personal-stats')}>
            <h2 className="text-2xl font-bold mb-6">Personal Stats</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Basic Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary flex-shrink-0" />
                    Basic Info
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid gap-3">
                    {Object.entries(personalStats).map(([key, value]) => {
                      if (typeof value === 'object') return null
                      return (
                        <div key={key} className="grid grid-cols-2 text-sm">
                          <dt className="font-medium capitalize">{key}:</dt>
                          <dd className="text-muted-foreground">{value}</dd>
                        </div>
                      )
                    })}
                    <div className="grid grid-cols-2 text-sm">
                      <dt className="font-medium">Experience:</dt>
                      <dd className="text-muted-foreground">
                        Lifting: {personalStats.experience.lifting}<br />
                        Cardio: {personalStats.experience.cardio}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Body Composition */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary flex-shrink-0" />
                    Body Composition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {Object.entries(currentMetrics).map(([key, value]) => (
                      <div key={key} className="border-b pb-2">
                        <div className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="text-lg font-semibold">{value}</div>
                        {key in targets && <div className="text-sm text-primary">Target: {targets[key as TargetKey]}</div>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Strength Foundation */}
          <section id="strength-foundation" ref={setRef('strength-foundation')}>
            <h2 className="text-2xl font-bold mb-6">Strength Foundation</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6 sm:grid-cols-3">
                  {strengthAreas.map((area) => (
                    <div key={area.title} className="space-y-2">
                      <div className="font-medium">{area.title}</div>
                      <div className="text-lg font-semibold text-primary">{area.metric}</div>
                      <div className="text-sm text-muted-foreground">{area.details}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Action Plan */}
          <section id="action-plan" ref={setRef('action-plan')}>
            <h2 className="text-2xl font-bold mb-6">Action Plan</h2>
            <div className="space-y-6">
              {actionPlan.map((section) => (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle>{section.category} Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {section.items.map((item) => (
                        <div key={item.title} className="border-b pb-2">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">{item.detail}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Progress Tracking */}
          <section id="progress-tracking" ref={setRef('progress-tracking')}>
            <h2 className="text-2xl font-bold mb-6">Progress Tracking</h2>
            <Card>
              <CardHeader>
                <CardTitle>Weekly Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Key Metrics</h3>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                      <li>Waist circumference (morning, relaxed)</li>
                      <li>Body weight (3x/week, same conditions)</li>
                      <li>Progress photos (weekly, same conditions)</li>
                      <li>Training performance metrics</li>
                      <li>Sleep quality score</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Target Rate of Change</h3>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                      <li>0.5-1% body weight per week</li>
                      <li>Maintain or increase lifting numbers</li>
                      <li>Reduce waist circumference while maintaining other measurements</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Nutrition Details */}
          <section id="nutrition-details" ref={setRef('nutrition-details')}>
            <h2 className="text-2xl font-bold mb-6">Nutrition Details</h2>
            <NutritionProfile />
          </section>
        </div>
      </div>
    </div>
  )
} 