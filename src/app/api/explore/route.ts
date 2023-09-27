import { ExploreTopic } from "@/features/explore/explore-service";
import { NextRequest } from 'next/server';
import moment from 'moment';

export const runtime = 'edge'; // 'nodejs' is the default



export async function POST(request:NextRequest){
    const req = await request.json()
    const {explore,context, variant} = req
    
    const encoder = new TextEncoder()

    const customReadable = new ReadableStream({
        
        async start(controller) {
            controller.enqueue(encoder.encode(`<startTime>${moment().format('MMMM Do YYYY, h:mm:ss a')}</startTime>`))
            async function GetExploreData(){
                controller.enqueue(encoder.encode( `<topic>${explore}</topic>`))
                const intervalId = setInterval( () => {
                    controller.enqueue(encoder.encode( `<processing>${moment().format('MMMM Do YYYY, h:mm:ss a')}</processing>`))
                }, 10000)

                const {result, error} = await ExploreTopic({explore, context, variant: variant ?? "multiple" })
                clearInterval(intervalId)
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

    return new Response(customReadable, {'headers' : {
        'Content-Type' : 'application/json',
        'X-Content-Type-Options': 'nosniff',
    }})
    
    
    



    
}
/*
let nodes:object[] = []
topics.map((topic, index) =>
    nodes.push(
        {   
            id: uuidv4(),
            type: 'explorer',
            data: topic,
            position: { x: (index * 500) + 20 * (index + 1), y: 50 },
            drag_handle: '.drag_handle'
        })
    )
*/