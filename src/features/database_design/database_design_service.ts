
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
    modelName: "gpt-3.5-turbo-0613", 
    temperature: 1
});

export const DatabaseDesignService = async ( {explore, context}:{ explore: string, context : object | null }) => {
    
    const prompt = new ChatPromptTemplate({
        promptMessages:[
            SystemMessagePromptTemplate.fromTemplate("You are a database domain expert and will help design eloaborate table schema that fits user requirements."),
            HumanMessagePromptTemplate.fromTemplate("{inputText}"),
        ],
        inputVariables:["inputText"]
    });

    const chain = createStructuredOutputChainFromZod(TableDDLSchema, {
        prompt,
        llm: chatAI,
      });
    
    let result = null
    let error = null
    try{
        //result = DUMMY_DATA
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

const DUMMY_DATA = {
    "output": {
      "tables": [
        {
          "table_name": "movies",
          "description": "Table to track movies running in the theaters",
          "columns": [
            {
              "name": "id",
              "type": "integer",
              "primary_key": true
            },
            {
              "name": "title",
              "type": "string",
              "primary_key": false
            },
            {
              "name": "release_date",
              "type": "date",
              "primary_key": false
            },
            {
              "name": "rating",
              "type": "decimal",
              "primary_key": false
            }
          ]
        },
        {
          "table_name": "actors",
          "description": "Table to track actors in movies",
          "columns": [
            {
              "name": "id",
              "type": "integer",
              "primary_key": true
            },
            {
              "name": "name",
              "type": "string",
              "primary_key": false
            }
          ]
        },
        {
          "table_name": "directors",
          "description": "Table to track directors of movies",
          "columns": [
            {
              "name": "id",
              "type": "integer",
              "primary_key": true
            },
            {
              "name": "name",
              "type": "string",
              "primary_key": false
            }
          ]
        },
        {
          "table_name": "movie_actors",
          "description": "Table to track the association between movies and actors",
          "columns": [
            {
              "name": "movie_id",
              "type": "integer",
              "primary_key": true,
              "foreign_key": {
                "table_name": "movies",
                "column": "id"
              }
            },
            {
              "name": "actor_id",
              "type": "integer",
              "primary_key": true,
              "foreign_key": {
                "table_name": "actors",
                "column": "id"
              }
            }
          ]
        },
        {
          "table_name": "movie_directors",
          "description": "Table to track the association between movies and directors",
          "columns": [
            {
              "name": "movie_id",
              "type": "integer",
              "primary_key": true,
              "foreign_key": {
                "table_name": "movies",
                "column": "id"
              }
            },
            {
              "name": "director_id",
              "type": "integer",
              "primary_key": true,
              "foreign_key": {
                "table_name": "directors",
                "column": "id"
              }
            }
          ]
        }
      ]
    }
  }