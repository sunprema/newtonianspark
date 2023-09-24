/* eslint-disable @next/next/no-img-element */

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
        <div className="flex flex-wrap items-center justify-center gap-8">
            {
            data?.map( (d)=> {
                return (
                <div key={d.flowKey} className="w-[250px] min-h-[250px]">    
                <Link  href={`/visit/${d.flowKey}`}>    
                <Card className="group rounded-md bg-slate-100 shadow-2xl hover:border-orange-500  dark:bg-slate-700 dark:shadow-lg dark:hover:border-orange-500" >
                    <CardHeader className="p-0">
                    <div className="flex flex-col space-y-2">
                    <img src={d.coverImageURL ?? './thoughts.svg' } alt="cover image" className="object-cover h-[150px] w-[full]" loading="lazy" />
                    <CardTitle className="p-5">
                        <h3 className="text-sm scroll-m-20 font-bold tracking-tight group-hover:text-orange-500 ">
                            {d.title}
                        </h3>
                    </CardTitle>
                    </div>
                    </CardHeader>
                    
                    <CardContent className="p-2">
                        <p className="scroll-m-20 text-xs font-light tracking-tight text-gray-800 dark:text-gray-100">
                        {d.summary}
                        </p>
                    </CardContent>
                </Card>
                </Link>
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