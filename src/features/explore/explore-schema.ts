import {z} from "zod";

export const BasicExploreSchema = z.object({
    topics:z
    .array(
        z.object({
            topic: z.string().describe("The name of the topic under 100 characters"),
            summary:z.string().describe("A detailed explanation of the topic under 500 characters"),
            questions: z
            .array(
                z.object({
                question: z.string().describe("What a expert would ask to further understand the topic. Question should be under 200 characters"),
                answer:z.string().describe("Detailed answer under 500 characters"),            
                })
            ).describe("To understand related topics deeply, what questions can be asked, and the detailed answer for the question. Question should be under 200 characters")
        })
    ).describe("To under the topic in depth, what dditional topics to explore")
})

