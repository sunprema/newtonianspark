'use client';

import * as React from "react"
import { useChat } from 'ai/react';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '../ui/button';
import { Plus, Sparkles, Trash2 } from 'lucide-react';

import { Label } from "@/components/ui/label"
import { Textarea } from '../ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

 
const NSparkChatWindow =  ({mode}:{mode:string}) => {
  const { messages,setMessages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="w-[full] flex flex-col min-w-[300px] p-0">
        <Card className="dark:bg-inherit rounded-none border-none shadow-none p-0 outline-none">
        <CardHeader >
        <div className='flex'>
          <h6 className="flex-1 scroll-m-20 text-xs font-bold tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Chat</h6>
          <Trash2 size={16} onClick={ () => setMessages([]) }/>
        </div>
        </CardHeader>  
        <CardContent className='mt-2 flex-1'>    
        <ScrollArea className="w-[full] h-[400px]">
        <ul className="space-y-4 divide-y dark:divide-slate-500"> 
        {messages.map(m => (
        <div key={m.id}>
          <h4 className="text-sm font-normal p-2">
          {m.role === 'user' ? 
          'User: ' : 
          'AI: '}
          {m.content}
          </h4>
        </div>

        ))}
        </ul> 
       </ScrollArea>
       <div>
        <form onSubmit={handleSubmit}> 
        <div className="flex flex-col w-full gap-2">
          <Label htmlFor="explore" className="text-xs font-bold">Explore...</Label>
          <Textarea id="explore" placeholder="Ask your question!" value={input} onChange={handleInputChange} 
            rows={1}
            className="flex-1 resize outline-none rounded-none text-sm border-gray-100"/>
          <Button variant={"secondary"}  className='shrink-0 text-xs'><Sparkles className='mr-2'/>Send</Button>
          
        </div>
      </form>
      </div>  
       </CardContent>  
       
       </Card>

      
    </div>
  );
}

const NSparkChat = () => {
  return(
    <div className="absolute right-8 top-8">
    <Popover>
      <PopoverTrigger>
        <Button size="icon" className="relative h-[24px] w-[24px] rounded-full bg-orange-500 shadow-2xl dark:bg-orange-500" >
        <Sparkles size={32} />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="mr-8 min-w-[450px] min-h-[500px]  border-orange-500 shadow-2xl dark:border-orange-500 dark:bg-slate-700">
      <NSparkChatWindow mode="table" />
      </PopoverContent>
    </Popover>
    </div>
  )
}

export default NSparkChat ;