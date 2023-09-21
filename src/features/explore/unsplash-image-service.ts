
import 'server-only'

export const UnsplashImageService = async ( prompt:string ) => {
    
    try{
       const response = await fetch(`https://api.unsplash.com/search/photos/?query=${encodeURIComponent(prompt)}`,
              {
                "headers" : {
                  "Authorization":  `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
                  "Content-Type": "application/json",
                }
                  
              }
       )
       if( response.ok) {
        const data = await response.json()
        const imageData = data.results 
        return imageData ;

       }else{
        console.log( response.status, response.statusText)
        console.log(response)
        throw new Error(`Error fetching images: ${response.statusText}`)
        
       }

    }catch(errorz){
       console.log(errorz)
       throw errorz ;
    }
    
    
}