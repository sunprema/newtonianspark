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


  const nodeTypes = {
    explorer: ExplorerNode,
    tableNode : TableNode,
  };

  

  const BasicFlow = ( {initialNodes, initialEdges}:{initialNodes:Node[], initialEdges:Edge[]}) => {
    const [nodes,setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null >(null);
    const [key, setKey] = useState<string|null>();
    const {toast} = useToast()

    const onConnect = useCallback(
      (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
      [setEdges]
    );
      
    const onSave = useCallback(async ()=> {
      if(rfInstance){
        const flow = rfInstance.toObject();
        console.log(JSON.stringify(flow, null, 2))
        try{
          const response = await Axios.post('/api/visit',{'key' :key,data:flow})
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
    },[rfInstance,key, toast]) 

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
        fitView
        
      > 
        <Controls >
          <SaveIcon size={12} className="m-2 hover:stroke-green-500" onClick={onSave}/>
        </Controls>  
        <Background />
        <MiniMap zoomable pannable/>
        
      </ReactFlow>
      </ReactFlowProvider>
    );
  };
  
  export default BasicFlow ;