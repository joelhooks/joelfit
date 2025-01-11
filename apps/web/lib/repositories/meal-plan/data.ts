import { type MealPlan } from './schema'

export const initialMealPlan: Omit<MealPlan, keyof { id: string; slug: string; createdAt: Date; updatedAt: Date }> = {
  name: "Joel's Meal Plan",
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
  portions: {
    protein: "6-8 oz per main meal",
    carbs: "1.5-2 cups per main meal",
    vegetables: "2 cups per main meal",
    fats: "1-1.5 tbsp per main meal"
  },
  weeklyPrep: {
    proteins: [
      "1.5 lbs chicken",
      "1.25 lbs turkey",
      "1.4 lbs fish"
    ],
    carbs: [
      "2.5 cups dry rice",
      "1.25 lbs potatoes",
      "1.25 cups dry quinoa"
    ],
    vegetables: [
      "4 cups leafy greens",
      "4 cups cruciferous",
      "4 cups mixed vegetables"
    ],
    sauces: [
      "Lemon herb marinade",
      "Teriyaki glaze",
      "Greek yogurt dressing"
    ]
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