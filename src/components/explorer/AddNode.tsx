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


const AddNode = () => {
    return (
        <div className="absolute left-8 top-8">
          <Popover>
            <PopoverTrigger>
              <Button size="icon" className="relative h-[24px] w-[24px] rounded-full bg-orange-500 dark:bg-orange-500 shadow-2xl" >
              <Plus />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="mx-8 shadow-2xl h-96 dark:bg-slate-700">
             <div>
              <Card>
                <CardContent>
                  <h1>Youtube card</h1>
                </CardContent>
              </Card>
             </div>
            </PopoverContent>
          </Popover>
          
        </div>
    )
}

export default AddNode