'use client'

import { siteConfig } from "@/config/site"

import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full rounded-none border-b bg-slate-200 shadow-lg dark:bg-slate-800">
      <div className="flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
          <ThemeToggle />
        </div>
    </header>
  )
}