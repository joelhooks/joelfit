'use client'

import * as React from 'react'
import Link from "next/link"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { Dumbbell } from "lucide-react"
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
} from "@repo/ui"

export function SiteHeader() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isLoadingAuth = status === 'loading'
  const [imageError, setImageError] = React.useState(false)

  // Format Google avatar URL to use a larger size
  const avatarUrl = React.useMemo(() => {
    if (!session?.user?.image) return undefined
    if (session.user.image.includes('googleusercontent.com')) {
      return session.user.image.replace('s96-c', 's192-c')
    }
    return session.user.image
  }, [session?.user?.image])

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
              <DropdownMenuTrigger className="flex items-center gap-2">
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
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
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
        </div>
      </div>
    </header>
  )
} 