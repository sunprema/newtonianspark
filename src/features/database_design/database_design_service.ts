
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