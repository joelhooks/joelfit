import { type ReactNode } from 'react'
import { ErrorFallback, type ErrorFallbackProps } from '@repo/ui'

interface AsyncDataProps<T> {
  data: T | undefined
  error?: Error
  isLoading: boolean
  children: (data: T) => ReactNode
  loadingFallback?: ReactNode
  errorFallback?: ReactNode | ((props: ErrorFallbackProps) => ReactNode)
}

export function AsyncData<T>({
  data,
  error,
  isLoading,
  children,
  loadingFallback,
  errorFallback
}: AsyncDataProps<T>) {
  if (isLoading) {
    return loadingFallback || null
  }

  if (error) {
    if (typeof errorFallback === 'function') {
      return errorFallback({ error }) as ReactNode
    }
    return errorFallback || <ErrorFallback error={error} />
  }

  if (!data) {
    return null
  }

  return children(data)
} 