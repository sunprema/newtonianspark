import BasicFlow from "@/components/explorer/Flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getValue } from "@/features/explore/kv-service"
import {
    Node,
    Edge,    
  } from "reactflow";
type NodesAndEdges = {
    nodes : Node[],
    edges: Edge[]
}

const Page = async ({params}:{params:{'key': string}}) => {
    const {key} = params
    const value = await getValue(key)
    console.log(value)
    const nodesAndEdges = value as NodesAndEdges
    const {nodes, edges} = nodesAndEdges
    if(value == null){
        return <h1>No data for key ${key}</h1>
    }
  return (
            <section>
                <ScrollArea >
                <div className="h-[calc(100vh-80px)] w-full">
                    <BasicFlow initialNodes={nodes} initialEdges={edges}/>
                </div>
                </ScrollArea>
            </section>
    )
    
}

export default Page