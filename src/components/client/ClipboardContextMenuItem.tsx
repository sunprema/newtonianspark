'use client'

import { ReactNode } from "react"
import { Badge } from "../ui/badge"




const ClipboardContextMenuItem = ({copyText}:{copyText:string}):ReactNode => {
    return (
        <Badge variant="outline" onClick={() => navigator.clipboard.writeText( copyText)}>
            Copy flow
        </Badge>
        
    )
}

export default ClipboardContextMenuItem