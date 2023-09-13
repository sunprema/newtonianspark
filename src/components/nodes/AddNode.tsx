"use client"

import * as React from "react"


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Youtube, LineChart, Image as Img, FunctionSquare, Plus, Database, Text } from "lucide-react"
import {memo} from 'react'
import { ScrollArea } from "../ui/scroll-area"




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
            <PopoverContent className="mx-8 border-orange-500 shadow-2xl dark:border-orange-500 dark:bg-slate-700">
             <ScrollArea className="max-h-screen">
             <div className="box-border flex flex-col space-y-4 hover:cursor-grab active:cursor-grabbing">
              <Card draggable className="group h-[100px] rounded-none border-none p-4 shadow-none hover:border-solid hover:border-orange-500 dark:bg-inherit dark:hover:border-orange-500" onDragStart={(event) => onDragStart(event, 'youtube')}>
                <CardContent className="flex items-center justify-between gap-4 align-middle">
                  <Youtube color="#F97316" size={56}/>
                  <div>
                    <h6 className="scroll-m-20 text-xs font-bold tracking-tight group-hover:text-orange-500 group-hover:dark:text-orange-500">Video</h6>
                    <p className="mt-4 scroll-m-20 text-xs font-light tracking-tight" >Use this to embed Youtube videos in your document</p>
                  </div>
                </CardContent>
              </Card>
              <Card draggable className="group h-[100px] rounded-none border-none p-4 shadow-none hover:border-solid hover:border-orange-500 dark:bg-inherit dark:hover:border-orange-500" onDragStart={(event) => onDragStart(event, 'image')}>
                <CardContent className="flex items-center justify-between gap-4 align-middle">
                <Img color="#F97316" size={56}/>
                  <div>
                    <h6 className="scroll-m-20 text-xs font-bold tracking-tight  group-hover:text-orange-500 group-hover:dark:text-orange-500" >Image</h6>
                    <p className="mt-4 scroll-m-20 text-xs font-light tracking-tight" >Upload/Generate Image and add it to your document</p>
                  </div>
                </CardContent>
              </Card>
              <Card draggable  className="group h-[100px] rounded-none border-none p-4 shadow-none hover:border-solid hover:border-orange-500 dark:bg-inherit dark:hover:border-orange-500" onDragStart={(event) => onDragStart(event, 'chart')}>
                <CardContent className="flex items-center justify-between gap-4 align-middle">
                <LineChart color="#F97316" size={36} />
                  <div>
                    <h6 className="scroll-m-20 text-xs font-bold tracking-tight  group-hover:text-orange-500 group-hover:dark:text-orange-500 ">Chart</h6>
                    <p className="mt-4 scroll-m-20 text-xs font-light tracking-tight" >Add chart to your document</p>
                  </div>
                </CardContent>
              </Card>

              <Card draggable  className="group h-[100px] rounded-none border-none p-4 shadow-none hover:border-solid hover:border-orange-500 dark:bg-inherit dark:hover:border-orange-500" onDragStart={(event) => onDragStart(event, 'flow_chart')}>
                <CardContent className="flex items-center justify-between gap-4 align-middle">
                <FunctionSquare color="#F97316" size={56} />
                  <div>
                    <h6 className="scroll-m-20 text-xs font-bold tracking-tight  group-hover:text-orange-500 group-hover:dark:text-orange-500">Flow Chart</h6>
                    <p className="mt-4 scroll-m-20 text-xs font-light tracking-tight" >Add a Flow chart to document your process</p>
                  </div>
                </CardContent>
              </Card>

              <Card draggable  className="group h-[100px] rounded-none border-none p-4 shadow-none hover:border-solid hover:border-orange-500 dark:bg-inherit dark:hover:border-orange-500" onDragStart={(event) => onDragStart(event, 'database_design')}>
                <CardContent className="flex items-center justify-between gap-4 align-middle">
                <Database color="#F97316" size={36} />
                  <div>
                    <h6 className="scroll-m-20 text-xs font-bold tracking-tight  group-hover:text-orange-500 group-hover:dark:text-orange-500">Database design</h6>
                    <p className="mt-4 scroll-m-20 text-xs font-light tracking-tight" >Work on your database design</p>
                  </div>
                </CardContent>
              </Card>

              <Card draggable  className="group h-[100px] rounded-none border-none p-4 shadow-none hover:border-solid hover:border-orange-500 dark:bg-inherit dark:hover:border-orange-500" onDragStart={(event) => onDragStart(event, 'text_heading')}>
                <CardContent className="flex items-center justify-between gap-4 align-middle">
                <Text color="#F97316" size={36} />
                  <div>
                    <h6 className="scroll-m-20 text-xs font-bold tracking-tight  group-hover:text-orange-500 group-hover:dark:text-orange-500">Text Heading</h6>
                    <p className="mt-4 scroll-m-20 text-xs font-light tracking-tight" >Add a text heading</p>
                  </div>
                </CardContent>
              </Card>
             </div>
             </ScrollArea> 
            </PopoverContent>
          </Popover>
          
        </div>
    )
}

export default memo(AddNode);