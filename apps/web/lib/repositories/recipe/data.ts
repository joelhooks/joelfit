import { type Recipe } from './schema'

export const recipeData: Recipe[] = [
  {
    id: '1',
    slug: 'meal-prep-turkey-meatballs',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "Meal Prep Turkey Meatballs",
    description: "Tender, flavorful meatballs perfect for weekly meal prep. Uses puréed onions and MSG for moisture and flavor.",
    category: 'proteins',
    prepTime: "30 minutes",
    cookTime: "25 minutes",
    restTime: "30 minutes",
    servings: "36 meatballs (6 servings)",
    equipment: [
      "Food processor",
      "2 large baking sheets",
      "Parchment paper",
      "Cookie scoop or portion scoop (2 tablespoon size)",
      "Large mixing bowl",
      "Instant-read thermometer"
    ],
    ingredients: [
      "3 pounds ground turkey (93% lean)",
      "2 medium onions, roughly chopped",
      "7 cloves garlic",
      "3 large eggs",
      "2 cups panko breadcrumbs",
      "¾ cup fresh parsley, roughly chopped",
      "1 tablespoon soy sauce",
      "1 teaspoon fennel pollen",
      "Calabrian chili flakes, to taste",
      "3 teaspoons Worcestershire sauce",
      "2 teaspoons smoked paprika",
      "1 tablespoon Italian seasoning",
      "1½ teaspoons salt",
      "1 teaspoon black pepper",
      "Zest of 1 lemon",
      "1 teaspoon MSG (optional but recommended)"
    ],
    method: [
      "Preheat oven to 400°F. Line two baking sheets with parchment paper.",
      "In a food processor, purée onions until they form a slurry, about 30 seconds. Add garlic and parsley, pulse until finely minced.",
      "In a large bowl, combine ground turkey, onion mixture, and eggs. Mix gently with your hands until just combined.",
      "Add remaining ingredients to the bowl. Mix until evenly distributed, being careful not to overwork the meat. The mixture should be quite moist but holdable.",
      "Cover and refrigerate 30 minutes to help the mixture set and make it easier to roll.",
      "Using wet hands and a portion scoop, form mixture into golf ball-sized meatballs (about 2 tablespoons each). Arrange on prepared baking sheets with space between each meatball.",
      "Bake 20-25 minutes, or until internal temperature reaches 165°F. For even browning, rotate pans halfway through if using multiple racks."
    ],
    mealPrepNotes: [
      "Cool meatballs completely before storing",
      "Portion 6 meatballs per meal prep container",
      "Refrigerate up to 5 days",
      "Freeze up to 3 months in airtight containers"
    ],
    proTips: [
      "MSG amplifies the meaty flavor without making things taste \"artificial\" - if you're new to using it, start with ½ teaspoon",
      "Use the pulse function when processing onions to avoid turning them into liquid",
      "The mixture will be quite wet - this is normal and helps keep the meatballs tender",
      "Make one test meatball before rolling the entire batch. If it falls apart while cooking, add more breadcrumbs ¼ cup at a time",
      "Position oven rack in upper third for better browning",
      "For food safety, always check that internal temperature reaches 165°F"
    ],
    servingSuggestions: [
      { title: "Classic", description: "with marinara over zucchini noodles" },
      { title: "Asian-style", description: "with teriyaki sauce over rice" },
      { title: "Mediterranean", description: "with tzatziki and Greek salad" },
      { title: "Sandwich", description: "on a roll with provolone and peppers" }
    ],
    nutrition: {
      calories: 250,
      protein: 28,
      carbs: 12,
      fat: 10
    }
  }
] 