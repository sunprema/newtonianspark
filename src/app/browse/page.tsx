/* eslint-disable @next/next/no-img-element */

import { getTopics } from "@/features/explore/store-service";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";
import moment from "moment";
import { Topic } from "@/types/nspark";


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
        <div className="flex flex-wrap items-baseline justify-center gap-8">
            {
            data?.map( (d)=> {
                return (
                <div key={d.flowKey} className="group h-full w-[250px]">    
                
                
                <Card className=" rounded-md bg-slate-100 shadow-2xl hover:border-orange-500  dark:bg-slate-700 dark:shadow-lg dark:hover:border-orange-500">
                    <Link  href={`/visit/${d.flowKey}`}>
                    <CardHeader className="p-0">
                    <div className="flex flex-col space-y-2">
                    <img src={d.coverImageURL ?? './thoughts.svg' } alt="cover image" className="h-[150px] w-[full] object-cover" loading="lazy" />
                    <CardTitle className="p-5">
                        <h3 className="scroll-m-20 text-sm font-bold tracking-tight group-hover:text-orange-500 ">
                            {d.title}
                        </h3>
                    </CardTitle>
                    </div>
                    </CardHeader>
                    
                    <CardContent className="px-0">
                        <p className="px-4 scroll-m-20 text-xs font-extralight opacity-50 tracking-tight text-gray-800 dark:text-gray-100">
                        {`Created:${moment(d.created_at).format("ddd, MMM Do YY, h:mm:ss a")}`}
                        </p>
                        <p className="p-2 scroll-m-20 text-xs font-light tracking-tight text-gray-800 dark:text-gray-100">
                        {d.summary}
                        </p>
                    </CardContent>
                    </Link>                   
                </Card>
                </div>
                )
            })
            } 
        </div>
        </section>
    )
    
}
export const revalidate = 60;
export default Page;