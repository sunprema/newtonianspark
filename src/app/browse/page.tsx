
import { getTopics } from "@/features/explore/store-service";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

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
        <div className="grid grid-cols-5 gap-5">
            {
            data?.map( (d,index)=> {
                return (
                <Card className="w-[350px] h-[350px]" key={d.flowKey}>
                    <CardHeader>
                    <CardTitle>{d.title}</CardTitle>
                    <CardDescription>{d.summary}</CardDescription>
                    </CardHeader>

                </Card>
                )
            })
            }  
        </div>
    )
    
}

export default Page ;