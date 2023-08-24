
import 'server-only'
import axios from 'axios'


const headers ={
  "content-type": "application/json",
   Authorization:  "Bearer " + process.env.OPENAI_KEY,
  }




export const DallEImageService = async ( prompt:string, context:string | null) => {
    

    const params = {
        "prompt": prompt,
        "n":1,
        "size":"512x512",
        "response_format" : "b64_json"
    }

    try{
       const response = await fetch("https://api.openai.com/v1/images/generations",
              {
                body: JSON.stringify(params),
                method: "POST",
                headers : {
                  "content-type": "application/json",
                  "Authorization":  "Bearer " + process.env.OPENAI_KEY,
                  }
                  
              }
       )
       if( response.ok) {
        const {data} = await response.json()
        const imageData = data[0]["b64_json"]
        return imageData ;
       }else{
        console.log( response.status, response.statusText)
        console.log(response)
       }

    }catch(errorz){
       console.log(errorz)
       throw errorz ;
    }
    
    
}