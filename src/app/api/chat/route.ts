import 'server-only'

import { NextRequest } from 'next/server';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';

export const runtime = 'edge'

const chatAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_KEY,
    maxRetries :2 ,
    maxConcurrency : 5,
    modelName: "gpt-3.5-turbo-0613", 
    temperature: 1.0
});
 
const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
  };
   
  const DATABASE_PROMPT_TEMPLATE = `You are a database domain expert.
  You will take user message and help generate a expert level prompt that is best suited for LLMs to generate entities and their relationships. 
  You will prefix the prompt with "Prompt:"

  Current conversation:
  {chat_history}
 
  User: {input}
  AI:`;

  const EXPLORE_PROMPT_TEMPLATE = `You will take users prompt and improve it and add more appropriate details and respond with a better prompt.You will prefix the prompt with "Prompt:"
  
  Current conversation:
  {chat_history}
 
  User: {input}
  AI:`;

  const MINDMAP_PROMPT_TEMPLATE = `You will take users prompt and improve it and add more appropriate details and respond with a better prompt.You will prefix the prompt with "Prompt:"
  
  Current conversation:
  {chat_history}
 
  User: {input}
  AI:`;

  const IMAGE_PROMPT_TEMPLATE = `You will take users prompt and be creative and response with a better prompt that users can use with text to image services. You will prefix the prompt with "Prompt:"
  
  Current conversation:
  {chat_history}
 
  User: {input}
  AI:`;
  
  export async function POST(req: NextRequest) {
    const body = await req.json();
    const messages = body.messages ?? [];
    const systemPromptFromUser = body.systemPrompt;
    const mode = body.mode ?? "explore";
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    let prompt = null;


    if ( systemPromptFromUser ){
      prompt = PromptTemplate.fromTemplate(systemPromptFromUser);
    }else{
      switch(mode){

        case "explore":
          
          prompt = PromptTemplate.fromTemplate(EXPLORE_PROMPT_TEMPLATE);
          break;
  
        case "mindmap":
          prompt = PromptTemplate.fromTemplate(MINDMAP_PROMPT_TEMPLATE);
          break;
  
        case "table":
          prompt = PromptTemplate.fromTemplate(DATABASE_PROMPT_TEMPLATE);
          break;
  
        case "image":  
          prompt = PromptTemplate.fromTemplate(IMAGE_PROMPT_TEMPLATE);
          break;
  
        default:
          prompt = PromptTemplate.fromTemplate(EXPLORE_PROMPT_TEMPLATE);
          break;
      }
    }
    
    const outputParser = new BytesOutputParser();
    const chain = prompt?.pipe(chatAI).pipe(outputParser);
   
    const stream = await chain?.stream({
      chat_history: formattedPreviousMessages.join('\n'),
      input: currentMessageContent,
    });
   
    return new StreamingTextResponse(stream);
  }