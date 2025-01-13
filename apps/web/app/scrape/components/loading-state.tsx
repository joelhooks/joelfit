import { Card } from '@repo/ui'

export function LoadingState({ progress }: { progress: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
        <p className="ml-2 font-mono text-sm text-muted-foreground">{progress}</p>
      </div>
    </Card>
  )
} 