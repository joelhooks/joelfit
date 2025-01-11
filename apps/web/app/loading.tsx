export default function Loading() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  )
} 