import { type ShoppingList } from './schema'

export const initialShoppingList: Omit<ShoppingList, keyof { id: string; slug: string; createdAt: Date; updatedAt: Date }> = {
  name: "Joel's Shopping List",
  weeklyItems: {
    meat: [
      "4 lbs chicken breast",
      "3 lbs ground turkey",
      "2 lbs white fish"
    ],
    dairy: [
      "Greek yogurt (32 oz)",
      "Almond milk (1 gallon)"
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
  },
  lastUpdated: new Date()
} 