import { Skeleton } from '../ui/skeleton.js'

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-2 py-2">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 flex-1" />
    </div>
  )
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-1">
      {Array.from({ length: count }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  )
}

export function ListGroupSkeleton({ groups = 3, itemsPerGroup = 3 }: { groups?: number; itemsPerGroup?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: groups }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <ListSkeleton count={itemsPerGroup} />
        </div>
      ))}
    </div>
  )
} 