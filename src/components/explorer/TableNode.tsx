
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  
 
 

 const TableDisplay = ({data:}) => {

 }
  
  
  const TableNode = ({data}:{data:any}) => {
    console.log(data)  
    const {topic, summary} = data
     
    return (
      <div>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>{topic}</CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardHeader>
        <CardContent>
        <TableDisplay data={data} />
        </CardContent>
        
      <CardFooter className="flex justify-between">
        <Badge variant="outline">Explore more</Badge>
      </CardFooter>
      
      </Card>
      
      </div>
    )
  
  
  }
  
  export default TableNode;