'use client'


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"

  
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const ExplorerNodeReadable = ({data , id}:{data:any, id:string}) => {
    const {topic, summary, questions} = data

    return (

        <Card className="shadow-2xl dark:bg-slate-700">
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

    )
}

export default ExplorerNodeReadable ;