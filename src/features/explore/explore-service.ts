'use server'
import 'server-only'

export const ExploreTopic = async ( {explore, context}:
    { explore: string, context : object | null }) => {
    
    return {
        explore, context
    }
}