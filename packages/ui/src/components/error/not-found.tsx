import { type ReactNode } from 'react'

interface NotFoundProps {
  title?: string
  message?: string
  children?: ReactNode
}

export function NotFound({ 
  title = 'Not Found',
  message = 'The requested resource could not be found.',
  children 
}: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-4xl font-bold text-muted-foreground">404</div>
      <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      <p className="mb-4 text-muted-foreground">{message}</p>
      {children}
    </div>
  )
} 