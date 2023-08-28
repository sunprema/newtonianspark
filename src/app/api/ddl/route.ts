import { DatabaseDesignService } from "@/features/database_design/database_design_service";
import { Table } from "@/features/database_design/table_schema_types";
import { Label } from "@radix-ui/react-label";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge'; // 'nodejs' is the default

export async function POST(request:NextRequest){
    const req = await request.json()
    const {result, error} = await DatabaseDesignService(req)
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
        
        table.columns?.map(( column,index) => {
            if (column?.foreign_key != null){
                const foreignKeyData = column.foreign_key
                edges.push( {
                    "id" : `edge-${table.table_name}-${column.name}`,
                    "type" : "smoothstep",
                    "animated" : true,
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
    
    return NextResponse.json( {nodes,edges, error}, {status:200})    
}
