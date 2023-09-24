
import 'server-only'

import { ChatOpenAI } from "langchain/chat_models/openai";
import { createStructuredOutputChainFromZod } from "langchain/chains/openai_functions";

import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
  } from "langchain/prompts";
import { BasicExploreSchema, BasicExploreNodeSchema } from './explore-schema';

const chatAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
    maxRetries :2 ,
    maxConcurrency : 5,
    modelName: "gpt-4", 
    temperature: 1.0
});

export const ExploreTopic = async ( {explore, context}:
    
    { explore: string, context : object | null }) => {

    console.log(context)    
    const prompt = new ChatPromptTemplate({
        promptMessages:[
            SystemMessagePromptTemplate.fromTemplate("You are an expert and will help explore the topic provided in the following message. You will suggest more questions and answers that Users will be interested to deeply understand the topic."),
            HumanMessagePromptTemplate.fromTemplate("{inputText}"),
        ],
        inputVariables:["inputText"]
    });

    const chain = createStructuredOutputChainFromZod(BasicExploreSchema, {
        prompt,
        llm: chatAI,
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

export const ExploreNodeGenerate = async({explore, context}:{ explore: string, context : object | null }) => {

    const prompt = new ChatPromptTemplate({
        promptMessages:[
            SystemMessagePromptTemplate.fromTemplate("You are an expert and will help explore the topic provided in the following message. You will suggest more questions and answers that Users will be interested to deeply understand the topic."),
            HumanMessagePromptTemplate.fromTemplate("{inputText}"),
        ],
        inputVariables:["inputText"]
    });

    const chain = createStructuredOutputChainFromZod(BasicExploreNodeSchema, {
        prompt,
        llm: chatAI,
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