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
  import useExploreStore from "@/config/exploreStore";
import Image from "next/image";
import { Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from "@/components/ui/label"
  
import {memo} from 'react'

  const YoutubeInputCard = ( {nodeId}:{nodeId:string} )=> {

    const [topic, setTopic] = useState("")
    const [summary, setSummary] = useState("")
    const [videoId, setVideoId] = useState("")
    const { setNodes } = useReactFlow();   

    const addYoutubeVideoToNodes = () => {
      //Here we will use the node state and modify the nodes.
      setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            topic,
            summary,
            videoId : getVideoId()
          };
        }

        return node;
      })
    ); 
    
    }
    const getVideoId = () => {
      if (videoId.startsWith("https://www.youtube.com/watch?v=")){
        return videoId.split("https://www.youtube.com/watch?v=")[1]
      }else{
        return videoId
      }
    }

    return (
    <div className="w-[500px] shadow-2xl dark:bg-slate-700">
      <Card>

      <CardHeader>
        <CardTitle>Add a video</CardTitle>
        <CardDescription>You can embed videos in your document</CardDescription>
      </CardHeader>

      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title for this video" value={topic} onChange={(e) => setTopic(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="summary">Summary</Label>
              <Input id="summary" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)}/>              
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="videoId">Video URL/Id</Label>
              <Input id="videoId" placeholder="Youtube Video URL or VideoId" value={videoId} onChange={(e) => setVideoId(e.target.value)} />              
            </div>
          </div>        
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={ ()=> addYoutubeVideoToNodes()}>Apply</Button>
      </CardFooter>

      </Card>
    </div>

    )

  }


  const YoutubeCard = ({data, id}:{data:any, id:string}) => {

    const openSideSheetForNode = useExploreStore( (state) => state.openSideSheetForNode)
    const {topic, summary, videoId, mode} = data
    const [ videoIsOpen, setVideoIsOpen] = useState(false)
    
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
        
      <Card className= "shadow-2xl dark:bg-slate-700">
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
      </Card>
      <Handle id="1" type="source" position={Position.Right} className="!h-6 !w-2 !rounded-none !bg-green-500"  />
      <Handle id="2" type="source" position={Position.Bottom} className="!h-2 !w-6 !rounded-none !bg-green-500" />
      <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
      <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" />
      
      </div>
    )
  }
  export default memo(YoutubeCard) ;