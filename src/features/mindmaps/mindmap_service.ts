
import 'server-only'

import { ChatOpenAI } from "langchain/chat_models/openai";
import { createStructuredOutputChainFromZod } from "langchain/chains/openai_functions";

import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
  } from "langchain/prompts";

import { MindMapSchema } from './mindmap_schema';

const chatAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
    maxRetries :2 ,
    maxConcurrency : 5,
    modelName: "gpt-3.5-turbo-0613", 
    temperature: 1,
    maxTokens : -1
});

export const MindMapDesignService = async ( {explore, context}:{ explore: string, context : object | null }) => {
    
    const prompt = new ChatPromptTemplate({
        promptMessages:[
            SystemMessagePromptTemplate.fromTemplate("You will help in brainstorm ideas requested by user as a mindmap that will work in reactflow."),
            HumanMessagePromptTemplate.fromTemplate("{inputText}"),
        ],
        inputVariables:["inputText"]
    });

    const chain = createStructuredOutputChainFromZod(MindMapSchema, {
        prompt,
        llm: chatAI,
        verbose: true
      });
    
    let result = null
    let error = null
    try{
        result = await chain.call({ inputText : explore})        
        console.log(JSON.stringify(result, null, 2))
        return {
            result,
            error : null
        }
    }catch(errorz){
        error = errorz
    }
    return {result, error}    
}

export default MindMapDesignService ;