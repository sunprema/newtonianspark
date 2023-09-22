
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {ReactNode, memo} from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Handle, Position } from 'reactflow';
import Link from "next/link";
import { Button } from "../ui/button";
import useNsparkStore from "@/config/nsparkStore";
import { Separator } from "@radix-ui/react-context-menu";



const ExplorerNode = ({data , id}:{data:any, id:string}) => {
  const {topic, summary, questions} = data
  const openSideSheetForNode = useNsparkStore( (state) => state.openSideSheetForNode)
   
  return (
    <div>
    <Card className="w-[500px] shadow-2xl dark:bg-slate-700">
      <CardHeader>
        <CardTitle>{topic}</CardTitle>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>

      <CardContent>
      <Accordion type="single" collapsible className="w-full">
      {
        questions.map( 
          ( {question, answer}:{question:string, answer:string},
            index:number
          ) => 
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger> {question}</AccordionTrigger>
            <AccordionContent>
              {answer}
            </AccordionContent>
          </AccordionItem>    
        )
      }
    </Accordion>
    </CardContent>
    
    </Card>
    <Handle id="1" type="source" position={Position.Right} className="!h-6 !w-2 !rounded-none !bg-green-500"  ></Handle>
    <Handle id="2" type="source" position={Position.Bottom} className="!h-2 !w-6 !rounded-none !bg-green-500" />
    <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
    <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" />
    </div>
  )


}



export const ExplorerNodePresentationMode = ({data , id}:{data:any, id:string}) => {
  const {topic, summary, questions} = data
  
   
  return (
    <div className="w-3/4 dark:bg-slate-700">
    <div className="flex justify-between gap-12">
      <div className="w-1/3">
        <h1 className="text-2xl font-bold mb-8"> {topic}</h1>
        <h2 className="font-medium text-sm">{summary}</h2>
      </div>
      <div className="flex-1 flex flex-col">
        {
        questions.map( 
          ( {question, answer}:
            {question:string, answer:string},
            index:number
          ) => 
            <div key={index} className="w-[2/3]">
                <h4 className="font-semibold mb-4">{question}</h4>
                <p className="font-light text-sm">{answer}</p>
                <Separator className="my-4" />
            </div>  
        )
        }
      </div>

    </div>
   </div>

      
  )


}

export default memo(ExplorerNode) ;