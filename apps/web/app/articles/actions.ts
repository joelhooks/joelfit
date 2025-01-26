'use server'

import { z } from 'zod'
import { ArticleRepository } from '@/lib/repositories/article/repository'
import { articleCategorySchema, articleTagSchema } from '@/lib/repositories/article/schema'
import { scrapeUrl } from '../scrape/actions'
import { contentSchema } from '../scrape/schema'
import OpenAI from 'openai'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

const repository = new ArticleRepository()

export async function clearArticles() {
  await redis.del('articles')
}

export async function createFirstArticle() {
  await clearArticles()
  
  const content = `*This is a restructured version of the original article from [Westside Barbell](https://www.westside-barbell.com/blogs/the-blog/conjugate-system), rewritten for clarity and educational purposes.*

## What Is the Conjugate Method?
The Conjugate Method is a strength training system that combines two key approaches:
- Soviet-style training using varied special exercises to develop superior strength
- Bulgarian-style training incorporating frequent near-maximal lifting

## Core Principles

### 1. Exercise Rotation
- Regular rotation of core exercises to prevent accommodation (body getting too used to movements)
- Use of special exercises to perfect form and target weaknesses
- Implementation of different bars and variations to create different stimulus

### 2. Training Structure
The program is built around four main training days per week:
1. Max Effort Lower Body
2. Max Effort Upper Body
3. Dynamic Effort Lower Body
4. Dynamic Effort Upper Body

### 3. The Max Effort Method
- Work up to a 1-3 rep max on a main movement
- Change the main movement weekly
- Only 3 attempts at or above 90% to prevent burnout
- 72 hours rest between max effort and dynamic effort for the same body part

### 4. The Dynamic Effort Method
- Focus on explosive speed with submaximal weights
- Uses 3-week wave cycles for speed and explosive strength
- Maintains consistent rep schemes while varying bars/implements
- Emphasizes perfect technique and maximum acceleration

## Training Week Example
\`\`\`
Monday: Max Effort Lower Body
- Work up to max on squat variation or deadlift variation
- Follow with targeted assistance work

Wednesday: Max Effort Upper Body
- Work up to max on bench press variation
- Follow with targeted assistance work

Friday: Dynamic Effort Lower Body
- Speed work on squat/deadlift
- Percentage-based training with focus on acceleration
- Supplemental strength work

Sunday: Dynamic Effort Upper Body
- Speed bench press work
- Focus on explosive power
- Supplemental strength work
\`\`\`

## Key Programming Concepts

### Exercise Selection
- Main movements are rotated weekly
- Assistance exercises target specific weaknesses
- Special exercises develop overall strength
- Variety prevents accommodation while maintaining specificity

### Loading Parameters
- Max Effort: Work up to daily max (1-3 reps)
- Dynamic Effort Lower Body: 40-60% of max for multiple sets of 2-3 reps
- Dynamic Effort Upper Body: 40-55% of max for multiple sets of 3 reps
- Assistance Work: Varies based on individual needs and goals

### Recovery Management
- 72 hours between similar movement patterns
- Rotation of exercises reduces physical and mental fatigue
- Wave loading prevents burnout
- Individual daily maxes based on preparedness

## Benefits of the Conjugate Method
1. Continuous progress without plateaus
2. Reduced risk of burnout and overuse injuries
3. Development of multiple strength qualities simultaneously
4. Flexibility to adapt to individual needs and weaknesses
5. Year-round peak performance potential

## Common Implementation Mistakes
1. Too much volume on max effort days
2. Insufficient speed on dynamic effort work
3. Poor exercise rotation selection
4. Neglecting weak point training
5. Not following the 72-hour rule between similar movements

## Getting Started
1. Begin with basic movement patterns
2. Master technique before pursuing maximal weights
3. Start with conservative volume
4. Focus on quality movement and speed work
5. Gradually introduce special exercises
6. Keep detailed records of exercises and maxes

## Progress Tracking
- Record daily maxes on main movements
- Track bar speeds on dynamic effort work
- Monitor assistance exercise progression
- Note exercise variations and their effectiveness
- Regular assessment of weaknesses and improvements

The Conjugate Method is highly effective but requires attention to detail and proper implementation. Success comes from understanding and correctly applying its principles rather than blindly following templates.`

  const article = await repository.create({
    title: "Conjugate Method Explained",
    summary: "A restructured guide to Louie Simmons' Conjugate Method, combining Soviet and Bulgarian training approaches for maximal strength development.",
    content,
    category: "training_method",
    tags: ["powerlifting", "conjugate"],
    source: {
      url: "https://www.westside-barbell.com/blogs/the-blog/conjugate-system",
      author: "Joel Hooks",
      publishedAt: new Date()
    },
    relatedExercises: [],
    relatedMealPlans: []
  })

  return article
}

export async function createArticleFromUrl(
  url: string,
  category: z.infer<typeof articleCategorySchema>,
  tags: z.infer<typeof articleTagSchema>[]
) {
  const scrapedContent = await scrapeUrl(url)
  const content = contentSchema.parse(scrapedContent)
  
  const article = await repository.create({
    title: content.metadata.title,
    summary: content.metadata.summary,
    content: [
      content.introduction,
      ...content.mainPoints,
      ...content.sections.map(section => `## ${section.title}\n\n${section.content}`),
    ].join('\n\n'),
    category,
    tags,
    source: {
      url,
      author: content.metadata.author || 'Unknown'
    },
    relatedExercises: [],
    relatedMealPlans: []
  })

  await clearArticles()
  return article
} 