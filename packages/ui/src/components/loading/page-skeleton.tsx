import { Skeleton } from '../ui/skeleton.js'

export function PageSkeleton() {
  return (
    <div className="container py-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2 mb-8">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Content */}
      <div className="grid gap-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-32 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
} 