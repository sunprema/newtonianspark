
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
import useNsparkStore from "@/config/nsparkStore"
  
const MindMapNode = ({data, id}:{data:{label:string, comment?:string}, id:string}) => {
    const {label, comment} = data
    const openSideSheetForNode = useNsparkStore( (state) => state.openSideSheetForNode)
    
     
    return (
      <div className="">
      <Card className="group min-w-[400px] max-w-xs border-orange-400 bg-slate-100 shadow-2xl dark:border-orange-400 dark:bg-slate-700">
        <CardHeader className="border-b border-slate-500" >
          <CardTitle className="text-center text-base font-semibold group-hover:text-orange-500 group-hover:dark:text-orange-500 ">{label}</CardTitle>          
        </CardHeader>
        {comment ?
            <CardContent className="mt-4">
            <p>{comment}</p>
            </CardContent>
         : null }
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


  export const MindMapNodePresentationMode = ({data, id}:{data:{label:string, comment?:string}, id:string}) => {
    const {label, comment} = data
    return (

    <div className="w-3/4 dark:bg-slate-700">
    <div className="flex justify-between gap-12">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold mb-8"> {label}</h1>        
      </div>
      <div className="flex-1 flex flex-col">
        <div className="w-[2/3]">
          <h4 className="font-semibold mb-4">{comment}</h4>
         </div>
      </div>
    </div>
    </div>  
    )
  }