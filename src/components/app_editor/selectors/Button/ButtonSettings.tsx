import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNode } from "@craftjs/core"


export const ButtonSettings = () => {

    const {setProp, label} = useNode(
        (state) => 
            ({
                label: state.data.props.label
            })
    )

    
    
    return (
        <div>
            <Label>Enter the label:</Label>
            <Input value={label} onChange={(e) => setProp((props) => props.label = e.target.value) }/>
        </div>
        

    )



}