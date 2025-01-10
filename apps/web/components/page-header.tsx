import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface Breadcrumb {
  title: string
  href: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  className?: string
}

export function PageHeader({ 
  title, 
  description, 
  breadcrumbs,
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      {breadcrumbs && (
        <nav className="flex items-center text-sm text-muted-foreground mb-2">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link 
                href="/" 
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                <ChevronRight className="h-4 w-4" />
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-foreground">{crumb.title}</span>
                ) : (
                  <Link 
                    href={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.title}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground mt-2">
          {description}
        </p>
      )}
    </div>
  )
} 