
import 'server-only'

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, ChatMessage, SystemMessage } from "langchain/schema"; 


const chatAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
});

export const ExploreTopic = async ( {explore, context}:
    { explore: string, context : object | null }) => {
    try{
        const humanMessage = new HumanMessage( explore )
        const systemMessage = new SystemMessage("You will help explore the topic provided in the message. You will return data in JSON with each topic and summary of the topic and additional questions related to the topic")
        const result = await chatAI.predictMessages([systemMessage, humanMessage])
        console.log(result)
        return {
            result
        }
    }catch(error){
        return {
            "error" : error
            
        }
    }
    
}