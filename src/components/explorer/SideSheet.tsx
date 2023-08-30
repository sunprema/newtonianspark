'use client'

import {useState} from 'react'
import axios from 'axios';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,    
  } from "@/components/ui/sheet"
import useExploreStore from "@/config/exploreStore"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from '../ui/use-toast';
import { useReactFlow } from 'reactflow';


export default function SideSheet({}){

    const sideSheetOpen = useExploreStore( (state) => state.sideSheetOpen)
    const toggleSideSheet = useExploreStore( (state) => state.toggleSideSheet)
    const nodeId = useExploreStore( (state) => state.nodeIdSelectedForSideSheet)
    const [exploreTopic, setExploreTopic] = useState("")
    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();    
    
    const {toast} = useToast()

    const dataFromSelectedNode = "This is the context of the Chera dynasty!" ;

    const handleSubmit = async() => {
        const selectedNode  = getNode(nodeId)        
        const [x,y] = [selectedNode?.position.x || 20,selectedNode?.position.y || 20 ] 
        console.log(selectedNode)
              
        const response = await axios.post("/api/explore", {explore:exploreTopic, context:dataFromSelectedNode})
        const {nodes,error} = response.data
        if(error != null || error !== ''){
            toast({
                title: "Unexpected failure",
                description: error,
              })
        }

        if(nodes != null){
            toast({
                title: "Some data is returned",
                description: "Nodes returned",
            })
            //Now that I got the nodes, I'll find the existing nodes and add it to them, I'll also adjust the nodes position so that it shows next to current node Id
            /*
            const updatedNodes =  nodes.map( (n, i:number) => {
                console.log(n)
                n["width"] = "500";
                n["height"] = "500";
                n["position"] = {x : (x + 500) * i, y :y}
            } )
            console.log(nodes)
            */
            addNodes( nodes)            

        }else{
            toast({
                title: "No data",
                description: "No data available",
            })

        }
    }
    

    return (

    <Sheet open={sideSheetOpen} onOpenChange={() => toggleSideSheet() }>
      <SheetContent side="right" className={"w-[400px] sm:w-[540px]"}>
        
        <SheetHeader>
          <SheetTitle>Explore more</SheetTitle>
          
          <SheetDescription>
            Using the context of the selected node, you can explore more.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col  space-x-4 space-y-5 sm:flex-row sm:space-y-0">
          <Input className="w-full sm:w-[500px]" placeholder="What do you want to Explore!" value={exploreTopic} onChange={(e) => setExploreTopic(e.target.value) } />
          <Button onClick={handleSubmit}>Explore</Button>           
        </div>

      </SheetContent>
    </Sheet>
    )


}


