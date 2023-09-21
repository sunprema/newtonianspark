import { UnsplashImageService } from "@/features/explore/unsplash-image-service";

import { NextResponse, NextRequest } from "next/server";

export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(request:NextRequest){
    const req = await request.json()
    const {prompt} = req
    try{
        const imageData = await UnsplashImageService(prompt)
        if(imageData !== null) {
            return NextResponse.json( {imageData}, {status:200})
        }

    }catch(error){
        console.log(error)
        return NextResponse.json( {error}, {status:400})
    }

}