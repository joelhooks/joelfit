import { type Profile } from './schema'

export const initialProfile: Profile = {
  id: 'joel-hooks',
  slug: 'joel-hooks',
  name: 'Joel Hooks',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
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
  ],
  mealPlanId: 'joel-hooks',
  /** @deprecated Use mealPlanId instead */
  nutritionProfile: {
    targets: {
      calories: '2650',
      protein: '180-200g (35-40%)',
      carbs: '250-275g (40-45%)',
      fat: '65-75g (25-30%)'
    },
    meals: [
      {
        name: 'Breakfast (A)',
        time: '7:00 AM',
        calories: 400,
        protein: 30,
        carbs: 45,
        fat: 15,
        container: 'Mason jar'
      },
      {
        name: 'Post-Workout Smoothie (B)',
        time: '9:30 AM',
        calories: 250,
        protein: 30,
        carbs: 25,
        fat: 8,
        container: 'Smoothie cup'
      },
      {
        name: 'Lunch (C)',
        time: '11:30 AM',
        calories: 650,
        protein: 45,
        carbs: 75,
        fat: 20,
        container: '3-comp glass'
      },
      {
        name: 'Mid-day Meal (D)',
        time: '3:00 PM',
        calories: 550,
        protein: 35,
        carbs: 55,
        fat: 20,
        container: '3-comp glass'
      },
      {
        name: 'Dinner (E)',
        time: '7:00 PM',
        calories: 400,
        protein: 25,
        carbs: 35,
        fat: 13,
        container: '3-comp glass'
      },
      {
        name: 'Night Snack (F)',
        time: '9:00 PM',
        calories: 200,
        protein: 15,
        carbs: 20,
        fat: 7,
        container: 'Small glass'
      }
    ],
    portions: {
      protein: '6-8 oz per main meal',
      carbs: '1.5-2 cups per main meal',
      vegetables: '2 cups per main meal',
      fats: '1-1.5 tbsp per main meal'
    },
    weeklyPrep: {
      proteins: [
        '1.5 lbs chicken',
        '1.25 lbs turkey',
        '1.4 lbs fish'
      ],
      carbs: [
        '2.5 cups dry rice',
        '1.25 lbs potatoes',
        '1.25 cups dry quinoa'
      ],
      vegetables: [
        '4 cups leafy greens',
        '4 cups cruciferous',
        '4 cups mixed vegetables'
      ],
      sauces: [
        'Lemon herb marinade',
        'Teriyaki glaze',
        'Greek yogurt dressing'
      ]
    }
  }
} 