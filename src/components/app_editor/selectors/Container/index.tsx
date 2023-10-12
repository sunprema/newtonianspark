import { ReactNode } from "react"
import { Element, useNode } from "@craftjs/core"
import { ContainerSettings } from "./ContainerSettings"
import { cn } from "@/lib/utils"


const NSContainer = ({className, children}:{className?:string, children?:ReactNode}) => {

    const {connectors:{connect,drag}} = useNode()
    return (
    <Element is="div" id="container" ref={(ref:HTMLElement) => connect(drag(ref))} className={cn(className, "bg-inherit border p-2 ")} canvas>        
        {children} 
    </Element>
    )
}

export const NSContainerDefaultProps = {
    className: "p-3 bg-gray-50"
}

NSContainer.craft = {
    displayName: 'Container',
    props:NSContainerDefaultProps,
    related:{
        settings:ContainerSettings
    }
}

export default NSContainer