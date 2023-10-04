import { useNode } from "@craftjs/core"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const TextSettings = () => {
    const {setProp, text, className} = useNode(
        (state) => 
            ({
                text: state.data.props.text,
                className: state.data.props.className,
            })
    )
    return (
        <div className="flex flex-col gap-4">
            <Label>Enter the text:</Label>
            <Input value={text} onChange={(e) => setProp((props) => props.text = e.target.value) }/>
            <Label>Enter the className:</Label>
            <Input value={className} onChange={(e) => setProp((props) => props.className = e.target.value) }/>
            
        </div>
    )
}

export default TextSettings