'use client'

import {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useRouter} from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function IndexPage() {

  const [exploreTopic, setExploreTopic] = useState("")
  const router = useRouter()

  const handleSubmit = () => {
    router.push(`/ddl?topic=${encodeURIComponent(exploreTopic)}`)
  }

  return (
    
    <>
    <div className="flex-1">
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Design database schema...with plain English.
          <br className="hidden sm:inline" />          
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">        
        Exciting world of possibilities, enabled by LLM.
        </p>
      </div>
    </section>
    
    <section className="container mx-auto flex items-center justify-center">  
      <div className="flex h-[calc(100vh/3)]  w-full items-center justify-center ">
      <div className="flex">
        <div className="flex flex-col  space-y-5 items-start ">
          <Label htmlFor='database_desc'>Describe your database requirements.</Label>
          <Textarea id="database_desc" className="w-full sm:w-[800px]" placeholder="Detailed database instructions" value={exploreTopic} onChange={(e) => setExploreTopic(e.target.value) } rows={5} />
          <Button onClick={handleSubmit} className="self-end">Design</Button>           
        </div>        
      </div>
      </div>
    </section>
    
    </div>
    </>
    
  )
}