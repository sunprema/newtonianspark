'use client'
import { Topic } from "@/types/nspark";
import { useCallback, useState } from "react";
import {
    Node,    
  } from "reactflow";
import { Button } from "../ui/button";

import { ExplorerNodePresentationMode } from "../nodes/ExplorerNode";
import { ImageCardPresentationMode } from "../nodes/ImageCard";
import { MindMapNodePresentationMode } from "../nodes/MindMapNode";
import { TableNodePresentationMode } from "../nodes/TableNode";
import { DynamicFormNodePresentationMode } from "../nodes/code/DynamicFormNode";
import { useRouter } from "next/navigation";
import { GridNodePresentationMode } from "../nodes/GridNode";

const PresentationHandler = ( {topic, flowKey}:{topic:Topic, flowKey:string} ) => {

    const {flow:{nodes}} = topic
    const router = useRouter()

    const [nodeIndex, setNodeIndex] = useState<number>(0)
    const decrNodeIndex = () => nodeIndex != 0 ? setNodeIndex(nodeIndex-1) : null
    const incrNodeIndex = () => nodeIndex < nodes.length -1 ? setNodeIndex(nodeIndex+1) : setNodeIndex(0)
    
    const gotoVisitPage = useCallback(() =>{
        router.push(`/visit/${flowKey}`)

    },[ flowKey, router ])

    
    const getNodeSlide = useCallback( () => {
        const currentNode:Node = nodes[nodeIndex]
        console.log(JSON.stringify(currentNode, null, 2 ))
        let nodeSlide = null
        if (!currentNode?.type){
            return <h1> No slide for this</h1>
        }
        switch( currentNode.type){
            case "explorer":
                nodeSlide = <ExplorerNodePresentationMode id={currentNode.id} data={currentNode.data} />
                break;
            case "table":
                nodeSlide = <TableNodePresentationMode id={currentNode.id} data={currentNode.data} />
                break;
            case "image":
                nodeSlide = <ImageCardPresentationMode data={currentNode.data} />  
                break;
            case "mindMap":
                nodeSlide = <MindMapNodePresentationMode id={currentNode.id} data={currentNode.data} />  
                break;

            case "text_heading":
                nodeSlide = <h4 className="text-3xl font-bold ">{currentNode?.data?.text}</h4> 
                break;

            case "grid":
                nodeSlide = <GridNodePresentationMode id={currentNode.id} data={currentNode.data} />
                break;

            case "dynamicFormNode":
                nodeSlide = <DynamicFormNodePresentationMode id={currentNode.id} data={currentNode.data}/>
                break;


            default:
                nodeSlide = null    

        }
        return nodeSlide
    },[nodes, nodeIndex])

    return (

        <div className="absolute left-0 top-4 h-full w-full dark:bg-slate-800">
            <div className="container mx-auto flex h-full items-center">
                {getNodeSlide()}
            </div>

        <div className="absolute bottom-32 right-0 mb-6 mr-6">
            <div className="flex gap-0">
            <Button className="rounded-none hover:bg-orange-500" onClick={gotoVisitPage}> Exit </Button>
            <Button className="rounded-none hover:bg-orange-500" onClick={decrNodeIndex}> Back </Button>
            <Button className="rounded-none hover:bg-orange-500" onClick={incrNodeIndex}> Next </Button>
        </div>            
        </div>
    </div>
            
        
        
        
        
    )
}



export default PresentationHandler ;