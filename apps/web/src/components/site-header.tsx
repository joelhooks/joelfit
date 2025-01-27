'use client'

import * as React from 'react'
import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { Dumbbell, Menu } from "lucide-react"
import { navigationMenuTriggerStyle } from "@repo/ui"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Sheet,
  SheetTrigger,
  SheetContent,
  Button,
} from "@repo/ui"

export function SiteHeader() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isLoadingAuth = status === 'loading'
  const [imageError, setImageError] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  // Format Google avatar URL to use a larger size
  const avatarUrl = React.useMemo(() => {
    if (!session?.user?.image) return undefined
    if (session.user.image.includes('googleusercontent.com')) {
      return session.user.image.replace('s96-c', 's192-c')
    }
    return session.user.image
  }, [session?.user?.image])

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
          {isLoadingAuth ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          ) : !session?.user ? (
            <Link 
              href="/api/auth/signin"
              className={navigationMenuTriggerStyle()}
            >
              Sign In
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 p-0"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={!imageError ? avatarUrl : undefined}
                      onError={() => setImageError(true)}
                      alt={session.user.name || session.user.email || 'User avatar'} 
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {session.user.name?.[0] || session.user.email?.[0] || '?'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                sideOffset={8}
                className="w-[200px] fixed"
                style={{ position: 'fixed' }}
              >
                <DropdownMenuLabel className="truncate">
                  {session.user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-destructive focus:text-destructive"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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