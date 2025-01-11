'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { type Repository } from '../types.js'

interface RepositoryContextValue {
  repositories: Map<string, Repository<any>>
}

const RepositoryContext = createContext<RepositoryContextValue | null>(null)

interface RepositoryProviderProps {
  children: ReactNode
  repositories: Map<string, Repository<any>>
}

export function RepositoryProvider({ children, repositories }: RepositoryProviderProps) {
  return (
    <RepositoryContext.Provider value={{ repositories }}>
      {children}
    </RepositoryContext.Provider>
  )
}

export function useRepositoryContext() {
  const context = useContext(RepositoryContext)
  if (!context) {
    throw new Error('useRepositoryContext must be used within a RepositoryProvider')
  }
  return context
} 