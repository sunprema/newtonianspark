
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"


import { Handle, Position } from "reactflow"
import { Button } from "../ui/button"
import useDDLStore from "@/config/ddlStore"
  
const MindMapNode = ({data, id}:{data:{label:string, comment?:string}, id:string}) => {
    const {label, comment} = data
    const openSideSheetForNode = useDDLStore( (state) => state.openSideSheetForNode)
     
    return (
      <div className="">
      <Card className="group min-w-[400px] max-w-xs shadow-2xl border-orange-400 dark:border-orange-400 bg-slate-100 dark:bg-slate-700">
        <CardHeader className="border-slate-500 border-b" >
          <CardTitle className="text-center text-base font-semibold group-hover:text-orange-500 group-hover:dark:text-orange-500 ">{label}</CardTitle>          
        </CardHeader>
        {comment ?
            <CardContent className="mt-4">
            <p>{comment}</p>
            </CardContent>
         : null }   
        <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={()=> openSideSheetForNode(id) }>more</Button>
        </CardFooter>        
      </Card>
      <Handle
                    
            type="source"
            className="!h-3 !w-3 !rounded-full !bg-green-400"
            position={Position.Bottom}
        />

      <Handle
                    
            type="target"
            className="!h-3 !w-3 !rounded-full !bg-red-400"
            position={Position.Top}
        />
      </div>
    )
  
  
  }
  
  export default MindMapNode;