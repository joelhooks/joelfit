import { type PersonalStats, type Metrics, type Targets, type StrengthArea, type ActionPlan, type NutritionProfile, type ShoppingList, type MealPlan } from '../types/metrics'

export const personalStats: PersonalStats = {
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

export const currentMetrics: Metrics = {
  androidFat: 34.0,
  gynoidFat: 22.5,
  agRatio: 1.50,
  visceralFat: 3.08,
  totalBodyFat: 24.0,
  rsmi: 11.16
}

export const targets: Targets = {
  androidFat: 24.0,
  gynoidFat: 18.0,
  agRatio: 1.0,
  visceralFat: 2.0,
  totalBodyFat: 20.0,
  rsmi: 10.0
}

export const strengthAreas: StrengthArea[] = [
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

export const actionPlan: ActionPlan[] = [
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

export const nutritionProfile: NutritionProfile = {
  targets: {
    calories: '2250-2500',
    protein: '200-220g (35-40%)',
    carbs: '225-250g (40-45%)',
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
      container: '16oz mason jar'
    },
    {
      name: 'Lunch (C)',
      time: '11:30 AM',
      calories: 650,
      protein: 45,
      carbs: 75,
      fat: 20,
      container: '34oz 3-compartment'
    },
    {
      name: 'Mid-day Meal (D)',
      time: '3:00 PM',
      calories: 550,
      protein: 35,
      carbs: 55,
      fat: 20,
      container: '34oz 3-compartment'
    },
    {
      name: 'Dinner (E)',
      time: '7:00 PM',
      calories: 400,
      protein: 25,
      carbs: 35,
      fat: 13,
      container: '34oz 3-compartment'
    },
    {
      name: 'Night Snack (F)',
      time: '9:00 PM',
      calories: 200,
      protein: 15,
      carbs: 20,
      fat: 7,
      container: '8oz container'
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

export const shoppingList: ShoppingList = {
  weeklyItems: {
    meat: [
      "4 lbs chicken breast",
      "3 lbs ground turkey",
      "2 lbs white fish"
    ],
    dairy: [
      "Greek yogurt (32 oz)"
    ],
    produce: [
      "Bananas",
      "Mixed berries",
      "Lemons",
      "Fresh herbs"
    ],
    frozen: [
      "Broccoli & cauliflower (4 lbs)",
      "Mixed vegetables (4 lbs)",
      "Mixed berries (2 lbs)"
    ],
    bulk: [
      "Rice (5 lbs)",
      "Quinoa (2 lbs)",
      "Potatoes (3 lbs)",
      "Oats (3 lbs)"
    ]
  },
  pantryStaples: {
    oils: [
      "Olive oil (16 oz)",
      "MCT oil (8 oz)",
      "Coconut oil (8 oz)",
      "Rice vinegar (16 oz)"
    ],
    seasonings: [
      "MSG (4 oz)",
      "Garlic powder",
      "Black pepper",
      "Kosher salt",
      "Red pepper flakes"
    ],
    sauces: [
      "Soy sauce (16 oz)",
      "Hot sauce",
      "Fish sauce",
      "Oyster sauce"
    ],
    dryGoods: [
      "Protein powder",
      "Creatine",
      "Rice cakes",
      "Chia seeds"
    ]
  },
  tips: {
    buying: [
      "Buy meat in bulk when on sale",
      "Check frozen section for deals",
      "Compare unit prices",
      "Buy seasonal produce"
    ],
    storage: [
      "Portion meat before freezing",
      "Use airtight containers",
      "Label everything with dates",
      "Rotate stock regularly"
    ]
  }
}

export const mealPlan: MealPlan = {
  calories: 2400,
  timeline: [
    { time: "7:00 AM", slot: "A", meal: "Breakfast", calories: 400, protein: 30, carbs: 45, fat: 15, container: "Mason jar" },
    { time: "11:30 AM", slot: "C", meal: "Lunch", calories: 650, protein: 45, carbs: 75, fat: 20, container: "3-comp glass" },
    { time: "3:00 PM", slot: "D", meal: "Mid-day Meal", calories: 550, protein: 35, carbs: 55, fat: 20, container: "3-comp glass" },
    { time: "7:00 PM", slot: "E", meal: "Dinner", calories: 400, protein: 25, carbs: 35, fat: 13, container: "3-comp glass" },
    { time: "9:00 PM", slot: "F", meal: "Night Snack", calories: 200, protein: 15, carbs: 20, fat: 7, container: "Small glass" }
  ],
  mealStructure: {
    breakfast: {
      title: "A: Breakfast (400 cal)",
      items: [
        "¾ cup oats (150 cal, 27g C)",
        "1 scoop protein powder (120 cal, 24g P)",
        "1 tbsp nut butter (98 cal, 8g F)",
        "½ banana (52 cal, 13g C)"
      ]
    },
    lunch: {
      title: "C: Lunch (650 cal)",
      items: [
        "8oz lean protein (240 cal, 45g P)",
        "2 cups complex carb (240 cal, 60g C)",
        "2 cups vegetables (80 cal, 16g C)",
        "1.5 tbsp healthy fats (180 cal, 18g F)",
        "Sauce (30 cal, 2g F)"
      ]
    },
    midDay: {
      title: "D: Mid-day Meal (550 cal)",
      items: [
        "6oz lean protein (180 cal, 35g P)",
        "1.5 cups complex carb (180 cal, 45g C)",
        "2 cups vegetables (80 cal, 16g C)",
        "1.5 tbsp healthy fats (180 cal, 18g F)",
        "Sauce (20 cal, 2g F)"
      ]
    },
    dinner: {
      title: "E: Dinner (400 cal)",
      items: [
        "4oz lean protein (120 cal, 24g P)",
        "1 cup complex carb (120 cal, 30g C)",
        "2 cups vegetables (80 cal, 15g C)",
        "¾ tbsp healthy fats (90 cal, 10g F)",
        "Sauce (30 cal, 3g F)"
      ]
    },
    nightSnack: {
      title: "F: Night Snack (200 cal)",
      items: [
        "¾ cup Greek yogurt (100 cal, 15g P)",
        "½ cup mixed berries (40 cal, 10g C)",
        "1 tsp honey (20 cal, 5g C)",
        "¼ tbsp nut butter (40 cal, 4g F)"
      ]
    }
  },
  emergencyBackup: {
    items: [
      "Protein bars (30g protein, <300 cal)",
      "Frozen turkey meatballs (6 per serving)",
      "Pre-cooked rice cups",
      "Frozen vegetable bags (single serve)",
      "Protein shakes (ready to drink)",
      "Greek yogurt cups (0% fat)",
      "Tuna packets in water"
    ]
  }
} 