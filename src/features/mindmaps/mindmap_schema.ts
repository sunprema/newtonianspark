import { z } from 'zod';


const MindMapSchema = z.object({
  nodes:z
  .array(
    z.object({
        id: z.string().describe("A UUID value to identify the node"),

        data:z.object({
            label:z.string().describe(""),
            comment:z.string().optional().describe(""),
        }).describe("List of columns for the table")  
    })
  ).describe("Represents Node in a reactflow mindmap"),

  edges:z
  .array(
    z.object({
        id: z.string().describe("A UUID value to identify the edge"),
        label:z.string().optional().describe("what is this edge for"),
        source:z.string().describe("The UUID of the source Node"),
        target:z.string().describe("The UUID of the target Node"),
    })
  ).describe("Represents Edge in a reactflow mindmap"),

})

export {MindMapSchema}