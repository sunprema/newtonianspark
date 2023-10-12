
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import {memo, useState} from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Handle, Position, useReactFlow, Node, Edge, } from 'reactflow';
import { ContextMenu, Separator } from "@radix-ui/react-context-menu";
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "../ui/context-menu";
import { nanoid } from "nanoid";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"

import axios from 'axios';

type QuestionsAndAnswer = {
  question?:string
  answer?:string
}




const ExplorerNode = ({data , id}:{data:any, id:string}) => {
  const {topic, summary, questions, action} = data
  const {addNodes, addEdges, getNode, setNodes, setEdges} = useReactFlow()
  
  const handleDupe = () => {
    const currentNode = getNode(id)
    if (currentNode){
      const newNode:Node = { 
        ...currentNode,
        id: nanoid(5), 
        position:{ x:currentNode.position.x + 600, y:currentNode.position.y }
      }
      addNodes( newNode)
    }
  }

  const handleNewEmptyExploreNode = (
      {sourceHandle, targetHandle, positionOffset}
      :{sourceHandle:string, targetHandle:string, positionOffset:{x:number, y:number}}) => 
      {
      const currentNode = getNode(id)
      if (currentNode){
        const newNodeId = nanoid(5)
        const newNode:Node = { 
          type:currentNode.type,
          id:newNodeId, 
          position:{  x:currentNode.position.x + positionOffset.x , y: currentNode.position.y + positionOffset.y},
          data:{'action' : 'input'}
        }

        addNodes( newNode)
        const newEdge:Edge = { id : `e-${nanoid(5)}`,
          source : currentNode.id,
          target: newNodeId,
          type : "default",
          sourceHandle, 
          targetHandle,
        }
        addEdges( newEdge)
        
    }
  }

  const handleDelete = () => {
    setNodes( (nodes) => nodes.filter( (node) => node.id !== id))
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id))  
  }

  if (action && action === "input"){
    return <ExplorerNodeInputMode id = {id} />
  }
  
  return (
    <div>
    <ContextMenu>
    <ContextMenuTrigger>  
    <Card className="max-w-[600px] shadow-2xl dark:bg-slate-700">
      <CardHeader>
        <CardTitle className="mb-2">{topic}</CardTitle>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>

      <CardContent>
      <Accordion type="single" collapsible className="w-full">
      {
        questions?.map( 
          ( {question, answer}:QuestionsAndAnswer,
            index:number
          ) => 
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-start"> {question}</AccordionTrigger>
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
    </ContextMenuTrigger>

    <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={() => handleDupe()}>
          Duplicate      
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => handleNewEmptyExploreNode({sourceHandle : "1", targetHandle: "3", positionOffset:{ x: 600, y:0}})}>
          New Node (to the right)
        </ContextMenuItem>
        <ContextMenuItem inset onClick={() => handleNewEmptyExploreNode({sourceHandle : "2", targetHandle: "4", positionOffset:{ x: 0, y:650}})}>
          New Node (to the bottom)
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem inset onClick={handleDelete}>
          Delete
        </ContextMenuItem>

        
      </ContextMenuContent>     
    </ContextMenu>
    </div>
  )


}

const ExplorerNodeInputMode = ({id}:{id:string}) => {
  const [topic, setTopic] = useState<string>()
  const [summary, setSummary] = useState<string>()
  const [question, setQuestion] = useState<string>()
  const [answer, setAnswer] = useState<string>()
  const [questions, setQuestions] = useState<QuestionsAndAnswer[]>([])

  const [generatePrompt, setGeneratePrompt] = useState<string>();
  const [isAiGenerated, setIsAiGenerated ] = useState<boolean>(false)
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  const {setNodes} = useReactFlow()

  const saveQuestion = () => {
    question && answer 
    ? setQuestions( [...questions, {question, answer}])
    :null

    setQuestion("")
    setAnswer("")
  }

  const handleGenerateNodeRequest = async() => {
    setIsAiGenerated(false)
    setIsGenerating(true)
    //handle the request, then set setIsAiGenerated to true
    try{
      const response = await axios.post("/api/contextual/explore", {explore:generatePrompt})
      const {topic, summary, questions, error}:
            {topic:string, summary:string, questions?:QuestionsAndAnswer[], error:string} = response.data
      
      if(error){
        console.log(error)
        return 
      }
      setTopic(topic)
      setSummary(summary)
      setQuestions(questions ?? [])
      setIsAiGenerated(true)
      setIsGenerating(false)
      

    }catch(error){
      setIsGenerating(false)
      console.log(error)
    }
    
    


    return null;
  }

  const clearNode = () => {
    setTopic("")
    setSummary("")
    setQuestion("")
    setAnswer("")
    setQuestions([])
    setIsAiGenerated(false)
    setGeneratePrompt("")

  }

  const saveNode =() => {
    setNodes((nds) =>
          nds.map((node) => {
            if (node.id === id) {
              node.data = {
                topic,
                summary,
                questions,
                action:"display",                
          };
        }
        return node;
        })
        ); 
  }

  return (
    <div className="p-2">
      <Card className="min-h-[600px] min-w-[600px] max-w-[800px] shadow-2xl dark:bg-slate-700">
      <Tabs defaultValue="manual" className="w-full">

        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="generate">Generate</TabsTrigger>
        </TabsList>
        <TabsContent value="manual">
        <CardHeader >
          <CardTitle className="mb-2">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="topic">Topic </Label>
            <Input id="topic" placeholder="Topic for this" value={topic} onChange={(e) => setTopic(e.target.value)}/>
          </div>
          </CardTitle>
          <CardDescription>
          <div className="flex flex-col space-y-1.5 text-sm">
            <Label htmlFor="topic">Summary</Label>
            <Textarea id="summary" placeholder="Write the summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
            
          </div>
          
          </CardDescription>
        </CardHeader>
        
            <CardContent>
            <Accordion type="single" collapsible className="my-4 w-full">
           {
            questions?.map( 
              ( {question, answer}:QuestionsAndAnswer,
                index:number
              ) => 
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-start"> {question}</AccordionTrigger>
                <AccordionContent>
                  {answer}
                </AccordionContent>
              </AccordionItem>
            )

            }
            </Accordion>
            <div className="bg-secondary nodrag p-4">
            <CardTitle>
              <div className="flex flex-col gap-4">
              <Label htmlFor="topic">Question</Label>
              <Input id="topic" placeholder="Topic for this" value={question} onChange={(e) => setQuestion(e.target.value)}/>
              <Label htmlFor="topic">Answer</Label>
              <Textarea id="summary" placeholder="Write the summary" value={answer} onChange={(e) => setAnswer(e.target.value)} />
              <Button variant="outline" onClick={saveQuestion}> Save Q/A</Button>
              </div>
            </CardTitle>
            
           </div> 
            </CardContent>
        </TabsContent>

        <TabsContent value="generate">
            <div className="p-5">

            {/* conditional value based on If generated Text */}
            { isAiGenerated &&
              <>
              <CardHeader >
              <CardTitle className="mb-2">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="topic">Topic </Label>
                <Input id="topic" placeholder="Topic for this" value={topic} onChange={(e) => setTopic(e.target.value)}/>
              </div>
              </CardTitle>
              <CardDescription>
              <div className="flex flex-col space-y-1.5 text-sm">
                <Label htmlFor="topic">Summary</Label>
                <Textarea id="summary" placeholder="Write the summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
                
              </div>
              
              </CardDescription>
              </CardHeader>
          
              <CardContent>
              <Accordion type="single" collapsible className="my-4 w-full">
            {
              questions?.map( 
                ( {question, answer}:QuestionsAndAnswer,
                  index:number
                ) => 
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-start"> {question}</AccordionTrigger>
                  <AccordionContent>
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              )

              }
              </Accordion>
              </CardContent>
              </>
            }

              {/* ----- this is for generate */}
              <CardHeader >
              <CardTitle className="mb-2">
                <div className="flex flex-col gap-4">
                <Label htmlFor="topic">Explore:</Label>
                <Textarea id="summary" 
                    placeholder="I want to explore..." 
                    rows={3}
                    value={generatePrompt} 
                    onChange={(e) => setGeneratePrompt(e.target.value)} />

                <Button variant={"outline"}  className='shrink-0 text-xs' onClick={handleGenerateNodeRequest}>
                  <Sparkles className='mr-2'/>Generate
                </Button>
                </div>

              </CardTitle>
              </CardHeader>
              {
                isGenerating && 
                <CardFooter>

            <div className="flex h-full w-full items-center justify-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                <h4 className="font-mono text-sm font-bold">Exploring...</h4>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
                </CardFooter>
              }
            </div>
        </TabsContent>

      </Tabs>

      <CardFooter>
        {
          topic && summary &&
        <div className="flex w-full justify-between">
        <Button onClick= {clearNode}>Reset</Button>
        <Button onClick={saveNode}>Create Node</Button>
        </div>
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

export const ExplorerNodePresentationMode = ({data , id}:{data:any, id:string}) => {
  const {topic, summary, questions} = data
  
   
  return (
    <div className="w-full p-8 dark:bg-slate-700">
    <div className="flex justify-between gap-12">
      <div className="w-1/3">
        <h1 className="mb-8 text-2xl font-bold"> {topic}</h1>
        <h2 className="text-sm font-medium">{summary}</h2>
      </div>
      <div className="flex flex-1 flex-col">
        {
        questions?.map( 
          ( {question, answer}:
            {question:string, answer:string},
            index:number
          ) => 
            <div key={index} className="w-[2/3]">
                <h4 className="mb-4 font-semibold">{question}</h4>
                <p className="text-sm font-light">{answer}</p>
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