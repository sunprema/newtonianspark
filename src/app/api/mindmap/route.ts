import MindMapDesignService from "@/features/mindmaps/mindmap_service";
import { NextResponse, NextRequest } from "next/server";
import { Edge, Node } from "reactflow";


export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(request:NextRequest){
    const req = await request.json()
    const {result, error} = await MindMapDesignService(req)
    const ai_response = result
    
    const mindMapNodes:Node[]|undefined|null = result?.output?.nodes
    const edges:Edge[]|undefined|null = result?.output?.edges

    //Adjust the nodes and add Position and node type
    const nodes:Node[] = []

    mindMapNodes?.map( (mindMapNode, index) => {
        nodes.push({
            ...mindMapNode,
            type:'mindMap',
            position: { x: (index * 500) + 20 * (index + 1), y: 50 }
        })
    })
    

    if(error != null){
        return NextResponse.json( {nodes,error}, {status:400})
    }
    
    return NextResponse.json( {nodes,edges, ai_response,  error}, {status:200})    
}
