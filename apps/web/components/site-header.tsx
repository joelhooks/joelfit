'use client'

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  Text
} from "@repo/ui"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 items-center">
        <NavigationMenu className="w-full">
          <NavigationMenuList className="w-full justify-start gap-6">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-medium")}>
                  <Text>JoelFit</Text>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/shoulder" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-medium")}>
                  <Text>Shoulder</Text>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/eat" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-medium")}>
                  <Text>Eat</Text>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  )
} 