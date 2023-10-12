
import React, {useState} from 'react'
import { CheckCircle} from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"  
  
  import { Handle, Position, useReactFlow, NodeResizer} from 'reactflow';
  
  import { Button } from "../ui/button";
  import Image from "next/image";

import { Input } from '../ui/input';
import { Label } from "@/components/ui/label"
import  Axios from 'axios';
import { useToast } from '../ui/use-toast';
import { Textarea } from "@/components/ui/textarea"
import { ContextMenu, ContextMenuItem, ContextMenuTrigger, ContextMenuContent, ContextMenuSeparator } from "../ui/context-menu"

import {memo} from 'react'

type UnsplashImageType = {
  urls: {
    regular:string
  }
}


  const ImageInputCard = ( {nodeId}:{nodeId:string} )=> {

    const [topic, setTopic] = useState("")
    const [summary, setSummary] = useState("")
    const [imageSearchResult, setImageSearchResult] = useState<UnsplashImageType[]>()
    const [ selectedImage, setSelectedImage] = useState<string|null>();
    
  

    const { setNodes, setEdges } = useReactFlow(); 
    const {toast} = useToast()
    
    const clearSearch =() => {
      setSummary("")
      setSelectedImage(null)
      setImageSearchResult([])

    }

    const saveSelectedImage = () => {
        
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === nodeId) {
              node.data = {
                topic,
                summary,
                mode:"image",
                "imageURL": selectedImage ,
                action:'display'
          };
        }
        return node;
        })
        ); 
        
    }
    
    const searchImage = async() => {
      try{
        const response = await Axios.post('/api/imageSearch' , {"prompt" : summary})
        const imageData = response.data['imageData']
      
        if(imageData){
          console.log(imageData)
          setImageSearchResult(imageData)
        
        
          
      }else{
        toast({
          title: "Image search failed, Please try again later",
          variant: "destructive" ,
          description: "public URL couldnt be obtained",
        })
      }

      }catch(error){
        toast({
          title: "Image search failed, Please try again later",
          variant: "destructive" ,
          description: `error : ${error}`,
        })
      }
    }

    const generateImage = async() => {
      
      //here we will first generate an image using DallE, and add the data to the node.
      try{
        const response = await Axios.post('/api/dallE', {"prompt": summary})
        const imageData = response.data['imageData']
        if( imageData !== null || imageData !== ""){

          setNodes((nds) =>
          nds.map((node) => {
            if (node.id === nodeId) {
              // it's important that you create a new object here
              // in order to notify react flow about the change
              node.data = {
                topic,
                summary,
                imageData,
                mode: "image",
                action:'base64'
          };
        }

        return node;
      })
    ); 

        }
      }catch(error){
        toast({
          title: "Image generation failed, Please try again later",
          variant: "destructive" ,
          description: `error : ${error}`,
        })
      }
    
    }

    const handleDelete = () => {
      setNodes( (nodes) => nodes.filter( (node) => node.id !== nodeId))
      setEdges((edges) => edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))  
    }
    
    return (
      <div >
      <ContextMenu>
      <ContextMenuTrigger>
      <Card className="w-[500px] shadow-2xl dark:bg-slate-700">

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

            <div>
              <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="generate">Generate</TabsTrigger>
                </TabsList>
                <TabsContent value="search">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="summary">Search</Label>
                  {
                    imageSearchResult ? 
                    <div className='nodrag grid grid-cols-4 gap-1'>
                      {imageSearchResult?.map((imsr, index) =>
                        <div className='relative'> 
                        <Image alt="Select Image" src={imsr?.urls?.regular} key={index} width={300} height={300} className='nodrag hover:cursor-pointer' onClick={()=> setSelectedImage(imsr.urls.regular)}/>
                        {
                          selectedImage === imsr.urls.regular ?
                          <div className='absolute left-0 top-0'><CheckCircle className='m-2 bg-transparent' color='orange' size={32} /></div>
                          : null
                        }
                        </div>
                      )
                      }
                      </div>
                    
                    : <Input id="summary" className="nodrag nopan" placeholder="Search your image" value={summary} onChange={(e) => setSummary(e.target.value)} />
                  }
                                
                </div>
                <CardFooter className='mt-5 p-0'>
                    {
                      selectedImage ?
                      <div className='flex w-full justify-around'>
                        <Button className="dark:bg-slate-800 dark:text-white" variant="secondary" onClick={ ()=> clearSearch()}>Clear search</Button>    
                        <Button className="dark:bg-slate-800 dark:text-white" onClick={ ()=> saveSelectedImage()}>Save selected Image</Button>  
                      </div>
                      :
                      <Button className="w-full dark:bg-slate-800 dark:text-white" onClick={ ()=> searchImage()}>Search!</Button>  
                    }                  
                    
                </CardFooter>
                </TabsContent>

                <TabsContent value="generate">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="summary">Image Summary</Label>
                  <Textarea id="summary" className="nodrag nopan" placeholder="Describe what you want the image to be." value={summary} onChange={(e) => setSummary(e.target.value)} />              
                </div>
                <CardFooter  className='mt-5 p-0'>
                    <Button className="w-full dark:bg-slate-800 dark:text-white" onClick={ ()=> generateImage()}>Create!</Button>
                </CardFooter>
                </TabsContent>

              </Tabs>  
            </div>
            
          </div>  
      </CardContent>
      </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
      <ContextMenuItem inset onClick={handleDelete}>
          Delete
        </ContextMenuItem> 
      </ContextMenuContent>
      </ContextMenu>
      </div>
      
    )

  }

  const ImageBase64Card = ( {nodeId, data}:{nodeId:string, data:any} )=> {
    
    const {topic, summary, imageData} = data
    const { setNodes } = useReactFlow(); 
    const {toast} = useToast()
    
    const convertImageToFileAndStore = async() => {
      try{
      const response = await Axios.post('/api/imageStorage', {nodeId, 'b64_json':imageData})
      const imageURL = response.data['imageURL']
      if(imageURL != null && imageURL !== ""){

        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === nodeId) {
              // it's important that you create a new object here
              // in order to notify react flow about the change
              node.data = {
                topic,
                summary,
                mode:"image",
                "imageURL": imageURL ,
                action:'display'
          };
        }
        return node;
        })
        ); 
      }else{
        toast({
          title: "Image storage failed, Please try again later",
          variant: "destructive" ,
          description: "public URL couldnt be obtained",
        })
      }
      }catch(error){
        toast({
          title: "Image storage failed, Please try again later",
          variant: "destructive" ,
          description: `error : ${error}`,
        })
      }

    }

    return (
    
      <Card className="w-[500px] shadow-2xl dark:bg-slate-700">

      <CardHeader>
        <CardTitle>Accept the image</CardTitle>
        <CardDescription>This will store the image and add a URL to the node</CardDescription>
      </CardHeader>

      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input disabled id="title" value={topic} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="summary">Image Summary</Label>
              <Textarea disabled id="summary" className="nodrag nopan" value={summary}/>              
            </div>
            <div className="nodrag">            
              <Image className="object-cover" src={`data:image/jpeg;base64,${imageData}`} width={500} height={400} alt={"Image"} />
            </div> 
            
          </div>  
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={ ()=> convertImageToFileAndStore()}>Accept the image!</Button>
      </CardFooter>

      </Card>
      
    )

  }

  const ImageDisplayCard = ( {data, selected, nodeId}:{data:any, selected:boolean, nodeId:string} ) => {

    const {topic, summary, imageURL} = data
    const { setNodes, setEdges } = useReactFlow(); 
    
    const handleDelete = () => {
      setNodes( (nodes) => nodes.filter( (node) => node.id !== nodeId))
      setEdges((edges) => edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))  
    }

    return (
      <div>
      <ContextMenu>
      <ContextMenuTrigger>  
        
      <Card className= "relative shadow-2xl dark:bg-slate-700">
        <CardHeader>
          <CardTitle>{topic}</CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardHeader>
        
        <CardContent>
            <div className="nodrag container mx-auto w-[full]">            
              <Image src={imageURL} width={500} height={400} alt={topic} />
            </div>
        </CardContent>
      </Card>
      <Handle id="1" type="source" position={Position.Right} className="!h-6 !w-2 !rounded-none !bg-green-500"  />
      <Handle id="2" type="source" position={Position.Bottom} className="!h-2 !w-6 !rounded-none !bg-green-500" />
      <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
      <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" /> 
      <NodeResizer  isVisible={selected} minWidth={100} minHeight={30} />     
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
      <ContextMenuItem inset onClick={handleDelete}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>

      </ContextMenu>
      </div>
    )

  }


  const ImageCard = ({data, id, selected}:{data:{action:'input'|'base64'|'display'}, id:string, selected:boolean}) => {

    const {action} = data

    let imageCard = null
    switch(action){
        case "input":
          imageCard = <ImageInputCard nodeId={id} />
          break
        case "base64":
          imageCard = <ImageBase64Card nodeId={id} data={data}/>
          break
        case "display":
          imageCard = <ImageDisplayCard data={data} selected={selected} nodeId={id} />
          break            
    }
    
    return imageCard ;
  }
  
  export default memo(ImageCard) ;


  export  const ImageCardPresentationMode = ( { data}:{data:any} ) => {
  const {topic, summary, imageURL } = data
  
  if(!imageURL){
    return <h1> No Image</h1>
  }  
   return (
     <div>
       
     <Card className= "shadow-2xl dark:bg-slate-700">
       <CardHeader>
         <CardTitle>{topic}</CardTitle>
         <CardDescription>{summary}</CardDescription>
       </CardHeader>
       
       <CardContent>
           <div className="container mx-auto w-[full]">            
             <Image src={imageURL} width={500} height={400} alt={topic} />
           </div>
       </CardContent>
       
       
     </Card>
      </div>
   )

 }