
import 'server-only'
import { NextRequest } from 'next/server';
import { ExploreTopic } from "@/features/explore/explore-service";
import moment from 'moment';

export const runtime = 'edge'

export async function POST(req: NextRequest) {
    //const body = await req.json();

    const encoder = new TextEncoder()

    const customReadable = new ReadableStream({
        
        async start(controller) {
            controller.enqueue(encoder.encode(`<startTime>${moment().format('MMMM Do YYYY, h:mm:ss a')}</startTime><data>`))
            async function GetExploreData(){
                const {result, error} = await ExploreTopic({explore:"Rules of baseball match", context:null})
                console.log(error)
                const {topics}:{topics:[]} = result?.output
                controller.enqueue(encoder.encode( JSON.stringify(topics )))
            }
            
            try{
                await GetExploreData()

            }catch(e){
                console.log(e)
                controller.enqueue(encoder.encode(`${e}`))
            }finally{
                controller.enqueue(encoder.encode(`</data><endTime>${moment().format('MMMM Do YYYY, h:mm:ss a')}</endTime>`))
                controller.close()
            }
            
        }
    })

    return new Response(customReadable, {'headers' : {'Content-Type' : 'application/json'}})
    

}