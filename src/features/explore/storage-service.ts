import 'server-only'

import { decode } from 'base64-arraybuffer'

import { createClient } from '@supabase/supabase-js'

const IMAGE_BUCKET_NAME = "explore_images"
const IMAGE_TYPE = "image/png"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '',process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '', 
    {'auth' : {persistSession: false}

    })

//This function will store and image to a bucket in supabase storage and return the public URL    
export const StoreImageService = async(fileName:string, b4_json:string):Promise<string> => {
    const { data, error } = await supabase
            .storage
            .from(IMAGE_BUCKET_NAME)
            .upload(fileName, decode(b4_json), {
                contentType: IMAGE_TYPE
            })

    if (error != null){
        throw error
    }       
    const  imagePath = data.path

    const {data:{publicUrl}} = supabase
            .storage
            .from(IMAGE_BUCKET_NAME)
            .getPublicUrl(imagePath)

    return publicUrl             

}    