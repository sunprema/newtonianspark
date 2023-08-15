'use client'
import { useCallback } from "react";
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
import CustomNode from "./CustomNode";
import "reactflow/dist/style.css";
import ExplorerNode from "./ExplorerNode";

  const initialNodes: Node[] = [
    {
      id: "1",
      type: "input",
      data: { label: "Node 1" },
      position: { x: 250, y: 5 }
    },
    { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
    { id: "3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
    {
      id: "4",
      type: "explorer",
      data: { label: "Custom Node", topic: "Laws of Thermodynamics", summary: "This is the summary" },
      position: { x: 400, y: 200 }
    }
  ];
  
  const initialEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true },
    { id: "e1-3", source: "1", target: "3" }
  ];
  
  
  const nodeTypes = {
    explorer: ExplorerNode
  };

  const BasicFlow = () => {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
      (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
      [setEdges]
    );
  
    return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        
      > 
        <Controls />
        <Background />
        <MiniMap zoomable pannable/>
        
      </ReactFlow>
    );
  };
  
  export default BasicFlow;
