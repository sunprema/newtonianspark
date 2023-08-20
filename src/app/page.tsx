'use client'

import {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useRouter} from 'next/navigation'

export default function IndexPage() {

  const [exploreTopic, setExploreTopic] = useState("")
  const router = useRouter()

  const handleSubmit = () => {
    router.push(`/explore?topic=${encodeURIComponent(exploreTopic)}`)
  }

  return (
    
    <>
    <div className="flex-1">
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Exciting world of possibilities, enabled by LLM.
          <br className="hidden sm:inline" />
          
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">
        Explore the topics you always wanted to learn.
        </p>
      </div>
    </section>
    
    <section className="container mx-auto flex items-center justify-center">  
      <div className="flex h-[calc(100vh/3)]  w-full items-center justify-center ">
      <div className="flex">
        <div className="flex flex-col  space-x-4 space-y-5 sm:flex-row sm:space-y-0">
          <Input className="w-full sm:w-[500px]" placeholder="What do you want to Explore!" value={exploreTopic} onChange={(e) => setExploreTopic(e.target.value) } />
          <Button onClick={handleSubmit}>Explore</Button>           
        </div>        
      </div>
      </div>
    </section>

    </div>
    </>
    
  )
}