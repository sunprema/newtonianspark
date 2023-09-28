'use client'

import { useEffect, useState } from "react";
import BasicFlow from "@/components/nodes/Flow";
import { useSearchParams } from 'next/navigation'

import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Node,   
    Edge,
  } from "reactflow";
import { useToast } from "@/components/ui/use-toast";
import { Table } from "@/features/database_design/table_schema_types";

const Page =() => {
    const searchParams = useSearchParams()
    const explore =  searchParams.get("topic")
    const [initialNodes, setInitialNodes] = useState<Node[]|null>(null);
    const [initialEdges, setInitialEdges] = useState<Edge[]|null>(null);
    const {toast} = useToast()

    useEffect(() => {

      const callDDLService = async(explore:string|null) => {

        const response = await fetch('/api/ddl',{
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
                      const nodes:Node[] = []
                      const edges:Edge[] = []

                      try {
                        const output = JSON.parse(_data)
                        const {tables}:{tables:Table[]|undefined|null} = output

                        tables?.map((table, index) => {
                          //push all the nodes
                          
                          nodes.push(
                          {   
                              id: `table-${table.table_name}`,
                              type: 'table',
                              data: table,
                              position: { x: (index * 500) + 20 * (index + 1), y: 50 }
                          }
                          )
                          //push all the edges                          
                          table.columns?.map(( column) => {
                              if (column?.foreign_key != null){
                                  const foreignKeyData = column.foreign_key
                                  edges.push( {
                                      "id" : `edge-${table.table_name}-${column.name}`,
                                      "type" : "default",
                                      source:`table-${table.table_name}`,
                                      target:`table-${foreignKeyData.table_name}`,
                                      sourceHandle: `handle-${table.table_name}-${column.name}` ,
                                      targetHandle: `handle-${foreignKeyData.table_name}-${foreignKeyData.column}`,
                                      label: 'fk'
                  
                                  })
                              }            
                          })
                        })
                        if(nodes){
                            setInitialNodes(nodes)
                            if(edges){
                              setInitialEdges(edges)
                            }
                          }
                      }
                      catch(error){
                        toast({
                          title: "Getting Explore data failed.",
                          variant: "destructive" ,
                          description: `${error}`,
                        })
                      }
                      return; 
                  }                    
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

    callDDLService(explore)
    
  },[explore, toast])
    
  return (
    <section>
      <ScrollArea >
        <div className="h-[calc(100vh-80px)] w-full">
          {
            initialNodes && 
            <BasicFlow 
                initialNodes={initialNodes} 
                initialEdges={initialEdges ?? []} 
                initialTitle={"Database Design"} 
                initialSummary={""} 
                flowKey={""}
                mode="table"
            />
          }
          
        </div>
      </ScrollArea></section>
    )
}

export default Page ;