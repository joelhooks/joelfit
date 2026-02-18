import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://joel.fit'
  const routes = [
    '/',
    '/shoulder',
    '/eat',
    '/eat/framework',
    '/eat/meal-plan',
    '/eat/recipes',
    '/eat/shopping',
    '/eat/equipment',
    '/eat/preparation',
    '/eat/tracking',
    '/eat/recipes/vegetables',
    '/eat/recipes/proteins',
    '/eat/recipes/sauces',
    '/eat/recipes/vegetables/crispy-potatoes',
    '/eat/recipes/vegetables/frozen-guide',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }))
}
