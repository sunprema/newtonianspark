import { create } from 'zustand';

interface ExploreState  {
  //states
  sideSheetOpen:boolean
  nodeIdSelectedForSideSheet:string

  //reducers
  toggleSideSheet: () => void
  openSideSheetForNode:(nodeId:string) => void

};

// this is our useStore hook that we can use in our components to get parts of the store and call actions



const useExploreStore = create<ExploreState>((set, get) => ({
  
  sideSheetOpen:false,
  nodeIdSelectedForSideSheet: "",

  toggleSideSheet: () => set((state) => (
    {sideSheetOpen : !state.sideSheetOpen}
    )
  ),

  openSideSheetForNode: (nodeId:string) => set(() => (
    {
      sideSheetOpen:true,
      nodeIdSelectedForSideSheet:nodeId
    }
  ))

}));

export default useExploreStore ;