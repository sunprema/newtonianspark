import { ReactNode } from "react"
import { Element, useNode } from "@craftjs/core"
import { ContainerSettings } from "./ContainerSettings"
import { cn } from "@/lib/utils"


const NSContainer = ({className, children}:{className?:string, children?:ReactNode}) => {

    const {connectors:{connect,drag}} = useNode()
    return (
    <div ref={(ref) => connect(drag(ref as HTMLElement))} className={cn(className, "bg-inherit")} canvas>        
        {children} 
    </div>
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