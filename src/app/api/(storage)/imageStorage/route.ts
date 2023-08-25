import { StoreImageService } from "@/features/explore/storage-service";

import { NextResponse, NextRequest } from "next/server";

//export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(request:NextRequest){
    const req = await request.json()
    const {nodeId, b64_json}:{nodeId:string, b64_json:string} = req
    try{
        const imageURL = await StoreImageService(nodeId,b64_json)
        if(imageURL !== null) {
            return NextResponse.json( {imageURL}, {status:200})
        }

    }catch(error){
        console.log(error)
        return NextResponse.json( {error}, {status:400})
    }

}