'use client'

import { useEffect, useState } from "react";
import BasicFlow from "@/components/explorer/Flow";
import { useSearchParams } from 'next/navigation'

import axios from 'axios';

import { ScrollArea } from "@/components/ui/scroll-area"
import ReactFlow, {
    Node,
    addEdge,
    Background,
    MiniMap,
    Controls,
    Edge,
    Connection,
    useNodesState,
    useEdgesState
  } from "reactflow";

  const sampleNodes: Node[] = [
    {
      id: "4",
      type: "tableNode",
      data: { label: "Custom Node", topic: "Laws of Thermodynamics", summary: "This is the summary" },
      position: { x: 400, y: 200 }
    },
    {
      id: "5",
      type: "tableNode",
      data: { label: "Custom Node", topic: "Laws of Thermodynamics", summary: "This is the summary" },
      position: { x: 500, y: 200 }
    }
  ];
  
  const sampleEdges: Edge[] = [
    { id: "e4-5", source: "4", target: "5", animated: true },    
  ];
  
  


const Page =() => {
    const searchParams = useSearchParams()
    const topic =  searchParams.get("topic")
    const [initialNodes, setInitialNodes] = useState<Node[]|null>(null);
    const [initialEdges, setInitialEdges] = useState<Edge[]|[]>([]);
    const [error, setError] = useState(null);

     
    useEffect(() => {

      const callExploreService = async(topic:string|null) => {
        const response = await axios.post("/api/explore", {explore:topic})
        const {nodes,error} = response.data
        
        if (error != null){
          setError(error)
        }else{
          setInitialNodes(nodes)
          setInitialEdges([])
        }
      }
      callExploreService(topic)

    },[topic] )
    
    if(error){
      return <h1> Error : {error} </h1>
    }
    

    /*
    useEffect(() => {

      setInitialNodes(sampleNodes)
      setInitialEdges(sampleEdges)
      setError(null)

    },[topic])
    */

    return (
    <section>
      <ScrollArea >
        <div className="h-[calc(100vh-80px)] w-full">
          {
            initialNodes && <BasicFlow initialNodes={initialNodes} initialEdges={initialEdges} initialTitle={""} initialSummary={""} flowKey={""} flowId={null}/>
          }
          
        </div>
      </ScrollArea></section>
    )
}

export default Page ;