import { memo } from "react";
import { Handle, Position } from "reactflow";
import { Column } from "@/features/database_design/table_schema_types"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import {
    Card,
    CardContent,
  } from "@/components/ui/card"

const GridNode = (
    {data, id}
    :{data:
        {"rows"?:object[],
        "columns"?: Column[],
      "caption"?:string }, 
     id:string}


) => {
  const {rows, columns, caption} = data
  return (
    <>
    <Card className="group min-w-[400px] rounded-xl border-orange-400 bg-slate-100 shadow-2xl dark:border-orange-400 dark:bg-slate-700">
      <CardContent>  
      <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns?.map((column, index) => (
            <TableHead key={`h-${index}`} className="w-[100px]">{column.name}</TableHead>
          )

          )}  
         
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows?.map((dd:any,index) => (
          <TableRow key={index}>
            { columns?.map((column, index) => (
                <TableCell key={`c-${index}`} 
                className="font-medium">
                    {dd[column.name]}
                </TableCell>    
            ))
            }
        </TableRow>
        ))}
      </TableBody>
    </Table>
      <Handle
        type="target"
        position={Position.Bottom}
      />
      </CardContent>
    </Card>
    </>
  );
};

GridNode.displayName = "GridNode";

export default memo(GridNode);