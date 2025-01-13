import {ArticleRepository} from '@/lib/repositories/article/repository'
import Link from 'next/link'
import {Badge} from '@repo/ui/components/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'

export default async function ArticlesPage() {
  const articleRepository = new ArticleRepository()
  const articles = await articleRepository.findAll()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const createdAt = new Date(article.createdAt)
          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="block transition-transform hover:scale-[1.02]"
            >
              <Card>
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="flex gap-2 text-sm">
                    <span>{article.source?.author}</span>
                    <span>•</span>
                    <time dateTime={createdAt.toISOString()}>
                      {createdAt.toLocaleDateString()}
                    </time>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {article.summary}
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 