import BasicFlow from "@/components/nodes/Flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edge,Node} from "reactflow"

const DUMMYDATA = {
    "output": {
    "nodes": [
      {
        "id": "node1",
        "type": "input",
        "data": { "label": "12V Battery" },
        "position": { "x": 100, "y": 50 }
      },
      {
        "id": "node2",
        "type": "output",
        "data": { "label": "Common Ground" },
        "position": { "x": 300, "y": 50 }
      },
      {
        "id": "resistor1",
        "type": "default",
        "data": { "label": "R1 (2 ohms)" },
        "position": { "x": 200, "y": 150 }
      },
      {
        "id": "resistor2",
        "type": "default",
        "data": { "label": "R2 (2 ohms)" },
        "position": { "x": 200, "y": 250 }
      },
      {
        "id": "led1",
        "type": "output",
        "data": { "label": "LED1" },
        "position": { "x": 400, "y": 150 }
      },
      {
        "id": "led2",
        "type": "output",
        "data": { "label": "LED2" },
        "position": { "x": 400, "y": 250 }
      }
    ],
    "edges": [
      {
        "id": "edge1",
        "source": "node1",
        "sourceHandle": "source",
        "target": "resistor1",
        "targetHandle": "target"
      },
      {
        "id": "edge2",
        "source": "node1",
        "sourceHandle": "source",
        "target": "resistor2",
        "targetHandle": "target"
      },
      {
        "id": "edge3",
        "source": "resistor1",
        "sourceHandle": "source",
        "target": "led1",
        "targetHandle": "target"
      },
      {
        "id": "edge4",
        "source": "resistor2",
        "sourceHandle": "source",
        "target": "led2",
        "targetHandle": "target"
      },
      {
        "id": "edge5",
        "source": "led1",
        "sourceHandle": "source",
        "target": "node2",
        "targetHandle": "target"
      },
      {
        "id": "edge6",
        "source": "led2",
        "sourceHandle": "source",
        "target": "node2",
        "targetHandle": "target"
      }
    ]
}
}
const Page = () => {

    const nodes:Node[] = DUMMYDATA.output["nodes"]
    const edges:Edge[] = DUMMYDATA.output["edges"]
  return (
        <section>
            <ScrollArea >
            <div className="h-[calc(100vh-80px)] w-full">
                <BasicFlow 
                initialNodes={nodes} 
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