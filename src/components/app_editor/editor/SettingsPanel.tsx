import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEditor } from "@craftjs/core"
import React from "react";

const SettingsPanel = () => {
    const { actions, selected, isEnabled } = useEditor((state, query) => {
        const currentNodeId = query.getEvent('selected').last();
        let selected;
    
        if (currentNodeId) {
          selected = {
            id: currentNodeId,
            name: state.nodes[currentNodeId].data.name,
            settings:
              state.nodes[currentNodeId].related &&
              state.nodes[currentNodeId].related.settings,
            isDeletable: query.node(currentNodeId).isDeletable(),
          };
        }
    
        return {
          selected,
          isEnabled: state.options.enabled,
        };
      });
    
    return isEnabled && selected ? (
        <div>
            <h4 className="text-center font-semibold p-5 border">Settings </h4>       
            <h6 className="font-light  text-sm p-5 "> {selected.name} </h6>
            <div className="p-8">
                {selected.settings && React.createElement(selected.settings)}
            </div>   

            {
              selected.isDeletable ?(
                <>
                <Separator className="my-4" />
                <div className="flex justify-center w-full">
                <Button variant={"secondary"}  onClick={() => { actions.delete(selected.id)}}> Delete </Button>
                </div>
                </>
              )
              :null
            }
            


        </div>

    ):null; 

}

export default SettingsPanel