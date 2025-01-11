import { cn } from '../../lib/utils.js'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-muted animate-pulse rounded', className)}
      {...props}
    />
  )
}

export { Skeleton }
