import { type Preparation } from './schema'

export const preparationData: Preparation[] = [
  {
    id: '1',
    slug: 'weekly-prep',
    createdAt: new Date(),
    updatedAt: new Date(),
    weeklyTimeline: [
      {
        day: "Saturday",
        title: "Planning & Shopping",
        tasks: [
          { task: "Review meal plan for the week", time: "15 min" },
          { task: "Check inventory and make shopping list", time: "10 min" },
          { task: "Shop for ingredients", time: "45-60 min" },
          { task: "Organize and store groceries", time: "15 min" }
        ]
      },
      {
        day: "Sunday",
        title: "Main Prep Session",
        totalTime: "2-3 hours",
        waves: [
          {
            title: "Wave 1: Setup",
            time: "15 min",
            tasks: [
              "Label all containers",
              "Organize workspace",
              "Preheat oven to 400°F",
              "Start rice cooker"
            ]
          },
          {
            title: "Wave 2: Proteins",
            time: "45 min",
            tasks: [
              "Season and prep all proteins",
              "Start chicken in oven",
              "Begin fish on stovetop",
              "Prep turkey for cooking"
            ]
          },
          {
            title: "Wave 3: Vegetables",
            time: "30 min",
            tasks: [
              "Steam frozen vegetables",
              "Portion into containers",
              "Cool and store properly"
            ]
          },
          {
            title: "Wave 4: Assembly",
            time: "45 min",
            tasks: [
              "Portion proteins into containers",
              "Add rice and vegetables",
              "Pack breakfast items",
              "Prepare smoothie bags"
            ]
          },
          {
            title: "Wave 5: Cleanup",
            time: "15 min",
            tasks: [
              "Clean all surfaces",
              "Store containers properly",
              "Take out trash",
              "Final organization"
            ]
          }
        ]
      },
      {
        day: "Wednesday",
        title: "Mid-Week Check",
        tasks: [
          { task: "Move Thursday meals to fridge", time: "5 min" },
          { task: "Check food quality", time: "5 min" },
          { task: "Adjust portions if needed", time: "10 min" }
        ]
      }
    ],
    tips: {
      efficiency: [
        "Label containers before starting",
        "Use multiple timers for different items",
        "Clean as you go",
        "Prep all ingredients before cooking"
      ],
      quality: [
        "Use meat thermometer for proteins",
        "Cool items quickly with fan",
        "Store sauces separately",
        "Rotate freezer meals properly"
      ]
    }
  }
] 