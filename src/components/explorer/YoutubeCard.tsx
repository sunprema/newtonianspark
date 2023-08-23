import {useState} from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"
  
  import { Handle, NodeToolbar, Position } from 'reactflow';
  import Link from "next/link";
  import { Button } from "../ui/button";
  import useExploreStore from "@/config/store";
import Image from "next/image";
import { Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';

  


  const YoutubeCard = ({data, id}:{data:any, id:string}) => {

    const openSideSheetForNode = useExploreStore( (state) => state.openSideSheetForNode)
    const {topic, summary, videoId} = data
    const [ videoIsOpen, setVideoIsOpen] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)
    
    const embedHtml = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    allowfullscreen></iframe>`

    return (
      <div>
        
      <Card className= "shadow-2xl dark:bg-slate-700" onClick={() => setShowToolbar( () => !showToolbar)}>
        <CardHeader>
          <CardTitle>{topic}</CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardHeader>
        
        <CardContent>
          { !videoIsOpen &&   
            <div className="nodrag" onClick={()=> setVideoIsOpen(true)}>            
              <Image className="object-cover" src={`https://img.youtube.com/vi/${videoId}/0.jpg`} width={560} height={315} alt={"Youtuve video"} />
            </div>  
          }
           { videoIsOpen &&   
            <div dangerouslySetInnerHTML={{__html : embedHtml}} />
           }           
           
           
        </CardContent>
        
        <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={()=> openSideSheetForNode(id) }>explore more</Button>
        <Link href="/visit/cYHR0KnX6My0PZ30ciom3" target="_blank">
            <Button variant="link" >Go to</Button>
        </Link>
        </CardFooter>
      </Card>
      <Handle id="1" type="source" position={Position.Right} className="!h-6 !w-2 !rounded-none !bg-green-500"  />
      <Handle id="2" type="source" position={Position.Bottom} className="!h-2 !w-6 !rounded-none !bg-green-500" />
      <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
      <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" />

      <NodeToolbar isVisible={showToolbar} position={Position.Right} className='flex flex-col space-y-2  border p-1 shadow-lg bg-muted-foreground'>
           <Button size="icon" className='h-[4] w-[4]'><Trash2 strokeWidth={0.5} /></Button>
           <Separator />
           <Button size="icon" className='h-[4] w-[4]'><Trash2 strokeWidth={0.5} /></Button>
      </NodeToolbar>    
      
      </div>
    )
  
  
  }
  
  export default YoutubeCard ;