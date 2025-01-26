import { type Framework } from './schema'

export const initialFramework: Omit<Framework, 'id' | 'slug' | 'createdAt' | 'updatedAt'> = {
  weeklySchedule: {
    saturday: {
      title: "Planning & Shopping",
      tasks: [
        { task: "Review meal plan", time: "30 min" },
        { task: "Make shopping list", time: "15 min" },
        { task: "Shop for ingredients", time: "1-2 hours" },
        { task: "Organize and store groceries", time: "30 min" }
      ]
    },
    sunday: {
      title: "Meal Prep Day",
      totalTime: "3-4 hours",
      waves: [
        {
          title: "Wave 1: Proteins",
          time: "60-90 min",
          tasks: [
            "Preheat oven to 400°F",
            "Season and prep proteins",
            "Cook proteins in batches",
            "Let proteins rest and cool"
          ]
        },
        {
          title: "Wave 2: Carbs & Vegetables",
          time: "45-60 min",
          tasks: [
            "Cook rice/quinoa/potatoes",
            "Roast vegetables",
            "Steam or blanch vegetables",
            "Let everything cool"
          ]
        },
        {
          title: "Wave 3: Assembly & Storage",
          time: "30-45 min",
          tasks: [
            "Portion proteins into containers",
            "Add carbs and vegetables",
            "Prepare smoothie bags",
            "Label everything with dates"
          ]
        }
      ]
    },
    wednesday: {
      title: "Mid-Week Check",
      tasks: [
        "Check food quality and freshness",
        "Rotate containers if needed",
        "Clean any empty containers",
        "Plan weekend shopping"
      ]
    }
  },
  storage: {
    fridge: [
      "Top shelf: Prepared meals for next 2-3 days",
      "Middle shelf: Raw ingredients and proteins",
      "Bottom shelf: Extra prepared meals",
      "Drawers: Fresh vegetables and fruits",
      "Door: Sauces and condiments"
    ],
    freezer: [
      "Top shelf: Smoothie bags",
      "Middle shelf: Extra prepared meals",
      "Bottom shelf: Raw proteins",
      "Door: Ice packs and frozen vegetables"
    ]
  },
  containers: {
    mainMeals: {
      sections: [
        "Proteins",
        "Carbs",
        "Vegetables"
      ]
    }
  },
  scaling: {
    "Single Person": [
      "Base recipe quantities",
      "5-7 meals per prep",
      "2-3 protein varieties",
      "Standard container sizes"
    ],
    "Couple": [
      "1.5-2x base quantities",
      "10-14 meals per prep",
      "3-4 protein varieties",
      "Additional containers needed"
    ],
    "Family": [
      "2.5-3x base quantities",
      "15-21 meals per prep",
      "4-5 protein varieties",
      "Larger container sizes"
    ]
  },
  troubleshooting: {
    "food-safety": [
      "Always cool food completely before storing",
      "Use containers within 4-5 days",
      "Keep fridge temperature at 40°F or below",
      "Don't stack containers until fully cooled"
    ],
    "container-issues": [
      "Check seals before each use",
      "Replace containers if damaged",
      "Don't overfill containers",
      "Allow proper ventilation when cooling"
    ],
    "quality-control": [
      "Rotate meals properly (FIFO)",
      "Store sauces separately",
      "Use vacuum seals for freezer meals",
      "Label everything with dates"
    ],
    "time-management": [
      "Prep ingredients before starting",
      "Clean as you go",
      "Use multiple cooking methods simultaneously",
      "Follow the wave system strictly"
    ]
  }
} 