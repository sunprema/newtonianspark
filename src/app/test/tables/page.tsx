'use client'

import BasicFlow from "@/components/explorer/Flow"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    Node,
    Edge,    
  } from "reactflow";


type NodesAndEdges = {
    nodes : Node[],
    edges: Edge[],
}

const tableData = [{
    "table_name": "signup",
    "columns": [
      {
        "name": "id",
        "type": "serial",
        "primary_key": true
      },
      {
        "name": "username",
        "type": "varchar",
        "length": 50
      },
      {
        "name": "email",
        "type": "varchar",
        "length": 100
      },
      {
        "name": "password",
        "type": "text"
      },
      {
        "name": "created_at",
        "type": "timestamp with time zone",
        "default": "now()"
      }
    ],
    "indexes": [
      {
        "name": "idx_username",
        "columns": ["username"]
      },
      {
        "name": "idx_email",
        "columns": ["email"]
      }
    ],
    "constraints": [
      {
        "name": "chk_valid_email",
        "check": "email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$'"
      }
    ]
  }
]
  

const Page = () => {

    const initialNodes:Node[] = [
        {
            "id" : "1",
            "type" : "table",
            "data" : tableData[0],
            "position" : { x: 200, y:50}
        }
    ]
    const edges:Edge[] = []
    
  return (
        <section>
            <ScrollArea >
            <div className="h-[calc(100vh-80px)] w-full">
                <BasicFlow 
                initialNodes={initialNodes} 
                initialEdges={edges}
                initialTitle={"test"} 
                initialSummary={"test_summary"} 
                flowKey={"123"} 
                />
            </div>
            </ScrollArea>
        </section>
    )
    
}

export default Page