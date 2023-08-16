'use client'
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button";


export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="flex px-4 h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 justify-center space-x-4">
          
          
          <Input className="w-[500px]" placeholder="What do you want to Explore!" />
          <Button onClick={()=> alert("Hi!")}>Explore</Button> 
          
        </div>

            <ThemeToggle />
          
        </div>
      
    </header>
  )
}