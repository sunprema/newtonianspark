
import { getTopics } from "@/features/explore/store-service";

import {
    Card,
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
        <div className="container mx-auto mt-24 flex justify-around">
            {
            data?.map( (d)=> {
                return (
                <Link key={d.flowKey} href={`/visit/${d.flowKey}`}>    
                <Card className="hover:bg-muted h-[300px] w-[300px] rounded-none hover:shadow-lg " >
                    <CardHeader>
                    <CardTitle>{d.title}</CardTitle>
                    <CardDescription>{d.summary}</CardDescription>
                    </CardHeader>
                </Card>
                </Link>
                )
            })
            }  
        </div>
    )
    
}

export default Page ;