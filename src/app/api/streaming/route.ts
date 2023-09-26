
import 'server-only'
import { NextRequest } from 'next/server';
import { ExploreTopic } from "@/features/explore/explore-service";
import moment from 'moment';

export const runtime = 'edge'

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {explore} = body
    const encoder = new TextEncoder()

    const customReadable = new ReadableStream({
        
        async start(controller) {
            controller.enqueue(encoder.encode(`<startTime>${moment().format('MMMM Do YYYY, h:mm:ss a')}</startTime>`))
            async function GetExploreData(){
                controller.enqueue(encoder.encode( `<topic>${explore}</topic>`))
                const {result, error} = await ExploreTopic({explore, context:null})
                if(error!= null){
                    controller.enqueue(encoder.encode( `<error>${error}</error>`))
                }
                const {topics}:{topics:[]} = result?.output
                controller.enqueue(encoder.encode( `<data>${JSON.stringify(topics )}</data>`))
            }
            
            try{
                await GetExploreData()
            }catch(e){
                console.log(e)
                controller.enqueue(encoder.encode(`${e}`))
            }finally{
                controller.enqueue(encoder.encode(`<endTime>${moment().format('MMMM Do YYYY, h:mm:ss a')}</endTime>`))
                controller.close()
            }
            
        }
    })

    return new Response(customReadable, {'headers' : {'Content-Type' : 'application/json'}})
    

}