import { DatabaseDesignService as service_function } from "@/features/database_design/database_design_service";
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
            async function StreamingFunction(){
                controller.enqueue(encoder.encode( `<topic>${explore}</topic>`))
                const intervalId = setInterval( () => {
                    controller.enqueue(encoder.encode( `<processing>${moment().format('MMMM Do YYYY, h:mm:ss a')}</processing>`))
                }, 10000)

                const {result, error} = await service_function({explore, context, variant: variant ?? "multiple" })
                clearInterval(intervalId)
                if(error!= null){
                    controller.enqueue(encoder.encode( `<error>${error}</error>`))
                }
                if (result?.output){
                    controller.enqueue(encoder.encode( `<data>${JSON.stringify(result.output)}</data>`))
                }
                
            }
            
            try{
                await StreamingFunction()
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
    const {result, error} = await DatabaseDesignService(req)
    const ai_response = result
    
    const tables:Table[]|undefined|null = result?.output?.tables

    let nodes:object[] = []
    let edges:object[] = []
    

    if(error != null){
        return NextResponse.json( {nodes,error}, {status:400})
    }else{
        nodes = []
        edges = []
    }
    
    tables?.map((table, index) => {
        //push all the nodes
        
        nodes.push(
        {   
            id: `table-${table.table_name}`,
            type: 'table',
            data: table,
            position: { x: (index * 500) + 20 * (index + 1), y: 50 }
        }
        )

        //push all the edges
        
        table.columns?.map(( column) => {
            if (column?.foreign_key != null){
                const foreignKeyData = column.foreign_key
                edges.push( {
                    "id" : `edge-${table.table_name}-${column.name}`,
                    "type" : "default",
                    source:`table-${table.table_name}`,
                    target:`table-${foreignKeyData.table_name}`,
                    sourceHandle: `handle-${table.table_name}-${column.name}` ,
                    targetHandle: `handle-${foreignKeyData.table_name}-${foreignKeyData.column}`,
                    label: 'fk'

                })
            }            
        })
    }
    )
    
    return NextResponse.json( {nodes,edges, ai_response,  error}, {status:200}) 
    */  