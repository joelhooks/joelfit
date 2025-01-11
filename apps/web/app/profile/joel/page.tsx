import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { NutritionProfile } from '@/components/nutrition-profile'

export const metadata: Metadata = {
  title: "Joel's Profile | JoelFit",
  description: 'Personal metrics, DEXA analysis, and optimization strategies',
  openGraph: {
    title: "Joel's Profile | JoelFit",
    description: 'Personal metrics, DEXA analysis, and optimization strategies',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent("Joel's Profile")}&description=${encodeURIComponent('Personal metrics and optimization strategies')}`,
      width: 1200,
      height: 630,
      alt: "Joel's Profile"
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Joel's Profile | JoelFit",
    description: 'Personal metrics, DEXA analysis, and optimization strategies',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent("Joel's Profile")}&description=${encodeURIComponent('Personal metrics and optimization strategies')}`],
  }
}

type MetricKey = 'androidFat' | 'gynoidFat' | 'agRatio' | 'visceralFat' | 'totalBodyFat' | 'rsmi'
type TargetKey = 'androidFat' | 'agRatio' | 'visceralFat'

export default function JoelProfilePage() {
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
    <div className="container max-w-6xl py-6 space-y-12">
      <PageHeader
        title="Joel's Profile"
        description="Personal metrics and optimization strategies"
        breadcrumbs={[
          { title: 'Profile', href: '/profile/joel' }
        ]}
      />
      
      <div className="space-y-12 max-w-4xl mx-auto">
        {/* DEXA Analysis Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">DEXA Analysis</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Status & Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(currentMetrics).map(([key, value]) => (
                    <div key={key} className="p-2 bg-muted rounded">
                      <div className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="text-lg font-semibold">{value}</div>
                      {key in targets && <div className="text-sm text-primary">{targets[key as TargetKey]}</div>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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

            <Card>
              <CardHeader>
                <CardTitle>Progress Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">Key metrics to track weekly:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Waist circumference (morning, relaxed)</li>
                    <li>Body weight (3x/week, same conditions)</li>
                    <li>Progress photos (weekly, same conditions)</li>
                    <li>Training performance metrics</li>
                    <li>Sleep quality score</li>
                  </ul>
                  <p className="text-sm mt-4">Target rate of change:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>0.5-1% body weight per week</li>
                    <li>Maintain or increase lifting numbers</li>
                    <li>Reduce waist circumference while maintaining other measurements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Nutrition Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Nutrition Profile</h2>
          <NutritionProfile />
        </section>
      </div>
    </div>
  )
} 