'use client'

import Link from "next/link"
import { Dumbbell } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/ui"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <NavigationMenu className="mx-0 w-full [&>div]:w-full [&>div]:justify-start">
          <NavigationMenuList className="flex w-full justify-start space-x-8">
            <NavigationMenuItem className="flex-none">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                  <span className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5" />
                    <span>JoelFit</span>
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex-none">
              <Link href="/shoulder" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Shoulder
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="flex-none">
              <Link href="/eat" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Eat
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
} 