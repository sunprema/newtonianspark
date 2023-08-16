import { ExploreTopic } from "@/features/explore/explore-service";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(request:NextRequest){
    const req = await request.json()
    const {result, error} = await ExploreTopic(req)
    const {topics}:{topics:[]} = result?.output
    let nodes:object[] = []

    if(error != null){
        return NextResponse.json( {nodes,error}, {status:400})
    }else{
        nodes = []
    }
    
    topics.map((topic, index) =>
    nodes.push(
        {   
            id: uuidv4(),
            type: 'explorer',
            data: topic,
            position: { x: (index * 500) + 20 * (index + 1), y: 50 }
        })
    )
    
    return NextResponse.json( {nodes,error}, {status:200})



    
}
