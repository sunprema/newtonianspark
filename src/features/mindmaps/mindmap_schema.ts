import { z } from 'zod';


const MindMapSchema = z.object({
  nodes:z
  .array(
    z.object({
        id: z.string().describe("unique id to identify the node"),

        data:z.object({
            label:z.string().describe(""),
            comment:z.string().optional().describe(""),
        }).describe("List of columns for the table")  
    })
  ).describe("Represents Node in a reactflow mindmap"),

  edges:z
  .array(
    z.object({
        id: z.string().describe("unique id to identify the edge"),
        source:z.string().describe("id of source Node"),
        target:z.string().describe("id of target Node"),
    })
  ).describe("Represents Edge in a reactflow mindmap"),

})

export {MindMapSchema}