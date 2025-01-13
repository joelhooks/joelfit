import {ArticleRepository} from '@/lib/repositories/article/repository'
import {MDXRemote} from 'next-mdx-remote/rsc'
import {notFound} from 'next/navigation'
import {Badge} from '@repo/ui/components/badge'

interface PageProps {
  params: Promise<{slug: string}> | {slug: string}
}

export default async function ArticlePage({params}: PageProps) {
  const {slug} = await params
  const articleRepository = new ArticleRepository()
  const article = await articleRepository.findBySlug(slug)

  if (!article) {
    notFound()
  }

  const createdAt = new Date(article.createdAt)

  return (
    <div className="container mx-auto py-10">
      <article>
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            <Badge variant="outline">{article.category}</Badge>
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{article.summary}</p>
          <div className="flex gap-2 text-sm text-muted-foreground">
            <span>By {article.source?.author}</span>
            <span>•</span>
            <time dateTime={createdAt.toISOString()}>
              {createdAt.toLocaleDateString()}
            </time>
          </div>
        </header>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote source={article.content} />
        </div>
      </article>
    </div>
  )
} 