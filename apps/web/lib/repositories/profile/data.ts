import { type Profile } from './schema'

export const initialProfile: Omit<Profile, keyof { id: string; slug: string; createdAt: Date; updatedAt: Date }> = {
  name: 'Joel Hooks',
  metrics: {
    height: '6\'3" (75 inches)',
    weight: '251 lbs',
    age: 50,
    activity: 'moderately-active',
    exercise: '4-6 sessions per week',
    experience: {
      lifting: 'advanced',
      cardio: 'intermediate'
    },
    androidFat: 34.0,
    gynoidFat: 22.5,
    agRatio: 1.50,
    visceralFat: 3.08,
    totalBodyFat: 24.0,
    rsmi: 11.16
  },
  targets: {
    androidFat: 24.0,
    gynoidFat: 18.0,
    agRatio: 1.0,
    visceralFat: 2.0,
    totalBodyFat: 20.0,
    rsmi: 10.0
  },
  strengthAreas: [
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
  ],
  actionPlan: [
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
        }
      ]
    }
  ]
} 