import { type Repository } from '../types.js'
import { useRepositoryContext } from '../components/repository-provider.js'

export function useRepository<T>(key: string): Repository<T> {
  const { repositories } = useRepositoryContext()
  const repository = repositories.get(key)

  if (!repository) {
    throw new Error(`Repository with key "${key}" not found`)
  }

  return repository as Repository<T>
} 