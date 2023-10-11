import { UUID } from "crypto";

import {
    
    Node,
    Edge,    
  } from "reactflow";

export type Topic = {
    title :string,
    summary: string,
    id: UUID|null,
    flow: NodesAndEdges,
    created_at?:string,
}  
export type NodesAndEdges = {
    nodes : Node[],
    edges: Edge[],
    
}