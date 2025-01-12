'use client'

import Link from "next/link"
import { Dumbbell } from "lucide-react"
import { navigationMenuTriggerStyle } from "@repo/ui"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center justify-between">
        <nav className="flex items-center gap-6">
          <Link href="/" className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
            <span className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              <span>JoelFit</span>
            </span>
          </Link>
          <Link href="/shoulder" className={navigationMenuTriggerStyle()}>
            Shoulder
          </Link>
          <Link href="/eat" className={navigationMenuTriggerStyle()}>
            Eat
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
} 