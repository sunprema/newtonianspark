import 'server-only'

import { NextRequest, NextResponse } from 'next/server';
import { ExploreNodeGenerate } from '@/features/explore/explore-service';
export const runtime = 'edge'


export async function POST(request: NextRequest) {
    const req = await request.json()
    const {result, error} = await ExploreNodeGenerate(req)
    if(error){
        return NextResponse.json( { error}, {status:200}) 
    }else{
        const { topic, summary, questions } = result?.output
        return  NextResponse.json( { topic, summary,questions, error:null}, {status:200}) 
    }
    
    
}
    
    