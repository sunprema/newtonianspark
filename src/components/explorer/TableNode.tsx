
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Column, Table } from "@/features/database_design/table_schema_types"

import { KeyRound } from "lucide-react"
import { Handle, Position } from "reactflow"

const TableDisplay = ({data}:{data:Table}) => {
  const {columns}:{columns:Column[]|null} = data
  return (
    <div>
      <ul className="space-y-2 divide-y dark:divide-slate-500">
      {
        columns?.map( (column) => {

          return(
            <div className="nodrag flex w-[full] items-center p-2" key={column.name}> 
              <Handle id={`handle-${data.table_name}-${column.name}` } className="relative -left-4 mx-4 h-2 w-2  rounded-full bg-green-600" type="source" position={Position.Right}></Handle>
              <Handle id={`handle-${data.table_name}-${column.name}` } className="relative -left-4 mx-4 h-2 w-2  rounded-full bg-red-600" type="target" position={Position.Left}></Handle>
              
              <div className="w-[24px] shrink-0">{column.primary_key ? <KeyRound size={14} color="#0000ff" strokeWidth={2.5}/> : null }</div>
              <div className="flex-auto font-mono text-xs">{column.name}</div>
              <div className="text-right font-mono text-xs">{column.type}</div>
              <div className="relative -right-4 mx-4 h-2 w-2 rounded-full bg-red-400"></div>
              {
              //<Handle className="!h-6 !w-2 !rounded-none !bg-green-500"  id={`handle-${data.table_name}-${column.name}` } position={Position.Right} type="source" />
              //<Handle className="!h-6 !w-2 !rounded-none !bg-red-500"  id={`handle-${data.table_name}-${column.name}` } position={Position.Left} type="target" />
              }
            </div>
          )
          }
        )
      }
      </ul>

      
    </div>  
    )
 }
  
  
  const TableNode = ({data}:{data:Table}) => {
    console.log(data)  
    const {table_name, description} = data
     
    return (
      <div>
      <Card className="group min-w-[400px] shadow-2xl border-orange-400 dark:border-orange-400 bg-slate-100 dark:bg-slate-700">
        <CardHeader className="border-slate-500 border-b" >
          <CardTitle className="text-center text-base font-semibold group-hover:text-orange-500 group-hover:dark:text-orange-500 ">{table_name}</CardTitle>
          <CardDescription className="font-medium text-start text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
        <TableDisplay data={data} />
        </CardContent>
        
      <CardFooter className="flex justify-between">
        <Badge variant="outline" onClick={()=> alert("Hi")} className="nodrag">Explore more</Badge>
      </CardFooter>
      
      </Card>
      
      </div>
    )
  
  
  }
  
  export default TableNode;