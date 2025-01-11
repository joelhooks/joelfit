import { AlertCircle } from 'lucide-react'

export function AiDisclaimer() {
  return (
    <div className="text-xs text-muted-foreground border-t pt-4 mt-8">
      <p className="flex items-center gap-1.5">
        <AlertCircle className="h-3.5 w-3.5" />
        <span>Numbers and calculations provided by an AI assistant. Double-check before relying on them.</span>
      </p>
    </div>
  )
} 