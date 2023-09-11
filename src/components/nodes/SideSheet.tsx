'use client'

import {useState, useEffect, useCallback} from 'react'
import axios from 'axios';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,    
  } from "@/components/ui/sheet"

import useNsparkState from '@/config/nsparkStore';
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from '../ui/use-toast';
import { Edge, Node, useReactFlow } from 'reactflow';
import { Textarea } from '../ui/textarea';
import NSparkChat from '../chat/npsark-chat';


export default function SideSheet({}){

    const sideSheetOpen = useNsparkState( (state) => state.sideSheetOpen)
    const toggleSideSheet = useNsparkState( (state) => state.toggleSideSheet)
    const nodeId = useNsparkState( (state) => state.nodeIdSelectedForSideSheet)
    const nodeType = useNsparkState( (state) => state.nodeType)
    
    const [topic, setTopic] = useState("")
    const { getNode, addNodes, addEdges } = useReactFlow();    
    const {toast} = useToast()
    const dataFromSelectedNode = "Somehow get the context from the selected node" ;

    const handleSubmit = useCallback( async() => {
        const selectedNode  = getNode(nodeId)        
        const [x,y] = [selectedNode?.position.x || 20,selectedNode?.position.y || 20 ] 
        console.log(selectedNode)
        //const nodeType = selectedNode?.type || "default"
        let apiToCall = "explore" ; //assume its default
        switch(nodeType){
          case "explorer":
             apiToCall = "explore"
             break
          case "table":
            apiToCall = "ddl"
            break
          case "youtube":
            apiToCall = "explore"
            break
          case "image":
            apiToCall = "explore"
            break

          case "mindMap":
            apiToCall = "mindmap"
            break

          default:
            return;  

        }     
        const response = await axios.post(`/api/${apiToCall}`, 
            {explore:topic, context:dataFromSelectedNode})
        const {nodes,edges,error}:{ nodes:Node[]|null, edges:Edge[]|null,error:string } = response.data
        if(error != null || error !== ''){
            toast({
                title: "Unexpected failure",
                description: error,
              })
        }

        if(nodes != null){
            addNodes( nodes)
            if( edges != null){
              addEdges(edges)
            }
            toggleSideSheet()
            toast({
                title: "Success ",
                description: `Nodes returned : ${nodes?.length} , Edges returned : ${edges?.length}`,
            })
        }        
        else{
            toggleSideSheet()
            toast({
                title: "No data",
                description: "No data available",
            })
            
        }
    }, [nodeType, nodeId, toast, topic,getNode, addNodes, addEdges, toggleSideSheet])
    
    return (

    <Sheet open={sideSheetOpen} onOpenChange={() => toggleSideSheet() }>
      <SheetContent side="right" className={"w-[400px] sm:w-[540px]"}>
        
        <SheetHeader className="mb-20">
          <SheetTitle>Explore more</SheetTitle>
          
          <SheetDescription>
            Using the context of the selected node {nodeType}, you can explore more.
          </SheetDescription>
        </SheetHeader>

        <NSparkChat />
        <div className="flex flex-col space-x-4 space-y-5 sm:w-[300px]">
          <Textarea className="w-full" placeholder="What do you want to Explore!" value={topic} onChange={(e) => setTopic(e.target.value) } rows={5} cols={10}/>
          
          <Button onClick={handleSubmit}>Explore</Button>           
        
        </div>
        

      </SheetContent>
    </Sheet>
    )


}


