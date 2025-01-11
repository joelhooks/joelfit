import { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import Link from 'next/link'
import { ArrowRight, UtensilsCrossed, Droplets, Leaf, BookOpen, Star, Clock, Timer, Flame, Users, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Base Recipes | High-Protein Meal Prep OS',
  description: 'Core recipes and variations for meal prep',
  openGraph: {
    title: 'Base Recipes | High-Protein Meal Prep OS',
    description: 'Core recipes and variations for meal prep',
    images: [{
      url: `https://www.joelfit.app/api/og?title=${encodeURIComponent('Base Recipes')}&description=${encodeURIComponent('Core recipes and variations for meal prep')}`,
      width: 1200,
      height: 630,
      alt: 'Base Recipes'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base Recipes | High-Protein Meal Prep OS',
    description: 'Core recipes and variations for meal prep',
    images: [`https://www.joelfit.app/api/og?title=${encodeURIComponent('Base Recipes')}&description=${encodeURIComponent('Core recipes and variations for meal prep')}`],
  }
}

const recipeCategories = [
  {
    title: "Proteins",
    description: "High-protein main components",
    icon: UtensilsCrossed,
    href: "/eat/recipes/proteins"
  },
  {
    title: "Sauces",
    description: "Flavor variations and combinations",
    icon: Droplets,
    href: "/eat/recipes/sauces"
  },
  {
    title: "Vegetables",
    description: "Veggie prep and seasoning",
    icon: Leaf,
    href: "/eat/recipes/vegetables"
  }
]

const featuredRecipe = {
  title: "Meal Prep Turkey Meatballs",
  description: "Tender, flavorful meatballs perfect for weekly meal prep. Uses puréed onions and MSG for moisture and flavor.",
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
  ]
}

export default function RecipesPage() {
  return (
    <main className="container py-6">
      <div className="max-w-3xl">
        <PageHeader
          title="Base Recipes"
          description="Core recipes and variations for meal prep"
          breadcrumbs={[
            { title: "Eat", href: "/eat" },
            { title: "Base Recipes", href: "/eat/recipes" }
          ]}
        />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
              Recipe Categories
            </h2>
            <div className="grid gap-4">
              {recipeCategories.map((category) => (
                <Link 
                  key={category.title}
                  href={category.href}
                  className="group bg-card border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <category.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary flex-shrink-0" />
              Featured Recipe
            </h2>
            <div className="bg-card border rounded-lg">
              <div className="aspect-video relative bg-muted rounded-t-lg">
                {/* Image placeholder for recipe photo */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  Recipe Photo (Coming Soon)
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-medium mb-2">{featuredRecipe.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{featuredRecipe.description}</p>

                <div className="grid gap-4 sm:grid-cols-2 mb-6">
                  <div className="bg-muted/50 rounded p-3">
                    <h4 className="font-medium mb-2">Time & Yield</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>Prep: {featuredRecipe.prepTime}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Timer className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>Rest: {featuredRecipe.restTime}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Flame className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>Cook: {featuredRecipe.cookTime}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>Makes: {featuredRecipe.servings}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-muted/50 rounded p-3">
                    <h4 className="font-medium mb-2">Equipment Needed</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {featuredRecipe.equipment.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Package className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-muted/50 rounded p-3">
                    <h4 className="font-medium mb-2">Ingredients</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {featuredRecipe.ingredients.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/50 rounded p-3">
                    <h4 className="font-medium mb-2">Method</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      {featuredRecipe.method.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="flex-shrink-0 font-medium">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="bg-muted/50 rounded p-3">
                    <h4 className="font-medium mb-2">Meal Prep Notes</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {featuredRecipe.mealPrepNotes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="flex-shrink-0">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/50 rounded p-3">
                    <h4 className="font-medium mb-2">Pro Tips</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {featuredRecipe.proTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="flex-shrink-0">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
} 