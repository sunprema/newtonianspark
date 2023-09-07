import { AIMessage, HumanMessage, SystemMessage } from 'langchain/dist/schema';
import { create } from 'zustand';


interface SparkContext {
    sparkContext:'database'|'image'|'explore'
    ai_responses:Array<string|HumanMessage|SystemMessage|AIMessage>
}

interface NSparkState  {
  //states
  sideSheetOpen:boolean
  nodeIdSelectedForSideSheet:string
  sparkContexts:Array<SparkContext>
  nodeType:string
  
  //reducers
  toggleSideSheet: () => void
  openSideSheetForNode:(nodeId:string, nodeType:string) => void
  storeSparkContext:(sparkContext:SparkContext) => void
  
};

// this is our state hook that we can use in our components to get parts of the store and call actions

const useNsparkStore = create<NSparkState>((set,get) => ({
  
  sideSheetOpen:false,
  nodeIdSelectedForSideSheet: "",
  sparkContexts:[],
  nodeType : "default",
  toggleSideSheet: () => set((state) => (
    {sideSheetOpen : !state.sideSheetOpen}
    )
  ),

  openSideSheetForNode: (nodeId:string, nodeType:string) => set(() => (
    {
      sideSheetOpen:true,
      nodeIdSelectedForSideSheet:nodeId,
      nodeType
    }
    )),

  storeSparkContext: (sparkContext:SparkContext) => set( 
    (state) => (
        {
            sparkContexts : [...state.sparkContexts, sparkContext],
        }
    )
   )
}));

export default useNsparkStore ;