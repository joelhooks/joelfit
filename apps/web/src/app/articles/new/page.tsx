import { ArticleFromUrlForm } from '../components/article-from-url-form'

export default function NewArticlePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Article</h1>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <ArticleFromUrlForm />
        </div>
      </div>
    </div>
  )
} 