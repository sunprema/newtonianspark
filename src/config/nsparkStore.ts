import { AIMessage, HumanMessage, SystemMessage } from 'langchain/dist/schema';
import { Node,Edge } from 'reactflow';
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

  nodes:Array<Node>
  edges:Array<Edge>

  //reducers
  toggleSideSheet: () => void
  openSideSheetForNode:(nodeId:string) => void
  
  storeSparkContext:(sparkContext:SparkContext) => void
  setNodes:(nodes:Array<Node>) => void
  setEdges:(edges:Array<Edge>) => void

};

// this is our state hook that we can use in our components to get parts of the store and call actions

const useNsparkState = create<NSparkState>((set,get) => ({
  
  sideSheetOpen:false,
  nodeIdSelectedForSideSheet: "",
  sparkContexts:[],
  nodes:[],
  edges:[],

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

    storeSparkContext: (sparkContext:SparkContext) => set( 
    (state) => (
        {
            sparkContexts : [...state.sparkContexts, sparkContext],
        }
    )
   ),
   setNodes:(nodes:Array<Node>) => set(
    () => (
        {
            nodes
        }
    )
   ),
   setEdges:(edges:Array<Edge>) => set(
    () => (
        {
            edges: edges
        }
    )
   ),

}));

export default useNsparkState ;