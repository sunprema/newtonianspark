'use client'

import { siteConfig } from "@/config/site"

import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
          <ThemeToggle />
        </div>
    </header>
  )
}