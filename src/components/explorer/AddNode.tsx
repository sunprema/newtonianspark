"use client"

import * as React from "react"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Youtube, LineChart, Image as Img } from "lucide-react"





const AddNode = () => {

  const onDragStart = (event:React.DragEvent, nodeType:string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

    return (
        <div className="absolute left-8 top-8">
          <Popover>
            <PopoverTrigger>
              <Button size="icon" className="relative h-[24px] w-[24px] rounded-full bg-orange-500 shadow-2xl dark:bg-orange-500" >
              <Plus />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="mx-8 shadow-2xl border-orange-500 dark:border-orange-500 dark:bg-slate-700">
             <div className="flex flex-col space-y-4 box-border hover:cursor-grab active:cursor-grabbing">
              <Card draggable className="h-[100px] rounded-none border-none p-4 shadow-none hover:border-solid hover:border-orange-500 dark:bg-inherit dark:hover:border-orange-500" onDragStart={(event) => onDragStart(event, 'youtube')}>
                <CardContent className="flex items-center justify-between gap-4 align-middle">
                  <Youtube color="#d11515" size={56}/>
                  <div>
                    <h6 className="scroll-m-20 text-xs font-semibold tracking-tight">Video</h6>
                    <p className="mt-4 scroll-m-20 text-xs font-extralight tracking-tight" >Use this to embed Youtube videos in your document</p>
                  </div>
                </CardContent>
              </Card>
              <Card draggable className="h-[100px] rounded-none border-none p-4 shadow-none hover:border-solid hover:border-orange-500 dark:bg-inherit dark:hover:border-orange-500" onDragStart={(event) => onDragStart(event, 'image')}>
                <CardContent className="flex items-center justify-between gap-4 align-middle">
                <Img color="#d11515" size={56}/>
                  <div>
                    <h6 className="scroll-m-20 text-xs font-semibold tracking-tight">Image</h6>
                    <p className="mt-4 scroll-m-20 text-xs font-extralight tracking-tight" >Upload/Generate Image and add it to your document</p>
                  </div>
                </CardContent>
              </Card>
              <Card draggable  className="h-[100px] rounded-none border-none p-4 shadow-none hover:border-solid hover:border-orange-500 dark:bg-inherit dark:hover:border-orange-500" onDragStart={(event) => onDragStart(event, 'chart')}>
                <CardContent className="flex items-center justify-between gap-4 align-middle">
                <LineChart color="#d11515" size={56} />
                  <div>
                    <h6 className="scroll-m-20 text-xs font-semibold tracking-tight">Chart</h6>
                    <p className="mt-4 scroll-m-20 text-xs font-extralight tracking-tight" >Add chart to your document</p>
                  </div>
                </CardContent>
              </Card>
              
             </div>
            </PopoverContent>
          </Popover>
          
        </div>
    )
}

export default AddNode