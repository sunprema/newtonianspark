'use client'

import BasicFlow from "@/components/explorer/Flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UUID } from "crypto";
import {
    Node,
    Edge,    
  } from "reactflow";

type Topic = {
    title :string,
    summary: string,
    id: UUID|null,
    flow: NodesAndEdges
}  
type NodesAndEdges = {
    nodes : Node[],
    edges: Edge[],
    
}

const Page = () => {

    const initialNodes:Node[] = [
        {
        "id" : "1",
        position: { x: 100, y: 200 },
        "type" : "youtube", 
        "data" : {"title" : "Quantum Mechanics", "summary" : "Simplified explanation of Quantum Mechanics", "videoId" : "5hVmeOCJjOU"}
        }, 

        {
            "id" : "2",
            position: { x: 800, y: 200 },
            "type" : "youtube", 
            "data" : {"title" : "Attention is all you need", "summary" : "Attention is all you need", "videoId" : "XowwKOAWYoQ"}
        },
        {
            "id" : "3",
            position: { x: 1400, y: 200 },
            "type" : "image", 
            "data" : {"title" : "Attention is all you need", "summary" : "Attention is all you need", "imageData" :"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"}, 
        }    

    ]

    //"data" : {"title" : "Attention is all you need", "summary" : "Attention is all you need", "imageData" : 'iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAIAAAB7GkOtAAAAaGVYSWZNTQAqAAAACAACknwAAgAAACkAAAAmkoYAAgAAABgAAABQAAAAAE9wZW5BSS0tMGNiYzJjMDk4NzYzMGY4MzdmNDUwOTY2YWRlMTcxYmIAAE1hZGUgd2l0aCBPcGVuQUkgREFMTC1FAECJPLcAAQAASURBVHgBABaE6XsBp7S8AQAB/f/+9fb47e3u8O/xAPr4+fjz8vHuBgUF/wACBQYJDRQS7/L2+Pn+Dw4NCgkHDw8MCAcH+/r7+fn8BwYB+Pz8+/n7EBALBgMJAQH/8vHy+fr4/f79BQUE+Pr6BQEBAAIA/vz9BgcF/f7/BAUI+vv79fT0Dg8PDAsLDg8QDAkH+fn3BwcF8vT18vPz//7+FBUWAQH//f///fv9//4ABgcK/f79BgcH/v79BAME/P79/f3+BwMDCQYGCgsJCQYF8fPy5ufl/Pz6DAwGCwk…8BAf3+/gICBAP//vkB/QMA/v/+AQIA/v4AAgECAgL9//4CAgEDAQP8/v0C/QACAgL8//4CAQH//f7/AQAA/wABAf//AQEA/gACAAABBAP9/P0CAQEDAQH///76/PsCAAABAwIA/v/+AQEB/v4B/gL+Af8CAQIAAAD9+v0BBAMBAf///wECAAAA/f////8A/wH+//z+AAEFBAD9/gH+/P8BAf8AAwD7+/4CAgIAAf4BAAD/AP///wAA/wIBAgL//v8BAgH/AP79+/0AAgH9/v4DAQIBBAEB/f/9/v4BAgIB/wH+/v8AAQAAAP4BAAL+AAD9//////8EAAH9AAEDAgH//v3/Af8CAwP+AP4BAgEB/gAAAgD/AAD//gECAgD//P8AAgD+//8BAAH+/v39AQEAAQH+/f7/AP/+AAAAAgD//v4BAgL/AP8DAQQAAP7+/f4BAwAA/gD+//0DAQH/AAMYCgFNrl0ktwAAAABJRU5ErkJggg=='}
            

    const edges:Edge[] = []
    
  return (
        <section>
            <ScrollArea >
            <div className="h-[calc(100vh-80px)] w-full">
                <BasicFlow 
                initialNodes={initialNodes} 
                initialEdges={edges}
                initialTitle={"test"} 
                initialSummary={"test_summary"} 
                flowKey={"123"} 
                />
            </div>
            </ScrollArea>
        </section>
    )
    
}

export default Page