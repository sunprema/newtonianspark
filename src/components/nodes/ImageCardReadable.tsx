import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"

  import Image from "next/image";

export  const ImageCardReadable = ( {nodeId, data}:{nodeId:string, data:any} ) => {
     const {topic, summary, imageURL, mode} = data
    return (
      <div>
        
      <Card className= "shadow-2xl dark:bg-slate-700">
        <CardHeader>
          <CardTitle>{topic}</CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardHeader>
        
        <CardContent>
            <div className="nodrag container w-[full] mx-auto">            
              <Image src={imageURL} width={500} height={400} alt={topic} />
            </div>
        </CardContent>
        
        
      </Card>
       </div>
    )

  }

