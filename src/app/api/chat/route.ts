
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
    temperature: 0.8
});
 
const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
  };
   
  const TEMPLATE = `You are a database domain expert.You will help generate a expert level prompt based on user query. Users should be able to use that prompt to generate database schema.
  
  Current conversation:
  {chat_history}
 
  User: {input}
  AI:`;
  
  
  export async function POST(req: NextRequest) {
    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
   
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    
    
    const outputParser = new BytesOutputParser();
    const chain = prompt.pipe(chatAI).pipe(outputParser);
   
    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join('\n'),
      input: currentMessageContent,
    });
   
    return new StreamingTextResponse(stream);
  }