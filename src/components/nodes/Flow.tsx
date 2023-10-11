/* eslint-disable @next/next/no-img-element */
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
    useReactFlow,    
  } from "reactflow";
import "reactflow/dist/style.css";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"

import Dagre from '@dagrejs/dagre';
import ExplorerNode from "./ExplorerNode";
import TableNode from "./TableNode";
import { CheckCircle, PlayIcon, SaveIcon,UnfoldHorizontal, UnfoldVertical } from "lucide-react";
import Axios from 'axios';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
import ImageCard from "./ImageCard";
import MindMapNode from "./MindMapNode";
import NSparkChat from "../chat/npsark-chat";
import TextNode from "./TextNode";
import GridNode from "./GridNode";
import SideToolbar from "../side-toolbar";
import DynamicFormNode from "./code/DynamicFormNode";
import LinkCard from "./LinkCard";



const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));//dagre graph

  const nodeTypes = {
    explorer: ExplorerNode,
    table : TableNode,
    youtube: YoutubeCard,
    image: ImageCard,
    mindMap: MindMapNode,
    text_heading:TextNode,
    grid: GridNode,
    dynamicFormNode: DynamicFormNode,
    linkCard: LinkCard
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
    {initialNodes, initialEdges,initialTitle, initialSummary, flowKey, mode}: 
    {initialNodes:Node[], 
     initialEdges:Edge[],
     initialTitle?:string, 
     initialSummary?:string, 
     flowKey?:string,
     mode:string     

    }
    ) => {
    const reactFlowWrapper = useRef<HTMLInputElement>(null);  
    const [nodes,setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null >(null);
    const [key, setKey] = useState<string>(flowKey ?? "");
    const {toast} = useToast()
    const [title, setTitle] = useState<string>(initialTitle ?? "No Title")
    const [summary, setSummary] = useState<string>(initialSummary ?? "No Summary")

    const [coverImageURL, setCoverImageURL] = useState<string>()
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
    const { fitView } = useReactFlow();
    const router = useRouter();
    
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
    
    const getImagesFromNodes = useCallback(() => {
        return nodes.map( (node) => {
          if (node.type === "image" && node.data?.imageURL ){
            return node.data.imageURL
          }
        }
      )
    }, [nodes])


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
          data: { mode : mode, action:"input"},
        };
  
        setNodes((nds) => nds.concat(newNode));
      },
      [rfInstance, setNodes, mode]
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
      [nodes, edges, fitView, setEdges, setNodes]
    );
      
    const onSave = useCallback(async ()=> {
      if(rfInstance){
        const flow = rfInstance.toObject();
        try{
          const response = await Axios.post('/api/visit',{'key' :key,
          data:
          { title,
            summary,
            flow,
            coverImageURL
          }}
          )
          const keySaved = response.data['key']
          const status = response.data['status']
          if (status === 'SAVED'){
            setKey(keySaved)
            setIsSaveDialogOpen(false)
            toast({
              title: `Data saved for key ${keySaved}`,
              description: "This flow data is stored!",
              
            })

          }else{
            setIsSaveDialogOpen(false)
            toast({
              title: `FAILED TO save data for key ${keySaved}`,
              description: "Failed!",
              variant:'destructive'
            })

          }
          
        }catch(error){
          console.log(error)
          setIsSaveDialogOpen(false)
          toast({
            title: "FAILED TO save data",
            description: `Failed with error ${error}`,
            variant:'destructive'
          })
        }
      }
    },[rfInstance,key, toast, title, summary, coverImageURL]) 

    const onRefresh = () => {
      router.refresh()
    }

    return (
      
      <>
      <div ref={reactFlowWrapper} className="h-full">
      <ContextMenu>
      
      <ContextMenuTrigger>   
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
       <Controls className="absolute bottom-4 left-8">
          <ControlButton onClick={()=>setIsSaveDialogOpen(true)} className=" border-solid hover:border-orange-500 dark:hover:border-orange-500">
            <SaveIcon size={32}  className="hover:stroke-green-500 dark:stroke-black"/>                        
          </ControlButton> 
          <ControlButton onClick={()=>router.push(`/present/${key}`)} className=" border-solid hover:border-orange-500 dark:hover:border-orange-500">
            <PlayIcon size={32}  className="hover:stroke-green-500 dark:stroke-black"/>                        
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
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={()=> setIsSaveDialogOpen(true)}>
          Save
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset onClick={ () => onRefresh()}>
          Refresh
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>  
      </ContextMenu>
      </div>
      
      
      
      <NSparkChat  mode={mode} systemPromptFromUser="You are an expert assistant. You will assist user query"/>
      
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
            <DialogContent className="min-w-[500px]">
              
              <DialogHeader>
                <DialogTitle>Save Topic</DialogTitle>
                
              </DialogHeader>

              <div className="flex flex-col gap-4 py-4">
                  <Label htmlFor="title" >
                    Title
                  </Label>
                  <Input id="title" placeholder="Enter the title for this topic" value={title || ''} className="col-span-3" onChange={(e) => setTitle(e.target.value) } />
                  <Label htmlFor="summary">
                    Summary
                  </Label>
                  <Textarea id="summary" placeholder="Type the summary of the topic." value={summary || ''} className="col-span-3"onChange={(e) => setSummary(e.target.value) } />
                  <Label htmlFor="summary" >
                    Select cover image:
                  </Label>
                  <div className='nodrag grid w-full grid-cols-4 gap-1'>
                  {
                    getImagesFromNodes().map((imageURL:string, index) => 
                      
                      imageURL &&
                      <div key={index} className='relative'> 
                      { <img  src={imageURL} width = {300} height={300} alt="cover image"
                        onClick={ () => setCoverImageURL(imageURL)}
                      />
                      }
                      {
                          coverImageURL === imageURL ?
                          <div className='absolute left-0 top-0'><CheckCircle className='m-2 bg-transparent' color='orange' size={32} /></div>
                          : null
                      }
                      </div>
                      
                    )
                  }
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
  
  const BasicFlowWrapper = ({initialNodes, initialEdges,initialTitle, initialSummary, flowKey , mode}: 
    {initialNodes:Node[], 
     initialEdges:Edge[],
     initialTitle?:string, 
     initialSummary?:string, 
     flowKey?:string,
     mode:string
     }) => {
    return(
     
    <ReactFlowProvider>
      <div className="flex">
      <div className="h-[calc(100vh-74px)] w-[80px]  border-r bg-white dark:bg-slate-500">
        <SideToolbar />  
      </div>
      <div className="flex-1">
      <BasicFlow initialNodes={initialNodes} initialEdges={initialEdges} initialTitle={initialTitle} initialSummary={initialSummary} flowKey={flowKey} mode={mode} />
      </div>
      </div>
    </ReactFlowProvider>
    )
  } ;

  export default BasicFlowWrapper

