import { Button } from "@/components/ui/button"
import { ButtonIcon, ImageIcon,  TextIcon, TableIcon, LayoutIcon, ViewGridIcon, BoxIcon } from '@radix-ui/react-icons'
import { useEditor, Element } from '@craftjs/core';

import { NSText, NSButton, NSTable, NSContainer } from "../selectors";

const ToolBox = () => {
    const { connectors } = useEditor();
    return (
        <div>
            <h4 className="text-center font-semibold p-5 border">ToolBox </h4>
            <div className="h-full w-full grid  grid-cols-2 md:grid-cols-3 gap-4 p-8 ">

                <div>
                    <Button 
                        variant="outline" 
                        size={"lg"}
                        ref = {(ref:HTMLButtonElement) => connectors.create(ref, <NSButton />)}
                    >
                        <ButtonIcon />
                    </Button>
                </div>    

                <div>
                    <Button 
                        variant="outline" 
                        size={"lg"}
                        ref = {(ref:HTMLButtonElement) => connectors.create(ref, <NSText text="Title"/>)}
                    >
                        <TextIcon />
                    </Button>
                </div>    
                <div>
                    <Button 
                        variant="outline" 
                        size={"lg"}
                        ref = {(ref:HTMLButtonElement) => connectors.create(ref, <NSTable caption="Table caption" />)}
                    >
                        <TableIcon />
                    </Button>
                </div>    

                <div>
                    <Button 
                        variant="outline" 
                        size={"lg"}
                        ref = {(ref:HTMLButtonElement) => connectors.create(ref, <NSButton />)}
                    >
                        <ImageIcon />
                    </Button>
                </div>    
                <div>
                    <Button 
                        variant="outline" 
                        size={"lg"}
                        ref = {(ref:HTMLButtonElement) => connectors.create(ref, <NSButton />)}
                    >
                        <LayoutIcon />
                    </Button>
                </div>    

                <div>
                    <Button 
                        variant="outline" 
                        size={"lg"}
                        ref = {(ref:HTMLButtonElement) => connectors.create(ref, <NSButton />)}
                    >
                        <ViewGridIcon />
                    </Button>
                </div>    

                <div>
                    <Button 
                        variant="outline" 
                        size={"lg"}
                        ref = {(ref:HTMLButtonElement) => connectors.create(ref, <Element is={NSContainer} canvas />)}
                    >
                        <BoxIcon />
                    </Button>
                </div>        
                

            </div>
        </div>

    )


}

export default ToolBox