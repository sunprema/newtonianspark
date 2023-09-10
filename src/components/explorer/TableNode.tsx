
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


import { KeyRound, Settings } from "lucide-react"
import { Handle, Position } from "reactflow"
import { Button } from "../ui/button"
import useNsparkStore from "@/config/nsparkStore"

const TableDisplay = ({data}:{data:Table}) => {
  const {columns}:{columns:Column[]|null} = data
  return (
    <div>
      <ul className="space-y-2 divide-y dark:divide-slate-500">
      {
        columns?.map( (column) => {

          return(
            <div className="nodrag relative flex w-[full] items-center p-2" key={column.name}> 
              

              <div className="w-[24px] shrink-0">
                {column.primary_key ? 
                  <KeyRound size={14} className=" stroke-green-600 dark:stroke-green-600" strokeWidth={3.0}/> 
                  : column.foreign_key ? 
                    <KeyRound size={14} className="stroke-orange-800 dark:stroke-orange-100" strokeWidth={3.0}/> : null 
                }
              </div>              
              <div className="flex-auto text-left text-base">{column.name}</div>
              <div className="text-right text-base">{column.type}</div>              
              
              { column.primary_key? 
              <Handle
                      id={`handle-${data.table_name}-${column.name}` }
                      type="target"
                      className="relative -mr-6 !h-4 !w-4 !rounded-full !bg-green-500 ring ring-green-100"
                      position={Position.Right} 
                  /> 
                :column.foreign_key != null ?
                <Handle
                    id={`handle-${data.table_name}-${column.name}` }
                     
                    type="source"
                    className="relative -ml-6 !h-4 !w-4 !rounded-full !bg-orange-500 ring ring-orange-100"
                    position={Position.Left}
                /> : null

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
  
  
  const TableNode = ({data, id}:{data:Table, id:string}) => {
    const {table_name, description} = data
    const openSideSheetForNode = useNsparkStore( (state) => state.openSideSheetForNode)
    
     
    return (
      <div>
      <Card className="group min-w-[400px] rounded-xl border-orange-400 bg-slate-100 shadow-2xl dark:border-orange-400 dark:bg-slate-700">
        <CardHeader className="m-2 pb-4 border-b border-slate-500 pb-4 dark:border-slate-100" >
          <CardTitle className="flex justify-between text-xl font-semibold uppercase group-hover:text-orange-500 group-hover:dark:text-orange-500">
            <div>{table_name}</div>
            <Settings className="nodrag z-50 hover:cursor-pointer"  onClick={()=> openSideSheetForNode(id, "table") }/>  
          </CardTitle>
          {/*<CardDescription className="text-start text-lg font-medium">{description}</CardDescription> */}
          
        </CardHeader>
        <CardContent className="mt-4">
        <TableDisplay data={data} />
        </CardContent>
      </Card>
      
      </div>
    )
  
  
  }
  
  export default TableNode;