
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"

import { Column, Table } from "@/features/database_design/table_schema_types"
import { useToast } from '../ui/use-toast';

import { KeyRound, Settings } from "lucide-react"
import { Handle, Node, Position, useReactFlow } from "reactflow"

import useNsparkStore from "@/config/nsparkStore"
import { ContextMenu, ContextMenuItem, ContextMenuTrigger, ContextMenuContent, ContextMenuSeparator } from "../ui/context-menu"
import { nanoid } from "nanoid"
import  Axios from "axios"

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
    const {table_name} = data
    const openSideSheetForNode = useNsparkStore( (state) => state.openSideSheetForNode)
    const {addNodes, getNode, setNodes, setEdges} = useReactFlow()
    const {toast} = useToast()  
    
    const handleDupe = () => {
      const currentNode = getNode(id)
      if (currentNode){
        const newNode:Node = { 
          ...currentNode,
          id: nanoid(5), 
          position:{ x:currentNode.position.x + 500, y:currentNode.position.y }
        }
        addNodes( newNode)
      }
    }

    //Node to handle crud screen
    const handleCRUDScreen = () => {
      const currentNode = getNode(id)
      if (currentNode){
        const newNode:Node = { 
          type: "dynamicFormNode",
          data: { tableData: data,  },
          id: nanoid(5), 
          position:{ x:currentNode.position.x + 500, y:currentNode.position.y }
          
        }
        addNodes( newNode)
      }
    }


    const handleDummyData = async() => {
      const currentNode = getNode(id)
      if (currentNode){
        try{
          const response = await Axios.post('/api/contextual/table', 
          {
            "systemPromptFromUser" : `You are a database domain expert. User will provide a table scheme as JSON string. 
            You will provide dummy data for that request. The response should only be a JSON with "dummy_data" as key and value as list of records for the table.`,
            "humanMessage":JSON.stringify(currentNode.data),
            
          });
          console.log(response.data)
          const {result, error} = response.data
          const resultJSON = JSON.parse(result.text)
          const dummyData = resultJSON?.dummy_data ?? []  

          if(error){
            toast({
              title: "Dummy data generation failed, Please try again later",
              variant: "destructive" ,
              description: `error : ${error}`,
            })
          }
          const newNode:Node = { 
            type: "grid",
            data: { "rows" : dummyData , "columns" : currentNode.data.columns, "caption" : table_name},
            id: nanoid(5), 
            position:{ x:currentNode.position.x + 500, y:currentNode.position.y }
          }
          addNodes( newNode)
        }catch(error){
          toast({
            title: "Dummy data generation call failed, Please try again later",
            variant: "destructive" ,
            description: `error : ${error}`,
          })
      }
    }
   }

    const handleDelete = () => {
      setNodes( (nodes) => nodes.filter( (node) => node.id !== id))
      //remove the edges as well
      setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id))  
    }
     
    return (
      <div >
      <ContextMenu>
      <ContextMenuTrigger>
      <Card className="group min-w-[400px] rounded-xl border-orange-400 bg-slate-100 shadow-2xl dark:border-orange-400 dark:bg-slate-700">
        <CardHeader className="m-2 border-b border-slate-500 pb-4 dark:border-slate-100" >
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

      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={handleDummyData}>
          Create dummy data
        </ContextMenuItem>
        <ContextMenuItem inset onClick={handleDupe}>
          Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={handleDelete}>
          Delete
        </ContextMenuItem>

        <ContextMenuItem inset onClick={handleCRUDScreen}>
        Create UI for this table
        </ContextMenuItem>

        

      </ContextMenuContent>
        
      </ContextMenu>  
      
      
      </div>
    )
  
  
  }
  
  export default TableNode;