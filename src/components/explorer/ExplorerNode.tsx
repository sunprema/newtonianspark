

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"


const ExplorerNode = ({data}:{data:any}) => {
  console.log(data)  
  return (
    <Card className="w-[350px] h-[250px]">
      <CardHeader>
        <CardTitle>{data.topic}</CardTitle>
        <CardDescription>{data.summary}</CardDescription>
      </CardHeader>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )


}

export default ExplorerNode ;