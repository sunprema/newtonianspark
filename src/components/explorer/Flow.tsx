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


  const nodeTypes = {
    explorer: ExplorerNode,
    tableNode : TableNode,
  };

  

  const BasicFlow = ( {initialNodes, initialEdges}:{initialNodes:Node[], initialEdges:Edge[]}) => {
    const [nodes,setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null >(null);
    
    const onConnect = useCallback(
      (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
      [setEdges]
    );
      
    const onSave = useCallback(()=> {
      if(rfInstance){
        const flow = rfInstance.toObject();
        console.log(JSON.stringify(flow, null, 2))
        window.rf = flow;
      }

    },[rfInstance]) 

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