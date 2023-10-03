import React, {useState, memo} from 'react'
import { useReactFlow } from 'reactflow';
import { Textarea } from '../ui/textarea';




const TextInputNode = ({nodeId, data}:{nodeId:string, data:{text?:string}}) => {
    
    const [text, setText] = useState<string>( data.text ?? "")
    const { setNodes } = useReactFlow(); 

    const handleEnterKey = (e:React.KeyboardEvent) => {
        
        if (e.code === "Enter"){
            setNodes((nds) =>
            nds.map((node) => {
            if (node.id === nodeId) {
              
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
     
        <Textarea value={text} placeholder='Enter the text.' onChange={(e) => setText(e.target.value)} onKeyUp={handleEnterKey}/>

    )
}


const TextDisplayNode = ( {data, selected, nodeId}:{nodeId:string, data:any, selected:boolean}) => {
    const {text} = data
    return(
        <div className="bg-transparent">
        <h1 className="text-xl font-medium tracking-tight">{text}</h1>
        </div>
    )
}





const TextNode = ({data, id, selected}:{data:{action:'input'|'display'}, id:string, selected:boolean}) => {
    let {action} = data
    let textNode = null
    if(selected){
        action="input"
    }

    switch(action){
        case "input":
            textNode = <TextInputNode nodeId={id} data={data} />
          break
        case "display":
            textNode = <TextDisplayNode nodeId={id} data={data} selected={selected}/>
          break            
    }

    return textNode
    
}

export default memo(TextNode);