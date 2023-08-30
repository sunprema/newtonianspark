'use client'

import { useEffect, useState } from "react";
import BasicFlow from "@/components/explorer/Flow";
import { useSearchParams } from 'next/navigation'

import axios from 'axios';

import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Node,   
    Edge,
  } from "reactflow";
import useDDLStore from "@/config/ddlStore";

const Page =() => {
    const searchParams = useSearchParams()
    const topic =  searchParams.get("topic")
    const [initialNodes, setInitialNodes] = useState<Node[]|null>(null);
    const [initialEdges, setInitialEdges] = useState<Edge[]|null>(null);
    const [error, setError] = useState(null);
    const [aiResponse, setAiResponses] = useState([]);
    const setAIResponses = useDDLStore( (state) => state.setAIResponses)

     
    useEffect(() => {

      const callExploreService = async(topic:string|null) => {
        const response = await axios.post("/api/ddl", {explore:topic})
        const {nodes,edges,ai_response, error} = response.data ; //ai_response will be used as context.
        if (error != null){
          setError(error)
        }else{
          setInitialNodes(nodes)
          setInitialEdges(edges)
          setAIResponses(ai_response)
          
        }
      }
      callExploreService(topic)

    },[topic] )
    
    if(error){
      return <h1> Error : {error} </h1>
    }
    
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
            />
          }
          
        </div>
      </ScrollArea></section>
    )
}

export default Page ;