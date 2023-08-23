
import { getTopics } from "@/features/explore/store-service";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";

const Page = async() => {

    const {data, error} = await getTopics()

    if (error)
        return error
    if( data === null || data.length ==0 ){
        return (
            <h1> No data available</h1>
        )
    }

    return (
        <div className="container mx-auto mt-24 flex flex-wrap gap-8">
            {
            data?.map( (d)=> {
                return (
                <Link key={d.flowKey} href={`/visit/${d.flowKey}`}>    
                <Card className="hover:bg-muted h-[300px] w-[300px] rounded-none bg-slate-100 hover:shadow-lg dark:bg-slate-700 " >
                    <CardHeader>
                    <CardTitle>
                    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        {d.title}
                    </h3>
                        
                    </CardTitle>
                    
                    </CardHeader>
                    <CardContent>
                        <h4 className="scroll-m-20 text-lg text-gray-800 font-semibold tracking-tight dark:text-gray-100">
                        {d.summary}
                        </h4>
                    </CardContent>
                </Card>
                </Link>
                )
            })
            }  
        </div>
    )
    
}
export const revalidate = 60;
export default Page;