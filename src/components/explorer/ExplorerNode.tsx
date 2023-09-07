
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {memo} from 'react'

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
      
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm" onClick={()=> openSideSheetForNode(id, "explorer") }>explore more</Button>
      {
      /*
      <Link href="/visit/cYHR0KnX6My0PZ30ciom3" target="_blank">
        <Button variant="link" >Go to</Button>
      </Link>
      */
      }

    </CardFooter>
    
    </Card>
    <Handle id="1" type="source" position={Position.Right} className="!h-6 !w-2 !rounded-none !bg-green-500"  ></Handle>
    <Handle id="2" type="source" position={Position.Bottom} className="!h-2 !w-6 !rounded-none !bg-green-500" />
    <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
    <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" />
    </div>
  )


}

export default memo(ExplorerNode) ;