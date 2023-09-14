import 'server-only'
import { ContextualDataService } from '@/features/contextual/contextual_data_service'
import { NextResponse, NextRequest } from "next/server";
export const runtime = 'edge';

export async function POST(request:NextRequest){
    const req = await request.json()
    const {result, error} = await ContextualDataService(req)
    return NextResponse.json( {result,  error}, {status:200})   
}