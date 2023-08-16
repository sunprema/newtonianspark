

import { Button } from "@/components/ui/button"
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



const ExplorerNode = ({data}:{data:any}) => {
  console.log(data)  
  const {topic, summary, questions} = data
   
  return (
    <Card className="w-[500px] ">
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
            <AccordionTrigger className={'flex items-start justify-start text-sm '}>{question}</AccordionTrigger>
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
        <Badge variant="outline" onClick={() => alert("Hi")}>Deploy</Badge>
      </CardFooter>
    </Card>
  )


}

export default ExplorerNode ;