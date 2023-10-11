import React, {useState, memo} from 'react'
import ReactMarkdown from 'react-markdown'
import { useReactFlow } from 'reactflow';
import { Textarea } from '../../ui/textarea';






const MarkdownInputNode = ({nodeId, data}:{nodeId:string, data:{markdownText?:string}}) => {
    
    const [markdownText, setMarkdownText] = useState<string>( data.markdownText ?? "")
    const { setNodes } = useReactFlow(); 

    const handleEnterKey = (e:React.KeyboardEvent) => {
        
        if (e.code === "Enter"){
            setNodes((nds) =>
            nds.map((node) => {
            if (node.id === nodeId) {
              
              node.data = {
                markdownText,
                mode: "text",
                action:'display'
             };
            }
            return node;
            }))
        }
    }
        
    return(
     
        <Textarea value={markdownText} placeholder='Enter the text.' onChange={(e) => setMarkdownText(e.target.value)} onKeyUp={handleEnterKey} className="nodrag" />

    )
}


const MarkdownDisplayNode = ( {data,}:{ data:any}) => {
    const {markdownText} = data
    return(
        <div className="bg-transparent">
         <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
    )
}





const MarkdownNode = ({data, id, selected}:{data:{action:'input'|'display', markdownText?:string}, id:string, selected:boolean}) => {
    let {action} = data
    let textNode = null
    if(selected){
        action="input"
    }

    switch(action){
        case "input":
            textNode = <MarkdownInputNode nodeId={id} data={data} />
          break
        case "display":
            textNode = <MarkdownDisplayNode data={data} />
          break            
    }

    return textNode
    
}

export default memo(MarkdownNode);