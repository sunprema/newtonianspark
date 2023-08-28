
import {
    Card,
    CardContent,
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
      <ul className="divide-y divide-slate-100">
      {
        columns?.map( (column) => (
          <div className="flex w-[full] items-center p-2" key={column.name}> 
            <div className="relative -left-4 mx-4 h-2 w-2 rounded-full bg-green-600" type="target" position={Position.Left}></div>
            <div className="w-[24px] shrink-0">{column.primary_key ? <KeyRound size={14} color="#0000ff" strokeWidth={2.5}/> : null }</div>
            <div className="flex-auto font-mono text-xs">{column.name}</div>
            <div className="text-right font-mono text-xs">{column.type}</div>
            <div className="relative -right-4 mx-4 h-2 w-2 rounded-full bg-red-400"></div>
            <div></div>
          </div>
        ))
      }
      </ul>  
    </div>  
    )
 }
  
  
  const TableNode = ({data}:{data:Table}) => {
    console.log(data)  
    const {table_name} = data
     
    return (
      <div>
      <Card className="min-w-[400px] shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">{table_name}</CardTitle>
        </CardHeader>
        <CardContent>
        <TableDisplay data={data} />
        </CardContent>
        
      <CardFooter className="flex justify-between">
        <Badge variant="outline">Explore more</Badge>
      </CardFooter>
      
      </Card>
      
      </div>
    )
  
  
  }
  
  export default TableNode;