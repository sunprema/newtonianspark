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
        position: { x: 400, y: 200 },
        "type" : "youtube", 
        "data" : {"title" : "Quantum Mechanics", "summary" : "Simplified explanation of Quantum Mechanics", "videoId" : "5hVmeOCJjOU"}
        }, 

        {
            "id" : "2",
            position: { x: 800, y: 200 },
            "type" : "youtube", 
            "data" : {"title" : "Attention is all you need", "summary" : "Attention is all you need", "videoId" : "XowwKOAWYoQ"}
            }, 
    ]

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
                flowId={null}/>
            </div>
            </ScrollArea>
        </section>
    )
    
}

export default Page