
import { getTopics } from "@/features/explore/store-service";

import {
    Card,
    CardContent,
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
        <section className="min-h-screen  dark:bg-slate-600">
        <h3 className="mb-8 border-b p-8 text-2xl font-bold">Articles</h3>   
        <div className="flex flex-wrap items-center justify-center gap-8 ">
            {
            data?.map( (d)=> {
                return (
                <Link key={d.flowKey} href={`/visit/${d.flowKey}`}>    
                <Card className="group h-[300px] w-[300px] rounded-none bg-slate-100 shadow-2xl hover:border-orange-500  dark:bg-slate-700 dark:shadow-lg dark:hover:border-orange-500" >
                    <CardHeader className="border-b border-solid border-slate-400">
                    <CardTitle >
                    <h3 className="text-md scroll-m-20 font-bold tracking-tight group-hover:text-orange-500 ">
                        {d.title}
                    </h3>
                    </CardTitle>                    
                    </CardHeader>
                    <CardContent className="p-4">
                        <h4 className="scroll-m-20 text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                        {d.summary}
                        </h4>
                    </CardContent>
                </Card>
                </Link>
                )
            })
            } 
        </div>
        </section>
    )
    
}
export const revalidate = 60;
export default Page;