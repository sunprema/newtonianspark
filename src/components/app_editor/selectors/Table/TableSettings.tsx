import { Input } from "@/components/ui/input"
import { useNode } from "@craftjs/core"

export const TableSettings = () => {

    const {setProp, caption} = useNode(
        (state) => 
            ({
                caption: state.data.props.caption
            })
    )

    return (
        
        <Input value={caption} 
               onChange={(e) => setProp((props) => props.caption = e.target.value) }/>

    )

}

