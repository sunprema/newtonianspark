import { ExploreDummyTopic } from "@/features/explore/explore-dummy-service";
//import { ExploreTopic } from "@/features/explore/explore-service";
import { NextResponse, NextRequest } from "next/server";

//export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(request:NextRequest){
    const req = await request.json()
    //const response = await ExploreTopic(req)
    const response = await ExploreDummyTopic(req)

    return NextResponse.json( {response}, {status:200})



    
}
