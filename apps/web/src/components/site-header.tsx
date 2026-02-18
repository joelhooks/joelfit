'use client'

import * as React from 'react'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Dumbbell, Menu } from "lucide-react"
import { navigationMenuTriggerStyle } from "@repo/ui"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  Button,
} from "@repo/ui"

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  const navItems = [
    { href: '/shoulder', label: 'Shoulder' },
    { href: '/eat', label: 'Eat' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
            <span className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5" />
              <span>JoelFit</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={navigationMenuTriggerStyle()}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-2 py-1 text-lg hover:underline",
                      pathname === item.href && "font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 
