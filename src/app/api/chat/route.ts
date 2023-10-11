import 'server-only'

import { NextRequest } from 'next/server';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import {  PromptTemplate } from 'langchain/prompts';

export const runtime = 'edge'

const chatAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
    maxRetries :2 ,
    maxConcurrency : 5,
    modelName: "gpt-3.5-turbo-0613", 
    //modelName: "gpt-4", 
    temperature: 1.0
});
 
const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

const EXPLORE_SYSTEM_PROMPT = `SYSTEM: You are an expert and will help explore the topic provided in the following message.
 You will suggest more questions and answers that Users will be interested to deeply understand the topic.`

const TABLE_SYSTEM_PROMPT = `SYSTEM: You are a postgres database domain expert. User want to create a database requirement document. You will help refine user request and create a database scheme requirement. It should include all the entities that will be required for users request to cover the main use cases as well as the edge cases that you think are required. Don't ask questions more than two times. If you are satisfied with your response, prefix the response with <prompt>`

const MINDMAP_SYSTEM_PROMPT = `SYSTEM: You are an expert and will help explore the topic provided in the following message. You will suggest more questions and answers that Users will be interested to deeply understand the topic.`


 const TEMPLATE = `SYSTEM:{system_message} 
  Current conversation:
  {chat_history}
  User: {input}
  AI:`;

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {mode} = body
    const messages = body.messages ?? [];
    
    //get previous messages and then current message
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    
    let system_message = ''
    
    //todo:simplify
    switch(mode){
      case "table":
        system_message = TABLE_SYSTEM_PROMPT
        break;
      case "explore":
        system_message = EXPLORE_SYSTEM_PROMPT
        break;
      case "mindmap":
        system_message = MINDMAP_SYSTEM_PROMPT
        break;
      default:
        break;
    }
    
    const prompt = PromptTemplate.fromTemplate(TEMPLATE)
    const outputParser = new BytesOutputParser();
    const chain = prompt?.pipe(chatAI).pipe(outputParser);
   
    const stream = await chain?.stream({
      system_message,
      chat_history: formattedPreviousMessages.join('\n'),      
      input: currentMessageContent,
    });
   
    return new StreamingTextResponse(stream);
  }