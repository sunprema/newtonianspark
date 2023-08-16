import 'server-only'

import path from 'path';
import { promises as fs } from 'fs';


export const ExploreDummyTopic = async ( {explore, context}:
    { explore: string, context : object | null }) => {


    const jsonDirectory = path.join(process.cwd(), 'dummyData');
    //Read the json data file data.json
    const result = await fs.readFile(jsonDirectory + '/explore_dummy_data.json', 'utf8');    
    
    return {
        result : JSON.parse(result)
    }
    
}