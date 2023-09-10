'use client';
 
import { useChat } from 'ai/react';
import { cn } from "@/lib/utils"
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from '../ui/button';
 
export default function NSparkChat(props:{className?:string}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const {className} = props
  return (
    <div className="fixed bottom-10 right-10 mx-auto max-h-full flex max-w-md flex-col">
        <Card className='rounded-none'>
        <CardContent>    
        <ScrollArea>
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
       </Card>

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            className="mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}