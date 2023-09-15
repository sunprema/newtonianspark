import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardDescription,
    CardTitle
} from "@/components/ui/card"
import { Settings } from "lucide-react"

import { Table } from "@/features/database_design/table_schema_types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TableUIData {
    tableData: Table
    layoutData?:object //This should hold element data

}

const DynamicFormDisplay = ({data, id}:{data:TableUIData, id:string}) => {

    const {tableData} = data
    const { columns} = tableData
    return (
        
        <div className="grid w-full items-center gap-4">
        {columns.map( (column, index) => (
            
            <div key={index} className="flex flex-col space-y-1.5">
            <Label htmlFor="title">{column.name}</Label>
            <Input id="title" 
                placeholder="Enter value" />
          </div>
        ))}
        </div>
        
    )
    
    
}



const DynamicFormNode = ({data, id}:{data:TableUIData, id:string})  => {
    const {tableData} = data

    return (
        <div className="w-[500px] shadow-2xl dark:bg-slate-700">
        <Card className="group min-w-[400px] border-2 rounded-xl border-green-400 bg-slate-100 shadow-2xl dark:border-green-400 dark:bg-slate-700">
        <CardHeader className="m-2 border-b border-slate-500 pb-4 dark:border-slate-100" >
          <CardTitle className="flex justify-between text-xl font-semibold uppercase group-hover:text-green-500 group-hover:dark:text-green-500">
            <div>{` FORM: ${tableData.table_name}`}</div>
            <Settings className="nodrag z-50 hover:cursor-pointer" 
             onClick={()=> alert("Edit layout!") }/>  
          </CardTitle>
          <CardDescription className="text-start text-xs font-light">{tableData.description}</CardDescription>
          
        </CardHeader>
        <CardContent className="mt-4">
        <DynamicFormDisplay data={data} id={id} />
        </CardContent>
        <CardFooter>

        </CardFooter>
      </Card>  
      </div>
    )
}

export default DynamicFormNode ;