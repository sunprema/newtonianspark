import ExplorerNodeReadable from "@/components/explorer/ExplorerNodeReadable";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getValue } from "@/features/explore/store-service"

import {
    Node,
    Edge,    
  } from "reactflow";
import { ImageCardReadable } from "@/components/explorer/ImageCardReadable";

type Topic = {
    title :string,
    summary: string,
    id: string|null,
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
    
    const {flow:{nodes, edges}, title, summary, id} = topic

    if(value == null){
        return <h1>No data for key ${key}</h1>
    }
    console.log(`Retrieved data that has title : ${title} , summary : ${summary}`)
  return (
            <section>
                <ScrollArea >
                <div className="h-[calc(100vh-80px)] w-full flex flex-col gap-4 space-y-4 p-8">
                    {
                        nodes.map( ( node:Node, index:number ) => {
                            const {data} = node
                            const {topic, summary, questions} = data
                            let RenderNode = <h1> Unknown Node </h1>
                            switch(node.type) {

                                    case "explorer":
                                        RenderNode = <ExplorerNodeReadable data={data} id={node.id}/>
                                        break;
                                    case "youtube":
                                        RenderNode = <h1>Unknowm</h1>

                                    case "image":
                                        RenderNode = <ImageCardReadable nodeId={node.id} data={data} />  
                                    default:
                                        break;
                            }
                            return (
                                <div key={node.id}>
                                    {RenderNode}
                                </div>    
                            )
                        })
                        }
                </div>
                </ScrollArea>
            </section>
    )
    
}

export default Page