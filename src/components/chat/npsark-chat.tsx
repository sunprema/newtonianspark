'use client';
 
import { useChat } from 'ai/react';
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '../ui/button';
import { Sparkles, Trash2 } from 'lucide-react';

import { Label } from "@/components/ui/label"
import { Textarea } from '../ui/textarea';

 
export default function NSparkChat(props:{className?:string}) {
  const { messages,setMessages, input, handleInputChange, handleSubmit } = useChat();
  const {className} = props
  return (
    <div className="fixed bottom-80 right-4 mx-auto  hidden max-h-[500px] w-[500px] max-w-md md:visible md:flex md:flex-col">
        <Card className='rounded-none border border-orange-500 bg-slate-100 shadow-2xl dark:border-orange-400 dark:bg-slate-700'>
        <CardHeader className='border-b-1 border-slate-800 bg-white'>
        <div className='flex '>
          <h4 className='flex-1'>Chat</h4>
          <Trash2 onClick={ () => setMessages([]) }/>
        </div>
        </CardHeader>  
        <CardContent className='mt-2'>    
        <ScrollArea className="h-[400px] w-[350px] rounded-md border p-4 mx-auto">
        {messages.map(m => (
        <div key={m.id} >
          <h4 className="text-sm font-normal">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
          </h4>
        </div>

        ))}
       </ScrollArea>
       </CardContent>  
       <CardFooter className="p-2">
        <form onSubmit={handleSubmit}> 
        <div className="grid w-full max-w-sm items-center gap-1.5">
          
          <Label htmlFor="explore">Explore...</Label>
          <span className='inset-y-0 left-0 bottom-0 flex items-center'>
          <Textarea id="explore" placeholder="Ask your question!" value={input} onChange={handleInputChange} rows={2}  className="flex-1 resize outline-none w-[300px]"/>
          <Button variant={"secondary"}  className='shrink-0'><Sparkles className='mr-2'/>Send</Button>
          </span>
        </div>
      </form>

       </CardFooter>
       </Card>

      
    </div>
  );
}