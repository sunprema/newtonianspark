import { NextResponse, NextRequest } from "next/server";
import { nanoid } from 'nanoid'

import {getValue,setValue} from "@/features/explore/kv-service"

export const runtime = 'edge';

export async function POST(request:NextRequest){
    const req = await request.json()
    let {key} = req
    const {data} = req
    try{
        key = key || nanoid()
        const result = await setValue(key,data)
        return NextResponse.json({'key': key, 'status': result}, {'status': 200})
    }catch(error){
        return NextResponse.json({'key': key, 'status': error}, {'status': 400})
    }
}

export async function GET(request:NextRequest){
    const {searchParams} = new URL(request.url)
    const key = searchParams.get('key')
    
    try{
        if(key === null || key === ''){
            throw "Key is not available"
        }
        const data = await getValue(key!)
        if(!data){
            throw "Data is not available"
        }
        return NextResponse.json({'key': key, 'value': data }, {'status': 200})
    }catch(error){
        return NextResponse.json({'key': key, 'status': error}, {'status': 400})
    }
}