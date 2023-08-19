import BasicFlow from "@/components/explorer/Flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getValue } from "@/features/explore/store-service"
import {
    Node,
    Edge,    
  } from "reactflow";

type Topic = {
    title :string,
    summary: string,
    flow: NodesAndEdges
}  
type NodesAndEdges = {
    nodes : Node[],
    edges: Edge[],
    
}

const Page = async ({params}:{params:{'key': string}}) => {
    const {key} = params
    const value = await getValue(key)
    console.log(value)
    const topic = value as Topic
    
    const {flow:{nodes, edges}, title, summary} = topic

    if(value == null){
        return <h1>No data for key ${key}</h1>
    }
    console.log(`Retrieved data that has title : ${title} , summary : ${summary}`)
  return (
            <section>
                <ScrollArea >
                <div className="h-[calc(100vh-80px)] w-full">
                    <BasicFlow initialNodes={nodes} initialEdges={edges} title={title} summary={summary} flowKey={key}/>
                </div>
                </ScrollArea>
            </section>
    )
    
}

export default Page