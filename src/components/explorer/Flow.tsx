'use client'
import { useCallback, useState, useRef } from "react";
import ReactFlow, {
    ReactFlowProvider,
    Node,
    addEdge,
    Background,
    MiniMap,
    Controls,
    Edge,
    Connection,
    getIncomers,
    getOutgoers,
    getConnectedEdges,    
    useNodesState,
    useEdgesState,
    ReactFlowInstance,
    XYPosition,
    ControlButton,
    useReactFlow
  } from "reactflow";
import "reactflow/dist/style.css";

import Dagre from '@dagrejs/dagre';
import ExplorerNode from "./ExplorerNode";
import TableNode from "./TableNode";
import { SaveIcon,UnfoldHorizontal, UnfoldVertical } from "lucide-react";
import Axios from 'axios';
import { useToast } from "@/components/ui/use-toast"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle  
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { v4 } from 'uuid';
import SideSheet from "./SideSheet";
import ButtonEdge from "./ButtonEdge";
import YoutubeCard from "./YoutubeCard";
import AddNode from "./AddNode";
import ImageCard from "./ImageCard";
import MindMapNode from "./MindMapNode";


const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));//dagre graph

  const nodeTypes = {
    explorer: ExplorerNode,
    table : TableNode,
    youtube: YoutubeCard,
    image: ImageCard,
    mindMap: MindMapNode,
  };

  const edgeTypes = {
    default: ButtonEdge
  }
  

  type GraphOptions = {
    direction:string;
  }
  const getLayoutedElements = (nodes:Node[], edges:Edge[], options:GraphOptions ) => {
    g.setGraph({ rankdir: options.direction });
  
    edges.forEach((edge:Edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node:Node) => g.setNode(node.id, node));
  
    Dagre.layout(g);
  
    return {
      nodes: nodes.map((node:Node) => {
        const { x, y } = g.node(node.id);
  
        return { ...node, position: { x, y } };
      }),
      edges,
    };
  };

  const BasicFlow = ( 
    {initialNodes, initialEdges,initialTitle, initialSummary, flowKey}: 
    {initialNodes:Node[], 
     initialEdges:Edge[],
     initialTitle:(string|null), 
     initialSummary:(string|null), 
     flowKey:(string|null),     

    }
    ) => {
    const reactFlowWrapper = useRef<HTMLInputElement>(null);  
    const [nodes,setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null >(null);
    const [key, setKey] = useState<string|null>(flowKey);
    const {toast} = useToast()
    const [title, setTitle] = useState<string|null>(initialTitle)
    const [summary, setSummary] = useState<string|null>(initialSummary)
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
    const { fitView } = useReactFlow();
    
    const onConnect = useCallback(
      (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
      [setEdges]
    );

    const onNodesDelete = useCallback(
      (deleted:Node[]) => {
        setEdges(
          deleted.reduce((acc, node) => {
            const incomers = getIncomers(node, nodes, edges);
            const outgoers = getOutgoers(node, nodes, edges);
            const connectedEdges = getConnectedEdges([node], edges);
  
            const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));
  
            const createdEdges = incomers.flatMap(({ id: source }) =>
              outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
            );
  
            return [...remainingEdges, ...createdEdges];
          }, edges)
        );
      },
      [nodes, edges, setEdges]
    );

    const onDrop = useCallback(
      (event:React.DragEvent) => {
        event.preventDefault();
  
        const reactFlowBounds= reactFlowWrapper?.current?.getBoundingClientRect() ?? null;
        const nodeType = event.dataTransfer?.getData('application/reactflow');
  
        // check if the dropped element is valid
        if (typeof nodeType === undefined || !nodeType) {
          return;
        }
        let position:XYPosition = {x : event.clientX, y: event.clientY}

        if(reactFlowBounds!=null && rfInstance !== null){
          position = rfInstance?.project({
            x: event.clientX - reactFlowBounds?.left ?? 0,
            y: event.clientY - reactFlowBounds?.top ?? 0,
          });
        }
        

        const newNode:Node = {
          id: v4(),
          type: nodeType,
          position,
          data: { mode : 'input'},
        };
  
        setNodes((nds) => nds.concat(newNode));
      },
      [rfInstance, setNodes]
    );

    const onDragOver = useCallback((event:React.DragEvent) => {
      event.preventDefault();
      if( event.dataTransfer != null){
        event.dataTransfer.dropEffect = "move"
      } 
    }, []);

    const onLayout = useCallback(
      (direction:string) => {
        const layouted = getLayoutedElements(nodes, edges, { direction });
  
        setNodes([...layouted.nodes]);
        setEdges([...layouted.edges]);
  
        window.requestAnimationFrame(() => {
          fitView();
        });
      },
      [nodes, edges]
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
      
      <>
      <div ref={reactFlowWrapper} className="h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setRfInstance}
        onlyRenderVisibleElements
        onDrop={onDrop}
        onDragOver={onDragOver}        
        fitView
                
      > 
        <Controls>
          <ControlButton onClick={()=>setIsSaveDialogOpen(true)} className=" border-solid hover:border-orange-500 dark:hover:border-orange-500">
            <SaveIcon size={32}  className="hover:stroke-green-500 dark:stroke-black"/>                        
          </ControlButton> 
          <ControlButton onClick={()=>onLayout('LR')} className=" border-solid hover:border-orange-500 dark:hover:border-orange-500">
            <UnfoldHorizontal size={32}  className="hover:stroke-green-500 dark:stroke-black"/>                        
          </ControlButton>
          <ControlButton onClick={()=>onLayout('TB')} className=" border-solid hover:border-orange-500 dark:hover:border-orange-500">
            <UnfoldVertical size={32}  className="hover:stroke-green-500 dark:stroke-black"/>  
          </ControlButton>     
          
        </Controls>  
        <Background className="bg-slate-50 dark:bg-slate-600" gap={24} />
        <MiniMap className="dark:bg-inherit"  zoomable pannable/>
        <SideSheet />
        
      </ReactFlow>
      </div>
      <AddNode />
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
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
          </>
      
    );
  };
  
  const BasicFlowWrapper = ({initialNodes, initialEdges,initialTitle, initialSummary, flowKey}: 
    {initialNodes:Node[], 
     initialEdges:Edge[],
     initialTitle:(string|null), 
     initialSummary:(string|null), 
     flowKey:(string|null)
       }) => {
    return(
    <ReactFlowProvider>
      <BasicFlow initialNodes={initialNodes} initialEdges={initialEdges} initialTitle={initialTitle} initialSummary={initialSummary} flowKey={flowKey}  />
    </ReactFlowProvider>
    )
  } ;

  export default BasicFlowWrapper

