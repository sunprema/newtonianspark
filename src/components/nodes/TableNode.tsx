
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
  } from "@/components/ui/card"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"  

import { Checkbox } from "@/components/ui/checkbox"

import { Column, Table } from "@/features/database_design/table_schema_types"
import { useToast } from '../ui/use-toast';

import { KeyRound } from "lucide-react"
import { Handle, Node, Position, useReactFlow } from "reactflow"
import { ContextMenu, ContextMenuItem, ContextMenuTrigger, ContextMenuContent, ContextMenuSeparator } from "../ui/context-menu"
import { nanoid } from "nanoid"
import  Axios from "axios"
import { memo, useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button";


const columnTypes = [
  'integer',
  'bigint',
  'smallint',
  'numeric(precision, scale)',
  'real',
  'double precision',
  'character varying(n)',
  'character(n)',
  'text',
  'bytea',
  'timestamp',
  'date',
  'time',
  'interval',
  'boolean',
  'enum',
  'uuid',
  'bit(n)',
  'bit varying(n)',
  'tsvector',
  'tsquery',
] 


const DataTypeSelector = ({selectedValue, onValueChange}:{selectedValue?:string, onValueChange:(a:string)=>void}) => {  
    
  return(
    <Select value={selectedValue} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="DataType" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Data Types</SelectLabel>
          {columnTypes.map((c,index) =>
            <SelectItem key={index} value={c}>{c}</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )

}

const ColumnsDisplay = ({data}:{data:Table}) => {
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
  
  
  const TableDisplayCard = ({data, id}:{data:Table, id:string}) => {
    const {table_name} = data
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
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
        <ColumnsDisplay data={data} />
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



  const TableInputCard = ({id}:{id:string}) => {
    const [ tableName, setTableName] = useState<string>()
    const [ description, setDescription] = useState<string>()
    const [ columns, setColumns ] = useState<Column[]>()
    const { getNode, setNodes } = useReactFlow()

    const addColumn =() => {
      const newColumns = []
      
      if(columns)
      for(let i = 0 ; i < (columns?.length ?? 0) ; i++){
        newColumns.push(columns[i])
      }
      newColumns.push({ name:"", type:"" })   
      setColumns(newColumns)   
    }
    
    const handleColumnName = (index:number, name:string) => {
       const newColumns = columns?.map( (c , cindex) => {
          if ( cindex === index){
            c.name = name
          }
          return c
       })
       setColumns(newColumns)

    }

    const handleColumnType = (index:number, ctype:string) => {
      const newColumns = columns?.map( (c , cindex) => {
        if ( cindex === index){
          c.type = ctype
        }
        return c
     })

     setColumns(newColumns)
    }

    const handleClear =() => {
      setTableName("")
      setDescription("")
      setColumns([])
    }

    const handleSave =() => {
      const currentNode = getNode(id)
      if(currentNode && tableName){

        const newNode:Node = {
          "id": tableName,
          "data": {"action":"display", "table_name": tableName , description, columns},
          "position" : currentNode.position,
          "type" : "table"
        }
  
        setNodes( (nodes) => {
          const otherNodes = nodes.filter( (node) => node.id !== id)
          otherNodes.push(newNode)
          return otherNodes
  
  
        })
      }
      
    }

    const handlePrimaryKey = (index:number) =>{
      const newColumns = columns?.map( (c , cindex) => {
        if ( cindex === index){
          c.primary_key = c.primary_key ? !c.primary_key : true
        }
        return c
     })

     setColumns(newColumns)
    }
    

    return (
      <div className="w-[500px] shadow-2xl bg-slate-50 dark:bg-slate-700">
        <CardHeader>
          <CardTitle>Add a Table</CardTitle>
          <CardDescription>You can add a table</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="tableName">Table Name</Label>
              <Input id="title" placeholder="Enter table name" value={tableName} onChange={(e) => setTableName(e.target.value)}/>
              <Label htmlFor="description">Description</Label>
              <Input id="title" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              <div className='flex w-full gap-2 m-2 mt-4 py-5'>
                <Label className="flex-1">Column Name</Label>
                <Label>Data Type</Label>
                <Label>PK</Label>
                <Label>FK</Label>
              </div>
              {
                columns?.map( (column, index) => (
                  <div key={index} className='flex w-full gap-2'>

                    <Input id="columnName" placeholder="column name" value={column.name} onChange={(e) => handleColumnName(index, e.target.value)}/>
                    <DataTypeSelector selectedValue={column.type} onValueChange={(value) => handleColumnType( index, value)}/>
                    <Checkbox checked={column.primary_key} onCheckedChange={()=>handlePrimaryKey(index)}></Checkbox>
                    
                  </div>  
                ))
              }
              <Button onClick={addColumn}> Add Column </Button>
            </div>
          </div>  
        </CardContent>     
        <CardFooter>
          <div className="flex w-full justify-around">
            <Button onClick={handleClear}>Clear</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>

        </CardFooter>
      
      </div>

    )
  }

  const TableNode = ({data, id}:{data:Table, id:string}) => {
    const {action} = data

    let tableCard = null
    switch(action){
        case "input":
          tableCard = <TableInputCard id={id} />
          break
        
        case null:  
        case "display":
          tableCard = <TableDisplayCard id={id} data={data} />
          break 

        default:
          tableCard = tableCard ??  <TableDisplayCard id={id} data={data} />
          break              
    }
    

    return tableCard ;
  }

  
  
  export default memo(TableNode);