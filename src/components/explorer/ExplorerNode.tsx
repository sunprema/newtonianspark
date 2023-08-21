
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Handle, Position } from 'reactflow';
import Link from "next/link";
import { Button } from "../ui/button";



const ExplorerNode = ({data}:{data:any}) => {
  console.log(data)  
  const {topic, summary, questions} = data
   
  return (
    <div>
    <Card className="w-[500px]">
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
      <Badge variant="outline">Cancel</Badge>
      <Link href="/visit/cYHR0KnX6My0PZ30ciom3" target="_blank">
        <Button variant="link" >Go to</Button>
      </Link>
    </CardFooter>
    
    </Card>
    <Handle id="1" type="source" position={Position.Right} className="!h-6 !w-2 !rounded-none !bg-green-500"  />
    <Handle id="2" type="source" position={Position.Bottom} className="!h-2 !w-6 !rounded-none !bg-green-500" />
    <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
    <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" />
    </div>
  )


}

export default ExplorerNode ;