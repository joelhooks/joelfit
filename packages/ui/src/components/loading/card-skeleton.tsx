import { Skeleton } from '../ui/skeleton.js'

export function CardSkeleton() {
  return (
    <div className="p-4 rounded-lg border">
      <div className="flex justify-between items-start mb-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-full mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

export function CardGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
} 