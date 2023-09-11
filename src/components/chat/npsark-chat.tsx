'use client';

import {memo} from 'react'
import { useChat } from 'ai/react';
import {useRouter} from 'next/navigation'
import { Card, CardContent, CardHeader } from '../ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '../ui/button';
import { Sparkle, Sparkles, Trash2, User2 } from 'lucide-react';

import { Label } from "@/components/ui/label"
import { Textarea } from '../ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "../ui/badge";
import axios from 'axios';
import { Edge, Node, useReactFlow } from 'reactflow';
import { useToast } from '../ui/use-toast';

const NSparkChatWindow =  ({mode}:{mode?:string}) => {
  const { addNodes, addEdges } = useReactFlow();
  const {toast} = useToast()
  const { messages,setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  

  const handleUsePrompt = async(promptMessage:string, mode:string) => {
    const apiToCall = mode === 'table' ? 'ddl' : mode
    const response = await axios.post(`/api/${apiToCall}`,{explore:promptMessage})
    const {nodes,edges,error}:{ nodes:Node[]|null, edges:Edge[]|null,error:string } = response.data
    
    if(error != null || error !== ''){
    toast({
        title: "Unexpected failure",
        description: error,
      })
}

if(nodes != null){
    addNodes( nodes)
    if( edges != null){
      addEdges(edges)
    }
    
    toast({
        title: "Success ",
        description: `Nodes returned : ${nodes?.length} , Edges returned : ${edges?.length}`,
    })
}  

}

  return (
    <div className="flex w-[full] min-w-[300px] flex-col p-0">
        <Card className="rounded-none border-none p-0 shadow-none outline-none dark:bg-inherit">
        <CardHeader >
        <div className='flex'>
          <h6 className="flex-1 scroll-m-20 text-xs font-bold tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Chat</h6>
          <Trash2 className="hover:text-orange-500" size={16} onClick={ () => setMessages([]) }/>
        </div>
        </CardHeader>  
        <CardContent className='mt-2 flex-1'>    
        <ScrollArea className="h-[400px] w-[full]">
        <ul className="space-y-4 divide-y dark:divide-slate-500"> 
        {messages.map(m => (
        <div key={m.id}>
          <div className="flex items-center align-middle">
          
          {m.role === 'user' ? <div> <User2 size={16}/> </div>: <div> <Sparkle size={16} /> </div>}

          <p className="p-2 text-sm font-normal">
          {m.content}
          </p>
          </div>
          {m.role === "assistant" && m.content.toLowerCase().includes("prompt") && !isLoading
          ? <div ><Badge variant="default" className="text-xs dark:bg-gray-400" onClick={() => handleUsePrompt( m.content, mode)}>use prompt</Badge> </div>
          :null
          }

        </div>

        ))}
        </ul> 
       </ScrollArea>
       <div>
        <form onSubmit={handleSubmit}>
        <input type="hidden" name="mode" value={mode ?? "explore"} />   
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="explore" className="text-xs font-bold">Make my {mode} prompt better!</Label>
          <Textarea id="explore" placeholder="Ask your question!" value={input} onChange={handleInputChange} 
            rows={1}
            className="flex-1 resize rounded-none border-gray-100 text-sm outline-none"/>
          <Button variant={"secondary"}  className='shrink-0 text-xs'><Sparkles className='mr-2'/>Send</Button>
          
        </div>
      </form>
      </div>  
       </CardContent>  
       
       </Card>

      
    </div>
  );
}

const NSparkChat = ({mode}:{mode?:string}) => {
  return(
    <div className="absolute right-8 top-8">
    <Popover>
      <PopoverTrigger>
        <Button size="icon" className="relative h-[24px] w-[24px] rounded-full bg-orange-500 shadow-2xl dark:bg-orange-500" >
        <Sparkles size={32} />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-8 min-h-[500px] min-w-[450px]  border-orange-500 shadow-2xl dark:border-orange-500 dark:bg-slate-700">
      <NSparkChatWindow mode={mode} />
      </PopoverContent>
    </Popover>
    </div>
  )
}


const NSparkHomeChat =  ({mode}:{mode?:string}) => {
  const { messages,setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const router = useRouter()

  const handleUsePrompt = (promptMessage:string, mode:string) => {
    const apiToCall = mode === 'table' ? 'ddl' : mode
    router.push(`/${apiToCall}?topic=${encodeURIComponent(promptMessage)}`)    
  }

  return (
    <div className="container flex flex-col border border-orange-500 p-0  shadow-2xl dark:border-orange-500 dark:bg-slate-700 sm:min-w-[800px]">
        <Card className="rounded-none border-none p-0 shadow-none outline-none dark:bg-inherit">
        <CardHeader >
        <div className='flex'>
          <h6 className="flex-1 scroll-m-20 text-xs font-bold tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Chat</h6>
          <Trash2 className="hover:text-orange-500" size={16} onClick={ () => setMessages([]) }/>
        </div>
        </CardHeader>  
        <CardContent className='mt-2 flex-1'>    
        <ScrollArea className="h-[400px] w-[full]">
        <ul className="space-y-4 divide-y dark:divide-slate-500"> 
        {messages.map(m => (
        <div key={m.id}>
          <div className="flex items-center align-middle">
          
          {m.role === 'user' ? <div> <User2 size={16}/> </div>: <div> <Sparkle size={16} /> </div>}

          <p className="p-2 text-sm font-normal">
          {m.content}
          </p>
          </div>
          {m.role === "assistant" && m.content.toLowerCase().includes("prompt") && !isLoading
          ? <div ><Badge variant="default" className="text-xs dark:bg-gray-400" onClick={() => handleUsePrompt( m.content, mode)}>use prompt</Badge> </div>
          :null
          }

        </div>

        ))}
        </ul> 
       </ScrollArea>
       <div>
        <form onSubmit={handleSubmit}>
        <input type="hidden" name="mode" value={mode ?? "explore"} />   
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="explore" className="text-xs font-bold">Make my {mode} prompt better!</Label>
          <Textarea id="explore" 
            placeholder={mode === "table" 
            ? "Detailed database instructions!" 
            :  "Explore your ideas"}  
            value={input} onChange={handleInputChange} 
            rows={1}
            className="flex-1 resize rounded-none border-gray-100 text-sm outline-none"/>
          <Button variant={"secondary"}  className='shrink-0 text-xs'><Sparkles className='mr-2'/>Send</Button>
          
        </div>
      </form>
      </div>  
       </CardContent>  
       
       </Card>

      
    </div>
  );
}

export {NSparkHomeChat}

export default memo(NSparkChat) ;