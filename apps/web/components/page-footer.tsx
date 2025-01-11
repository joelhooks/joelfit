import { AlertCircle } from 'lucide-react'

export function PageFooter() {
  return (
    <footer className="border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Numbers and calculations provided by an AI assistant. Double-check before relying on them.</span>
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} JoelFit
        </p>
      </div>
    </footer>
  )
} 