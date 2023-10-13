import { Skeleton } from "@/components/ui/skeleton"

export default function IndexPage() {

    return (
    
        <div className="absolute left-0 top-4 h-full w-full dark:bg-slate-800">
        
        <div className="container mx-auto flex h-full items-center">
        <h1 className="font-3xl font-mono">Work in progress...</h1>  
        
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
        </div>
        </div>
            
        </div>     
    

    )

}