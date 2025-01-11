'use client'

import { type ReactNode } from 'react'
import { ErrorFallback } from '@repo/ui'

interface AsyncDataProps<T> {
  data: T | null
  error?: Error
  isLoading: boolean
  children: (data: T) => ReactNode
  loadingFallback?: ReactNode
  errorFallback?: ReactNode
}

export function AsyncData<T>({
  data,
  error,
  isLoading,
  children,
  loadingFallback,
  errorFallback = <ErrorFallback title="Something went wrong" error={error} />
}: AsyncDataProps<T>) {
  if (isLoading) {
    return loadingFallback
  }

  if (error) {
    return errorFallback
  }

  if (!data) {
    return null
  }

  return children(data)
} 