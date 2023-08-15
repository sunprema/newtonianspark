'use client'

import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import sleep from "@/util/sleep";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import BasicFlow from "@/components/explorer/Flow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import axios from 'axios';
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area"

const Page = () => {
    
    const [exploreTopic, setExploreTopic] = useState<string>("")
    const [rawDataJson, setRawDataJson] = useState<string>("");

    const handleExplore = async() => {
      
      const response = await axios.post("/api/explore", {explore:exploreTopic})
      setRawDataJson( JSON.stringify(response, null, 2))

    }
    
    return (
    <section className="container flex flex-col gap-y-8">
      <div className="w-full mt-8 flex gap-x-4 ">
        <Input className="flex-1" onChange={ (e) => setExploreTopic(e.target.value) } placeholder="What do you want to Explore!" value={exploreTopic}/>
        <Button onClick={handleExplore}>Explore</Button>        

      </div>

      
      <Tabs defaultValue="explore" className="w-full mx-auto">
      
        <TabsList className="mx-auto">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="rawdata">RawData</TabsTrigger>
        </TabsList>
  
        <TabsContent value="explore">
          <ScrollArea className="h-screen" >
          <div className="w-full h-[calc(100vh-150px)]">
          <BasicFlow />
          </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="rawdata">
          <Textarea value={rawDataJson} readOnly className="h-[calc(100vh-150px)]"/>
        </TabsContent>
    </Tabs>
    

       
      

      
    </section>

    )
}

export default Page ;