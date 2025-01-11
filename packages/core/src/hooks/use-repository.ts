'use client'

import { type Repository, type Entity } from '../types.js'
import { useRepositoryContext } from '../components/repository-provider.js'

export function useRepository<T extends Entity>(key: string): Repository<T> {
  const context = useRepositoryContext()
  const repository = context.repositories.get(key) as Repository<T>

  if (!repository) {
    throw new Error(`Repository with key "${key}" not found`)
  }

  return repository
} 