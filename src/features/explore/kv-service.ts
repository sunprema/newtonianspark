import 'server-only'

import { kv } from "@vercel/kv";


export const getValue = async ( key:string) => {
    try{
        const value = await kv.get<string>(key)
        return value ;
    }catch(error){
        console.log(error)
    }
    
}

export const setValue= async(key:string, value:string) => {
    try{
        await kv.set(key, value)
        return "SAVED"
    }catch(error){
        console.log(error)
    }
}