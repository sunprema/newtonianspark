import {z} from "zod";

export const BasicExploreSchema = z.object({
    title: z.string().describe("The title of the AI response under 100 characters"),
    summary: z.string().describe("The summary of the AI response under 500 characters"),
    topics:z
    .array(
        z.object({
            topic: z.string().describe("The name of the topic under 100 characters"),
            summary:z.string().describe("The summary of the topic under 500 characters"),
            questions: z
            .array(
                z.object({
                question: z.string().describe("Question that can be asked on the topic under 200 characters"),
                answer:z.string().describe("Answer for the question"),            
                })
            ).describe("Questions to explore on this content")
        })
    ).describe("Additional topics to explore")
})

