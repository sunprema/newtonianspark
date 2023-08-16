import { ExploreDummyTopic } from "@/features/explore/explore-dummy-service";
//import { ExploreTopic } from "@/features/explore/explore-service";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';

//export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(request:NextRequest){
    const req = await request.json()
    //const response = await ExploreTopic(req)
    const response = await ExploreDummyTopic(req)
    const {topics}:{topics:[]} = response.result.output
    const node:any = [] 
    topics.map((topic:any) =>
    node.push(
        {   
            id: uuidv4(),
            type: 'explorer',
            data: topic,
            position: { x: 400, y: 200 }
        })
    )
    const result = { nodes : node}

    return NextResponse.json( {result}, {status:200})



    
}
