import React, {useCallback, useState, memo} from 'react'
import { Input } from '../ui/input'
import { useReactFlow } from 'reactflow';




const TextInputNode = ({nodeId}:{nodeId:string}) => {
    
    const [text, setText] = useState<string>()
    const { setNodes } = useReactFlow(); 

    const handleEnterKey = (e:React.KeyboardEvent) => {
        
        if (e.code === "Enter"){
            alert("Enter button is pressed")

            setNodes((nds) =>
            nds.map((node) => {
            if (node.id === nodeId) {
              // it's important that you create a new object here
              // in order to notify react flow about the change
              node.data = {
                text,
                mode: "text",
                action:'display'
             };
            }
            return node;
            }))
        }
    }
        
    return(
     
        <Input value={text} placeholder='Enter the text.' onChange={(e) => setText(e.target.value)} onKeyUp={handleEnterKey}/>

    )
}


const TextDisplayNode = ( {data}:{nodeId:string, data:any}) => {
    const {text} = data
    return(
        <div className="bg-transparent">
        <h1 className="text-xl font-medium tracking-tight">{text}</h1>
        </div>
    )
}





const TextNode = ({data, id}:{data:{action:'input'|'display'}, id:string}) => {
    const {action} = data
    let textNode = null

    switch(action){
        case "input":
            textNode = <TextInputNode nodeId={id} />
          break
        case "display":
            textNode = <TextDisplayNode nodeId={id} data={data} />
          break            
    }

    return textNode
    
}

export default memo(TextNode);