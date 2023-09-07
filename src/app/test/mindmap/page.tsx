import BasicFlow from "@/components/explorer/Flow"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Edge } from "reactflow"

const DUMMYDATA = {
    "output": {
      "nodes": [
        {
          "id": "1",
          "type" : "mindMap",
          "position" : {x : 650, y:121},
          "data": {
            "label": "Agile Project Management",
            "comment": "A project management approach that emphasizes flexibility, collaboration, and iterative development."
          }
        },
        {
          "id": "2",
          "type" : "mindMap",
          "position" : {x : 200, y:405},
          "data": {
            "label": "Scrum",
            "comment": "An agile framework that enables teams to collaborate and deliver incrementally."
          }
        },
        {
          "id": "3",
          "type" : "mindMap",
          "position" : {x : 650, y:402},
          "data": {
            "label": "Kanban",
            "comment": "A visual agile project management method that focuses on continuous delivery and flow."
          }
        },
        {
          "id": "4",
          "type" : "mindMap",
          "position" : {x : 1150, y:402},
          "data": {
            "label": "Lean",
            "comment": "A project management approach that aims to maximize value and minimize waste."
          }
        }
      ],
      "edges": [
        {
          "id": "1-2",
          "label": "",
          "source": "1",
          "target": "2"
        },
        {
          "id": "1-3",
          "label": "",
          "source": "1",
          "target": "3"
        },
        {
          "id": "1-4",
          "label": "",
          "source": "1",
          "target": "4"
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