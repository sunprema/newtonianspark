import { cn } from '@/lib/utils';
import { useNode } from '@craftjs/core';
import TextSettings from './TextSettings';

const NSText = ({className, text}:{className?:string, text:string}) => {

    const {
        connectors: { connect, drag },
      } = useNode();

    return (
        <span 
            className={cn(className, "font-bold")}
            ref={(ref ) => connect(drag(ref as HTMLElement))}
        >
            {text}
        </span>
    )
}

NSText.craft = {
    displayName : 'Text',
    props:{
        text: "Enter the text"
    },
    related:{
        settings: TextSettings
    }
}

export default NSText