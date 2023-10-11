'use client'

import { useEffect, useState } from "react";
import BasicFlow from "@/components/nodes/Flow";
import { useSearchParams } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Node,   
    Edge,
  } from "reactflow";
import { useToast } from "@/components/ui/use-toast";
import { nanoid } from "nanoid";

const Page =() => {
    const searchParams = useSearchParams()
    const explore =  searchParams.get("topic")
    const [initialNodes, setInitialNodes] = useState<Node[]|null>(null);
    const [initialEdges] = useState<Edge[]|[]>([]);
    const {toast} = useToast()
     
    useEffect(() => {

      const callExploreService = async(explore:string|null) => {

        const response = await fetch('/api/explore',{
            'method':'POST',
            'body' : JSON.stringify({explore}),
            'headers' :{
                'Content-Type' : 'application/json'
            }

        })
        const stream = response.body
        let chunkSize = 0
        const chunks:string[] = []
        
        function processStreamingData(stream:ReadableStream<Uint8Array>){
          const reader = stream.getReader()
          
          function processData({done, value}:{ done: boolean, value?: Uint8Array }){
              if(done){
                  console.log("Stream completed , current chunk size", chunkSize)
                  console.log(chunks)
                  if(chunks){
                      const completeResponse = chunks.join("")
                      console.log(`COMPLETED_RESPONSE : ${completeResponse}`)
                      
                      const _data = completeResponse.substring( completeResponse.indexOf("<data>")+6, completeResponse.indexOf("</data>"))
                      try {
                        const topics = JSON.parse(_data)
                        
                        const nodes:Node[] = []
                        topics.map((topic:any, index : number) =>
                            nodes.push(
                                {   
                                    id: nanoid(5),
                                    type: 'explorer',
                                    data: topic,
                                    position: { x: (index * 500) + 20 * (index + 1), y: 50 },
                                    //drag_handle: '.drag_handle'
                                })
                            )
                        if(nodes){
                          setInitialNodes(nodes)
                        }    
                        
                      }catch(error){
                        toast({
                          title: "Getting Explore data failed.",
                          variant: "destructive" ,
                          description: `${error}`,
                        })
                      }
                  }
                  return;                     
              }
              const text = new TextDecoder().decode(value)
              console.log('Received chunk' , text)
              chunks.push(text)
              chunkSize++;
              console.log("current chunk size : ", chunkSize)
              reader.read().then(processData)
          }

          reader.read().then(processData)
          console.log( chunks) 
          

      }

      if(stream != null){
        processStreamingData(stream)
      }
    
    }

      callExploreService(explore)

    },[explore, toast] )
    
    
    
    return (
    
    <section>
      <ScrollArea >
        <div className="h-[calc(100vh-80px)] w-full">
          {
            initialNodes ?
            <BasicFlow initialNodes={initialNodes} initialEdges={initialEdges} initialTitle={""} initialSummary={""} flowKey={""} mode="explore"/>
            
            :<div className="flex h-full w-full items-center justify-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <h4 className="font-mono text-sm font-bold">Exploring...</h4>
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          }
          
        </div>
      </ScrollArea>
     </section>
    )
}

export default Page ;