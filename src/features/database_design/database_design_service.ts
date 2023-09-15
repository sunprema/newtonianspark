
import 'server-only'

import { ChatOpenAI } from "langchain/chat_models/openai";
import { createStructuredOutputChainFromZod } from "langchain/chains/openai_functions";

import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
  } from "langchain/prompts";

import { TableDDLSchema } from './table_schema';

const chatAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
    maxRetries :2 ,
    maxConcurrency : 5,
    modelName: "gpt-4", 
    //modelName: "gpt-4",
    temperature: 1,
    maxTokens : -1
});

export const DatabaseDesignService = async ( {explore, context}:{ explore: string, context : object | null }) => {
    
    const prompt = new ChatPromptTemplate({
        promptMessages:[
            SystemMessagePromptTemplate.fromTemplate("Act as a Postgres expert. Create a database scheme that fits user requirements. Find out all the key entities required and provide the table design.Provide as many tables as required to cover many usecases."),
            HumanMessagePromptTemplate.fromTemplate("{inputText}"),
        ],
        inputVariables:["inputText"]
    });

    const chain = createStructuredOutputChainFromZod(TableDDLSchema, {
        prompt,
        llm: chatAI,
        verbose: true
      });
    
    let result = null
    let error = null
    try{
        //result = DUMMY_DATA
        chain.verbose = true
        result = await chain.call({ inputText : explore })        
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

