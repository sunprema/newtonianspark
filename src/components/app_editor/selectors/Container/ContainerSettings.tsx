import { Input } from "@/components/ui/input"
import { useNode } from "@craftjs/core"

export const ContainerSettings = () => {

    const {setProp, className} = useNode(
        (state) => 
            ({
                className: state.data.props.className
            })
    )

    return (
        
        <Input value={className} 
               onChange={(e) => setProp((props) => props.className = e.target.value) }/>

    )

}