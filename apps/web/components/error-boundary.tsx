'use client'

import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, info: ErrorInfo) => void
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  public render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (error) {
      return fallback || (
        <div className="p-4 rounded-lg border border-destructive bg-destructive/10 text-destructive">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm opacity-90">{error.message}</p>
        </div>
      )
    }

    return children
  }
} 