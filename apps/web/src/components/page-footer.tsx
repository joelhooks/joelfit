import { AlertCircle } from 'lucide-react'
import { GitHubIcon } from './icons/github'

export function PageFooter() {
  return (
    <footer className="border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-start">
          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary" />
            <span>Numbers and calculations provided by an AI assistant. Double-check before relying on them.</span>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/joelhooks/joelfit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="View source on GitHub"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} JoelFit
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 