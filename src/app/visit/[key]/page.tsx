import BasicFlow from "@/components/nodes/Flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getValue } from "@/features/explore/store-service"
import { UUID } from "crypto";
import {
    Node,
    Edge,    
  } from "reactflow";

type Topic = {
    title :string,
    summary: string,
    id: UUID|null,    
    flow: NodesAndEdges,
    coverImageURL?:string,
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
    
    const {flow:{nodes, edges}, title, summary, coverImageURL } = topic

    if(value == null){
        return <h1>No data for key ${key}</h1>
    }
    console.log(`Retrieved data that has title : ${title} , summary : ${summary}`)
  return (
            <section>
                <ScrollArea >
                <div className="h-[calc(100vh-80px)] w-full">
                    <BasicFlow initialNodes={nodes} initialEdges={edges} initialTitle={title} initialSummary={summary} flowKey={key} coverImageURL={coverImageURL} mode="explore"/>
                </div>
                </ScrollArea>
            </section>
    )
    
}

export default Page