import { BaseRepository } from '../base'
import { Article, articleSchema } from './schema'
import { slugify } from '@/lib/utils'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

const ARTICLES_KEY = 'articles'

export class ArticleRepository extends BaseRepository<Article, typeof articleSchema> {
  constructor() {
    super(articleSchema, 'Article')
  }

  protected async getData(): Promise<Article[]> {
    const data = await redis.get<Article[]>(ARTICLES_KEY)
    return data || []
  }

  protected async setData(data: Article[]): Promise<void> {
    await redis.set(ARTICLES_KEY, data)
  }

  public generateSlug(data: Omit<Article, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): string {
    return slugify(data.title)
  }

  // Additional methods specific to articles
  async findByCategory(category: Article['category']): Promise<Article[]> {
    const articles = await this.getData()
    return articles.filter(article => article.category === category)
  }

  async findByTag(tag: Article['tags'][number]): Promise<Article[]> {
    const articles = await this.getData()
    return articles.filter(article => article.tags.includes(tag))
  }

  async findRelatedToExercise(exerciseId: string): Promise<Article[]> {
    const articles = await this.getData()
    return articles.filter(article => article.relatedExercises.includes(exerciseId))
  }

  async findRelatedToMealPlan(mealPlanId: string): Promise<Article[]> {
    const articles = await this.getData()
    return articles.filter(article => article.relatedMealPlans.includes(mealPlanId))
  }
} 