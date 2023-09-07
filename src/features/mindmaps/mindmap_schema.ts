import { number, z } from 'zod';


const MindMapSchema = z.object({
  nodes:z
  .array(
    z.object({
        id: z.string().describe("unique id to identify the node"),
        /*
        position:z.object({
          x: z.number().describe("x position of node"),
          y: z.number().describe("y position of node"),

        }).describe("The X and Y position of node in react flow"),
        */
        data:z.object({
            label:z.string().describe("label to use in react flow node"),
            comment:z.string().optional().describe("detailed comment"),
        }).describe("data for react flow")  
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