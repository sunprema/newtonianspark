import React, {useCallback, useState} from 'react'

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
import  Axios from 'axios';
import { useToast } from '../ui/use-toast';
import { Textarea } from "@/components/ui/textarea"

import {memo} from 'react'


  const ImageInputCard = ( {nodeId}:{nodeId:string} )=> {

    const [topic, setTopic] = useState("")
    const [summary, setSummary] = useState("")
    const [selectedFile, setSelectedFile] = useState<File>()
    const [imageObtained, setImageObtained] = useState(false)

    const { setNodes } = useReactFlow(); 
    const {toast} = useToast()  

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
                mode:'base64'
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

    const fileUploadHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
      if( event?.target?.files != null){
        setSelectedFile(event.target.files[0])
        setImageObtained(true)
        toast({
          title: 'TBD: Image will be uploaded here',
          description : 'Image will be uplaoded and added to the node... Its to be implemented.'
        })
      }
    } 
    

    return (
    
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="summary">Image Summary</Label>
              <Textarea id="summary" className="nodrag nopan" placeholder="Describe what you want the image to be." value={summary} onChange={(e) => setSummary(e.target.value)} />              
            </div>
            <div>
              <Label htmlFor="file_upload">Upload File</Label>
              <Input type="file" id="file_upload" placeholder="Select image file" onChange={fileUploadHandler}/>  
            </div>
          </div>  
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={ ()=> generateImage()}>DallE, make me an image!</Button>
      </CardFooter>

      </Card>
      
    )

  }

  const ImageBase64Card = ( {nodeId, data}:{nodeId:string, data:any} )=> {
    
    const {topic, summary, imageData, mode} = data
    const { setNodes } = useReactFlow(); 
    const {toast} = useToast()
    
    const convertImageToFileAndStore = async() => {
      alert("Image will be stored here.")
      //use axios post to post the image data, pass the nodeId. NodeId will be used as the file Name
      //that way, when we delete the node, the associated file can be deleted as well.
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
                "imageURL": imageURL ,
                mode:'display'
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="object-cover" src={`data:image/jpeg;base64,${imageData}`} width={500} height={400} alt={"Image"} />
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

  const ImageDisplayCard = ( {nodeId, data}:{nodeId:string, data:any} ) => {
    const openSideSheetForNode = useExploreStore( (state) => state.openSideSheetForNode)
    const {topic, summary, imageURL, mode} = data
    return (
      <div>
        
      <Card className= "shadow-2xl dark:bg-slate-700">
        <CardHeader>
          <CardTitle>{topic}</CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardHeader>
        
        <CardContent>
            <div className="nodrag container w-[full] mx-auto">            
              <Image src={imageURL} width={500} height={400} alt={topic} />
            </div>
        </CardContent>
      </Card>
      <Handle id="1" type="source" position={Position.Right} className="!h-6 !w-2 !rounded-none !bg-green-500"  />
      <Handle id="2" type="source" position={Position.Bottom} className="!h-2 !w-6 !rounded-none !bg-green-500" />
      <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
      <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" />
      </div>
    )

  }


  const ImageCard = ({data, id}:{data:any, id:string}) => {

    const {mode} = data

    let imageCard = null
    
    if( mode != null){
      
      switch(mode){
        case "input":
          imageCard = <ImageInputCard nodeId={id} />
          break
        case "base64":
          imageCard = <ImageBase64Card nodeId={id} data={data}/>
          break
        case "display":
          imageCard = <ImageDisplayCard nodeId={id} data={data} />
          break  
          
      }

    }

    return imageCard;
    
  }
  
  export default memo(ImageCard) ;