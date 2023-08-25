import { DallEImageService } from "@/features/explore/dalle-image-service";

import { NextResponse, NextRequest } from "next/server";

export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(request:NextRequest){
    const req = await request.json()
    const {prompt} = req
    try{
        const imageData = await DallEImageService(prompt)
        if(imageData !== null) {
            return NextResponse.json( {imageData}, {status:200})
        }

    }catch(error){
        console.log(error)
        return NextResponse.json( {error}, {status:400})
    }

}