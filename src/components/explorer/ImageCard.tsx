import {useCallback, useState} from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"
  
  import { Handle, NodeToolbar, Position, useReactFlow } from 'reactflow';
  import Link from "next/link";
  import { Button } from "../ui/button";
  import useExploreStore from "@/config/store";
import Image from "next/image";
import { Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from "@/components/ui/label"
  


  const ImageCard = ( {nodeId}:{nodeId:string} )=> {

    const [topic, setTopic] = useState("")
    const [summary, setSummary] = useState("")
    const [imageData, setImageData] = useState("")
    const { setNodes } = useReactFlow();   

    const generateImage = async() => {
      
      //here we will first generate an image using DallE, and add the data to the node.
      
      
      //Here we will use the node state and modify the nodes.

      setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            topic,
            summary,
            imageData
          };
        }

        return node;
      })
    ); 
    
    }
    

    return (
    <div className="h-[500px] w-[500px] shadow-2xl dark:bg-slate-700">
      <Card>

      <CardHeader>
        <CardTitle>Add a image</CardTitle>
        <CardDescription>You can embed images in your document</CardDescription>
      </CardHeader>

      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title for this image" value={topic} onChange={(e) => setTopic(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="summary">Image Summary</Label>
              <Input id="summary" placeholder="Describe what you want the image to be." value={summary} onChange={(e) => setSummary(e.target.value)}/>              
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="videoId">Video URL/Id</Label>
              <Input id="videoId" placeholder="Youtube Video URL or VideoId" value={videoId} onChange={(e) => setVideoId(e.target.value)} />              
            </div>
          </div>        
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={ ()=> generateImage()}>DallE, make me an image!</Button>
      </CardFooter>

      </Card>
    </div>

    )

  }


  const YoutubeCard = ({data, id}:{data:any, id:string}) => {

    const openSideSheetForNode = useExploreStore( (state) => state.openSideSheetForNode)
    const {topic, summary, videoId, mode} = data
    const [ videoIsOpen, setVideoIsOpen] = useState(false)
    const [showToolbar, setShowToolbar] = useState(false)


    
    
    const getEmbedHtml = (videoId:string) => {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
      frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      allowfullscreen></iframe>`
    }

    

    if( mode != null && mode === 'input'){
      return (
        <YoutubeInputCard nodeId={id} />
      )

    }
     
    
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
            <div dangerouslySetInnerHTML={{__html : getEmbedHtml(videoId)}} />
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

      <NodeToolbar isVisible={showToolbar} position={Position.Right} className='bg-muted-foreground flex flex-col  space-y-2 border p-1 shadow-lg'>
           <Button size="icon" className='h-[4] w-[4]'><Trash2 strokeWidth={0.5} /></Button>
           <Separator />
           <Button size="icon" className='h-[4] w-[4]'><Trash2 strokeWidth={0.5} /></Button>
      </NodeToolbar>    
      
      </div>
    )
  
  
  }
  
  export default ImageCard ;