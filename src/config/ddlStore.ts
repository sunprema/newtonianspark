import { create } from 'zustand';

interface DDLState  {
  //states
  sideSheetOpen:boolean
  nodeIdSelectedForSideSheet:string
  aiResponses:Array<object>

  //reducers
  toggleSideSheet: () => void
  openSideSheetForNode:(nodeId:string) => void
  setAIResponses:(ai_response:object) => void

};

// this is our useStore hook that we can use in our components to get parts of the store and call actions



const useDDLStore = create<DDLState>((set, get) => ({
  
  sideSheetOpen:false,
  nodeIdSelectedForSideSheet: "",
  aiResponses:[],

  toggleSideSheet: () => set((state) => (
    {sideSheetOpen : !state.sideSheetOpen}
    )
  ),

  openSideSheetForNode: (nodeId:string) => set(() => (
    {
      sideSheetOpen:true,
      nodeIdSelectedForSideSheet:nodeId
    }
    )),

   setAIResponses: (ai_response:object) => set( 
    (state) => (
        {
            aiResponses : [...state.aiResponses, ai_response],
        }
    )
   )

}));

export default useDDLStore ;