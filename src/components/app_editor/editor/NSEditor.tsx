"use client"
import { Editor, Frame, Element } from "@craftjs/core"

import { Card } from "@/components/ui/card"
import ToolBox  from "@/components/app_editor/editor/ToolBox"

//selectors
import {NSButton, NSContainer, NSText, NSTable} from "@/components/app_editor/selectors"
import SettingsPanel from "./SettingsPanel"


const resolvers = {
    NSButton, 
    NSContainer, 
    Card, 
    NSText,
    NSTable,
}

const NSEditor = () => {


    return (

        <Editor resolver={resolvers}>
            <div className="flex gap-0 h-screen">

                <div className="h-full w-2/12 bg-gray-100 dark:bg-gray-800 border border-r-1 border-red-400">
                    <ToolBox />
                </div>
                <div className="flex-1 h-full w-8/12 dark:bg-black">
                <Frame>
                        <Element is={NSContainer} canvas >
                        
                        </Element>
                </Frame>
                </div>

                <div className="h-full w-2/12 bg-gray-100  dark:bg-gray-800 border border-l-1 border-red-400">
                    <SettingsPanel />
                </div>
            </div>
            
        </Editor>


    )
}

export default NSEditor