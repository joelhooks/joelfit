'use client'

import { useState } from 'react'
import { Button } from '@repo/ui'
import { articleCategorySchema, articleTagSchema } from '@/lib/repositories/article/schema'
import { createArticleFromUrl } from '../actions'
import { z } from 'zod'

export function ArticleFromUrlForm() {
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState<z.infer<typeof articleCategorySchema>>('training_method')
  const [tags, setTags] = useState<z.infer<typeof articleTagSchema>[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await createArticleFromUrl(url, category, tags)
      setUrl('')
      setTags([])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create article')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium mb-1">
          URL
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as z.infer<typeof articleCategorySchema>)}
          className="w-full px-3 py-2 border rounded-md"
        >
          {Object.values(articleCategorySchema.enum).map((cat) => (
            <option key={cat} value={cat}>
              {cat.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags</label>
        <div className="flex flex-wrap gap-2">
          {Object.values(articleTagSchema.enum).map((tag) => (
            <label key={tag} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={tags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTags([...tags, tag])
                  } else {
                    setTags(tags.filter((t) => t !== tag))
                  }
                }}
                className="mr-1"
              />
              <span className="text-sm">{tag.replace('_', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <Button type="submit" disabled={isLoading || !url || tags.length === 0}>
        {isLoading ? 'Creating...' : 'Create Article'}
      </Button>
    </form>
  )
} 