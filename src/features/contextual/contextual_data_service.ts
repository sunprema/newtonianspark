import 'server-only'

//rename this service to something meaningful


import 'server-only'

import { ChatOpenAI } from "langchain/chat_models/openai";
import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from 'langchain';

const chatAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
    maxRetries :2 ,
    maxConcurrency : 5,
    modelName: "gpt-4", 
    temperature: 1,
    maxTokens : -1
});

export const ContextualDataService = async ( {systemPromptFromUser, humanMessage}:{ systemPromptFromUser: string, humanMessage : string }) => {
    
    const prompt = new ChatPromptTemplate({
        promptMessages:[
            SystemMessagePromptTemplate.fromTemplate(systemPromptFromUser),
            HumanMessagePromptTemplate.fromTemplate("{inputText}"),
        ],
        inputVariables:["inputText"]
    });

    const chain = new LLMChain({
        prompt,
        llm: chatAI,
        verbose: true
      });
    
    let result = null
    let error = null
    try{
        result = await chain.call({ inputText : humanMessage})        
        return {
            result,
            error : null
        }
    }catch(errorz){
        error = errorz
    }
    return {result, error}
    
}

