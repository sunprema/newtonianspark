/* eslint-disable @next/next/no-img-element */

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"
  
  
import { Handle, Position, useReactFlow } from 'reactflow';
import { Button } from "../ui/button";
import { useToast } from '../ui/use-toast';
import { memo, useState } from "react";
import Link from "next/link";

const LinkInputCard = ( {nodeId}:{nodeId:string} ) => {

    const [title, setTitle] = useState<string>()
    const [summary, setSummary] = useState<string>()
    const [coverImageURL, setCoverImageURL] = useState<string>()
    const [flowKey, setFlowKey] = useState<string>()

    const [flowCopied, setFlowCopied] = useState<boolean>()
    const { setNodes } = useReactFlow();
    const {toast} = useToast()

    const handleFlowFromClipboard = async() => {
      const flowText = await navigator.clipboard.readText()
      if (flowText){
        try{
          const flowData = JSON.parse(flowText)
          const {title, summary, coverImageURL, flowKey}  = flowData  
          
          setTitle(title)
          setSummary(summary)
          setCoverImageURL(coverImageURL)
          setFlowKey(flowKey)

          setFlowCopied(true)
          
        }catch(e){
          toast({
            title: "Flow copy failed, Invalid flow data from clipboard",
            variant: "destructive" ,
            description: `error : ${e}`,
          })
        }
        
      }
    }

    const handleClear = () => {
      setFlowCopied(false)
    }

    const handleSave = () => {

      setNodes((nds) =>
          nds.map((node) => {
            if (node.id === nodeId) {
              node.data = {
               flowKey,
               title,
               summary,
               coverImageURL,
               action:'display'
          };
        }
        return node;
        })
      ); 

    }

    return(
      
      flowCopied ?
      (
        <div className="min-h-[250px] w-[250px]">
             <Card className="group rounded-md bg-slate-100 shadow-2xl hover:border-orange-500  dark:bg-slate-700 dark:shadow-lg dark:hover:border-orange-500">
                    <CardHeader className="p-0">
                    <div className="flex flex-col space-y-2">
                    <img src={coverImageURL ?? './thoughts.svg' } alt="cover image" className="h-[150px] w-[full] object-cover" loading="lazy" />
                    <CardTitle className="p-5">
                        <h3 className="scroll-m-20 text-sm font-bold tracking-tight group-hover:text-orange-500 ">
                            {title}
                        </h3>
                    </CardTitle>
                    </div>
                    </CardHeader>
                    
                    <CardContent className="p-2">
                        <p className="scroll-m-20 text-xs font-light tracking-tight text-gray-800 dark:text-gray-100">
                        {summary}
                        </p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full justify-around p-2">
                        <Button onClick={handleClear}>Clear</Button>
                        <Button onClick={handleSave}>Save</Button>
                      </div>
                    </CardFooter>
                </Card>
          </div>

      )  
       
      :(
      <div className="h-[250px] w-[250px] p-2 ">
        <div className="flex items-center justify-center border-dashed border border-gray-500 h-full w-full">
          
          <Button onClick={handleFlowFromClipboard}>
           Paste flow
          </Button>

        </div>

      </div>
      )
    )
  }


  const LinkDisplayCard =  ( {nodeId, data}:{nodeId:string, data:any} ) => {

    
  const {title,summary, flowKey, coverImageURL} = data

   return (
    <div className="min-h-[250px] w-[250px]">
             <Card className="group rounded-md bg-slate-100 shadow-2xl hover:border-orange-500  dark:bg-slate-700 dark:shadow-lg dark:hover:border-orange-500">
                    <CardHeader className="p-0">
                    <div className="flex flex-col space-y-2">
                    <img src={coverImageURL ?? './thoughts.svg' } alt="cover image" className="h-[150px] w-[full] object-cover" loading="lazy" />
                    <CardTitle className="p-5">
                        <h3 className="scroll-m-20 text-sm font-bold tracking-tight group-hover:text-orange-500 ">
                            {title}
                        </h3>
                    </CardTitle>
                    </div>
                    </CardHeader>
                    
                    <CardContent className="p-2">
                        <p className="scroll-m-20 text-xs font-light tracking-tight text-gray-800 dark:text-gray-100">
                        {summary}
                        </p>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full p-2">
                        <Link  href={`/visit/${flowKey}`} target="_blank"><Button variant="link"> Go to flow </Button></Link>
                      </div>
                    </CardFooter>
                </Card>
                <Handle id="1" type="source" position={Position.Right} className="!h-6 !w-2 !rounded-none !bg-green-500"  />
                <Handle id="2" type="source" position={Position.Bottom} className="!h-2 !w-6 !rounded-none !bg-green-500" />
                <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
                <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" />
          </div>
   )  
  }

  const LinkCard = ({data, id}:{data:{action:'input'|'display'}, id:string}) => {

    const {action} = data

    let linkCard = null
    switch(action){
        case "input":
          linkCard = <LinkInputCard nodeId={id} />
          break
        
        case "display":
          linkCard = <LinkDisplayCard nodeId={id} data={data} />
          break

        default:              
          linkCard=<h4>Hello Hello</h4>
    } 
    
    return linkCard ;
  }

  
  export default memo(LinkCard) ;