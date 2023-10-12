

import { getValue } from "@/features/explore/store-service"

import PresentationHandler from "@/components/present/PresentationHandler";
import { Topic} from "@/types/nspark";

const PresentPage = async ({params}:{params:{'key': string}}) => {
    
    const {key} = params
    const value = await getValue(key)
    console.log(value)
    const topic = value as Topic
    
    if(value == null){
        return <h1>No data for key ${key}</h1>
    }
    
    return (
        <PresentationHandler topic={topic} flowKey={key} />    
    )
}

export default PresentPage ; 