'use client'

import {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'

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
          Hi there!, Design your database using AI.
          <br className="hidden sm:inline" />          
        </h1>
        <p className="text-muted-foreground max-w-[700px] text-lg">        
        Provide your db requirements and create database models.
        </p>
      </div>
    </section>
    
    <section className="container mx-auto flex items-center justify-center">  
      <div className="flex h-[calc(100vh/3)]  w-full items-center justify-center ">
      
        <div className="flex flex-col space-y-2 ">
          <Textarea 
             className="w-full sm:w-[500px]" 
             placeholder="Please provide specific instructions for creating your database design." 
             value={exploreTopic} 
             onChange={(e) => setExploreTopic(e.target.value) } />
          <Button onClick={handleSubmit}>Design my database</Button>           
        </div>        
      </div>    
      
    </section>

    
    
    
    </div>
    </>
    
  )
}