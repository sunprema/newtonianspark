'use client'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Topic } from "@/types/nspark";
import { ReactNode, useCallback, useState } from "react";
import {
    Node,
    Edge
  } from "reactflow";
import { Button } from "../ui/button";

import { ExplorerNodePresentationMode } from "../nodes/ExplorerNode";
import { ImageCardPresentationMode } from "../nodes/ImageCard";
import { MindMapNodePresentationMode } from "../nodes/MindMapNode";


const PresentationHandler = ( {topic}:{topic:Topic} ) => {

    const {flow:{nodes, edges}, title, summary, id} = topic
    const [nodeIndex, setNodeIndex] = useState<number>(0)
    const decrNodeIndex = () => nodeIndex != 0 ? setNodeIndex(nodeIndex-1) : null
    const incrNodeIndex = () => nodeIndex < nodes.length -1 ? setNodeIndex(nodeIndex+1) : setNodeIndex(0)
    
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
                nodeSlide = <h1> {currentNode.id} - table</h1> 
                break;
            case "image":
                nodeSlide = <ImageCardPresentationMode id={currentNode.id} data={currentNode.data} />  
                break;
            case "mindMap":
                nodeSlide = <MindMapNodePresentationMode id={currentNode.id} data={currentNode.data} />  
                break;

            case "text_heading":
                nodeSlide = <h1> {currentNode.id} - text_heading</h1> 
                break;

            case "grid":
                nodeSlide = <h1> {currentNode.id} - grid</h1> 
                break;

            case "dynamicFormNode":
                nodeSlide = <h1> {currentNode.id} - dynamicFormNode</h1>    
                break;


            default:
                nodeSlide = null    

        }
        return nodeSlide
    },[nodes, nodeIndex])

    return (

        <div className="absolute top-16 left-0 w-full h-full dark:bg-slate-800">
            <div className="container mx-auto flex h-full items-center">

                {getNodeSlide()}
            </div>

        <div className="absolute bottom-32 right-0 mr-6 mb-6">
            <div className="flex gap-0">
            <Button className="rounded-none hover:bg-orange-500" onClick={incrNodeIndex}> Exit </Button>
            <Button className="rounded-none hover:bg-orange-500" onClick={decrNodeIndex}> Back </Button>
            <Button className="rounded-none hover:bg-orange-500" onClick={incrNodeIndex}> Next </Button>
        </div>            
        </div>
    </div>
            
        
        
        
        
    )
}



export default PresentationHandler ;