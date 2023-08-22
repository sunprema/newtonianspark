'use client'
import { useCallback, useState } from "react";
import ReactFlow, {
    ReactFlowProvider,
    Node,
    addEdge,
    Background,
    MiniMap,
    Controls,
    Edge,
    Connection,
    useReactFlow,    
    useNodesState,
    useEdgesState,
    ReactFlowInstance
  } from "reactflow";
import "reactflow/dist/style.css";
import ExplorerNode from "./ExplorerNode";
import TableNode from "./TableNode";
import { SaveIcon } from "lucide-react";
import Axios from 'axios';
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UUID } from "crypto";
import SideSheet from "./SideSheet";




  const nodeTypes = {
    explorer: ExplorerNode,
    tableNode : TableNode,
  };

  

  const BasicFlow = ( 
    {initialNodes, initialEdges,initialTitle, initialSummary, flowKey, flowId}: 
    {initialNodes:Node[], 
     initialEdges:Edge[],
     initialTitle:(string|null), 
     initialSummary:(string|null), 
     flowKey:(string|null),
     flowId:(UUID|null)

    }
    ) => {
    const [nodes,, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null >(null);
    const [key, setKey] = useState<string|null>(flowKey);
    const {toast} = useToast()
    const [title, setTitle] = useState<string|null>(initialTitle)
    const [summary, setSummary] = useState<string|null>(initialSummary)
    const [sideSheetOpen, setSideSheetOpen]  = useState<boolean>(false)

    const onConnect = useCallback(
      (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
      [setEdges]
    );
      
    //TODO: Refactor this, I dont think we need a new function when rfInstance, or key or toast changes each time.
    const onSave = useCallback(async ()=> {
      if(rfInstance){
        const flow = rfInstance.toObject();
        console.log(JSON.stringify(flow, null, 2))
        if(key== null){
          //This is the first time this is getting saved. Ask for a title and summary for this.

        }
        try{
          const response = await Axios.post('/api/visit',{'key' :key,
          data:
          { title,
            summary,
            flow
          }}
          )
          const keySaved = response.data['key']
          const status = response.data['status']
          if (status === 'SAVED'){
            setKey(keySaved)
            toast({
              title: `Data saved for key ${keySaved}`,
              description: "This flow data is stored!",
            })

          }else{
            toast({
              title: `FAILED TO save data for key ${keySaved}`,
              description: "Failed!",
            })

          }
          
        }catch(error){
          console.log(error)
          toast({
            title: "FAILED TO save data",
            description: `Failed with error ${error}`,
          })
        }
      }
    },[rfInstance,key, toast, title, summary]) 

    return (
      <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={setRfInstance}
        onlyRenderVisibleElements
        fitView        
      > 
        <Controls className="dark:bg-inherit">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="h-4 p-2 rounded-md text-xs border-none">
                <SaveIcon size={14} className=" hover:stroke-green-500"/>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
              
              <DialogHeader>
                <DialogTitle>Save Topic</DialogTitle>
                <DialogDescription>
                  Make changes to this topic ${key}. Click save when you are done.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" placeholder="Enter the title for this topic" value={title || ''} className="col-span-3" onChange={(e) => setTitle(e.target.value) } />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="summary" className="text-right">
                    Summary
                  </Label>
                  <Textarea id="summary" placeholder="Type the summary of the topic." value={summary || ''} className="col-span-3"onChange={(e) => setSummary(e.target.value) } />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" onClick={onSave}>Save changes</Button>
              </DialogFooter>

          </DialogContent>

            
          </Dialog>
        </Controls>  
        
        <MiniMap className="dark:bg-inherit"  zoomable pannable/>
        <SideSheet />
        
      </ReactFlow>
      
      </ReactFlowProvider>
    );
  };
  
  export default BasicFlow ;