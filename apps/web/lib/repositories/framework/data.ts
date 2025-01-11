import { type Framework } from './schema'

export const initialFramework: Omit<Framework, keyof { id: string; slug: string; createdAt: Date; updatedAt: Date }> = {
  weeklySchedule: {
    saturday: {
      title: "Planning & Shopping",
      tasks: [
        { task: "Inventory check", time: "30 min" },
        { task: "Shopping list creation", time: "15 min" },
        { task: "Grocery shopping", time: "1 hour" }
      ]
    },
    sunday: {
      title: "Prep Day",
      totalTime: "2.5-3 hours",
      waves: [
        {
          title: "Setup",
          time: "30 min",
          tasks: [
            "Preheat ovens to 425°F",
            "Clean workspace",
            "Label containers"
          ]
        },
        {
          title: "Wave 1",
          time: "30 min",
          tasks: [
            "Preheat ovens to 425°F",
            "Clean workspace",
            "Label containers",
            "Oven 1: Potatoes",
            "Oven 2: Chicken breasts",
            "Rice Cooker: Rice and quinoa",
            "Prep: Form turkey meatballs"
          ]
        },
        {
          title: "Wave 2",
          time: "30 min",
          tasks: [
            "Oven 1: Continue potatoes",
            "Oven 2: Turkey meatballs",
            "Monitor grains",
            "Begin vegetable prep"
          ]
        },
        {
          title: "Wave 3",
          time: "30 min",
          tasks: [
            "Oven 1: Roast vegetables",
            "Oven 2: Complete proteins",
            "Finish grains",
            "Prepare sauces"
          ]
        },
        {
          title: "Final Wave",
          time: "30 min",
          tasks: [
            "Assembly line container filling",
            "Cool items with fan",
            "Prepare breakfast jars",
            "Pack smoothie bags"
          ]
        }
      ]
    },
    wednesday: {
      title: "Mid-week Tasks",
      tasks: [
        { task: "Move Thursday/Friday meals from freezer to fridge", time: "5 min" },
        { task: "Quick container inventory", time: "10 min" }
      ]
    }
  },
  containers: {
    mainMeals: {
      sections: [
        { name: "Protein", capacity: "8oz" },
        { name: "Carb", capacity: "2 cups" },
        { name: "Vegetable", capacity: "2 cups" }
      ]
    },
    breakfast: {
      quantity: "5 jars per person",
      note: "Use plastic mason jar lids"
    },
    smoothies: {
      features: [
        "Flat bottom design",
        "Freezer-safe construction"
      ]
    },
    sauces: {
      type: "2oz portion cups with lids"
    }
  },
  storage: {
    fridge: [
      { shelf: "Top", contents: "Current day's meals" },
      { shelf: "Middle", contents: "Next day's meals" },
      { shelf: "Bottom", contents: "Day 3 meals" },
      { shelf: "Door", contents: "Sauces and snacks" }
    ],
    freezer: [
      "Thursday/Friday meals",
      "Emergency backup meals",
      "Smoothie packs"
    ]
  },
  scaling: {
    base: {
      servings: "1 person, 5 days",
      proteins: "8.25 lbs total",
      carbs: "10 cups cooked total",
      vegetables: "25 cups total",
      sauces: "10 2-tbsp servings"
    },
    multipliers: [
      { people: 2, factor: "1.75x", note: "accounting for shared prep efficiency" },
      { people: 3, factor: "2.5x" },
      { people: 4, factor: "3.25x" }
    ],
    timeAdjustments: {
      base: "2.5 hours",
      additional: "30 minutes per additional person",
      maximum: "4 people per prep session"
    }
  },
  troubleshooting: {
    foodSafety: [
      {
        issue: "Slow cooling",
        solution: "Use shallow containers, cooling fan"
      },
      {
        issue: "Temperature abuse",
        solution: "Set timers, use thermometer"
      }
    ],
    containers: [
      {
        issue: "Seal failure",
        solution: "Monthly testing, regular replacement"
      },
      {
        issue: "Staining",
        solution: "Immediate washing, baking soda paste"
      }
    ],
    quality: [
      {
        issue: "Dry proteins",
        solution: "Check internal temps, use sauce packets"
      },
      {
        issue: "Soggy vegetables",
        solution: "Separate containers, proper cooling"
      }
    ],
    timeManagement: [
      {
        issue: "Prep running long",
        solution: "Use parallel processing, prep containers first"
      },
      {
        issue: "Uneven cooking",
        solution: "Rotate pans, check oven temperature"
      }
    ]
  }
} 