import { Button } from "@/components/ui/button"
import { useNode } from "@craftjs/core"
import { connect } from "http2"

import {ButtonSettings} from './ButtonSettings'
import { cn } from "@/lib/utils"


const NSButton = ({label,className, ...props}:{label?:string, className?:string}) => {

    const {connectors:{connect, drag}, selected} = useNode((node) => ({
        selected: node.events.selected
    }))

    return (
        
        <Button className={cn("m-2 rounded-none", className )} ref={(ref) => connect(drag(ref as HTMLElement))}> {label} </Button>
    )

}

NSButton.craft = {
    displayName : 'NSButton',
    props:{
        label: "Hello"
    },
    related:{
        settings: ButtonSettings,
    }
}

export default NSButton