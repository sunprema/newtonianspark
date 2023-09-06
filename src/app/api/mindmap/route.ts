import MindMapDesignService from "@/features/mindmaps/mindmap_service";
import { NextResponse, NextRequest } from "next/server";
import { Edge, Node } from "reactflow";


export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(request:NextRequest){
    const req = await request.json()
    const {result, error} = await MindMapDesignService(req)
    const ai_response = result
    
    const nodes:Node[]|undefined|null = result?.output?.nodes
    const edges:Edge[]|undefined|null = result?.output?.edges

    if(error != null){
        return NextResponse.json( {nodes,error}, {status:400})
    }
    
    return NextResponse.json( {nodes,edges, ai_response,  error}, {status:200})    
}
