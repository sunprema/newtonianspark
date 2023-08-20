import 'server-only'

import { kv } from "@vercel/kv";

import { createClient } from '@supabase/supabase-js'
import { UUID } from 'crypto';

// Create a single supabase client for interacting with your database

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '',process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '', 
{'auth' : {persistSession: false}

})


export const getValue = async ( key:string) => {
    try{
        const value = await kv.get(key)
        return value ;
    }catch(error){
        console.log(error)
    }
    
}

export const setValue= async(key:string, value:string, title:string, summary:string) => {
    try{
        await kv.set(key, value)        
        await supabase.from('topics').insert({'flowKey' : key, title, summary  })
        return "SAVED"
    }catch(error){
        console.log(error)
    }
}

type TopicFromDB = {
    id: UUID,
    flowKey: string,
    title: string,
    summary:string,
    created_at:string

}

export const getTopics =  async() => {
    const {data, error} = await supabase
        .from('topics')
        .select('*')
        .order('created_at', {ascending:false})
        .limit(100)
        
    return {data, error}

}