
import 'server-only'

import { ChatOpenAI } from "langchain/chat_models/openai";
import { createStructuredOutputChainFromZod } from "langchain/chains/openai_functions";

import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate,
  } from "langchain/prompts";

import { MultipleTableDDLSchema as multipleSchema, SingleTableDDLSchema as singleSchema} from './table_schema';

const chatAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
    maxRetries :2 ,
    maxConcurrency : 5,
    modelName: "gpt-4",     
    temperature: 1,
    maxTokens : -1
});


const systemPrompt = SystemMessagePromptTemplate.fromTemplate("Act as a Postgres expert. Create a database scheme that fits user requirements. Find out all the key entities required and provide the table design.Provide as many tables as required to cover many usecases.")

export const DatabaseDesignService = async ( {explore, context, variant = "multiple"}:
    { explore: string, context : string | null, variant : "single" | "multiple" }) => {

        console.log(context)    
        const promptMessages = [systemPrompt]
        if (context){
            promptMessages.push( AIMessagePromptTemplate.fromTemplate(context))
        }
        promptMessages.push(HumanMessagePromptTemplate.fromTemplate("{inputText}"))
    
        const prompt = new ChatPromptTemplate({
            promptMessages,
            inputVariables:["inputText"]
        });
    
        const chain = createStructuredOutputChainFromZod(
            variant === 'multiple' ? multipleSchema : singleSchema, {
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
