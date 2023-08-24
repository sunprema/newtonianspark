
import 'server-only'

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
    
});

export const ExploreTopic = async ( {explore, context}:
    
    { explore: string, context : object | null }) => {

    console.log(context)    
    const prompt = new ChatPromptTemplate({
        promptMessages:[
            SystemMessagePromptTemplate.fromTemplate("Help explore the topic provided in the following message"),
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