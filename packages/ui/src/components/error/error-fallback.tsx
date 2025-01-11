import { type ReactNode } from 'react'
import { Button } from '../ui/button.js'

interface ErrorFallbackProps {
  title?: string
  error?: Error
  resetErrorBoundary?: () => void
  children?: ReactNode
}

export function ErrorFallback({
  title = 'Something went wrong',
  error,
  resetErrorBoundary,
  children
}: ErrorFallbackProps) {
  return (
    <div className="p-4 rounded-lg border border-destructive bg-destructive/10">
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-semibold text-destructive mb-2">{title}</h2>
          {error && (
            <p className="text-sm text-destructive/90">{error.message}</p>
          )}
        </div>
        
        {resetErrorBoundary && (
          <Button 
            variant="outline" 
            onClick={resetErrorBoundary}
            className="w-fit"
          >
            Try again
          </Button>
        )}
        
        {children}
      </div>
    </div>
  )
} 