'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import sleep from "@/util/sleep";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import BasicFlow from "@/components/explorer/Flow";

const Page = () => {
    
    const [exploreTopic, setExploreTopic] = useState<string>("")

    const handleExplore = () => {
      alert(exploreTopic)
    }
    
    return (
    <section className="container flex flex-col gap-y-16">
      <div className="w-full mt-16 flex gap-x-4 ">
        <Input className="flex-1" onChange={ (e) => setExploreTopic(e.target.value) } placeholder="What do you want to Explore!" value={exploreTopic}/>
        <Button onClick={handleExplore}>Explore</Button>
      </div>

      <div className="w-full h-screen">
        <BasicFlow />
      </div>

      
    </section>

    )
}

export default Page ;