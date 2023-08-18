
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  

  
  import { Handle, Position } from 'reactflow';
  
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const tableData = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
 
 interface Invoice {
    invoice:string, paymentStatus:string, totalAmount:string, paymentMethod:string

 } 

 function TableDemo({invoices}:{invoices:Invoice[]}) {
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice:Invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
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
        <TableDemo invoices = {tableData} />
      </CardContent>
        
      <CardFooter className="flex justify-between">
        <Badge variant="outline">Cancel</Badge>
        <Badge variant="outline" onClick={() => alert("Hi")}>Deploy</Badge>
      </CardFooter>
      
      </Card>
      <Handle id="1" type="source" position={Position.Right} className="!h-6 !w-2 !rounded-none !bg-green-500"  />
      <Handle id="2" type="source" position={Position.Bottom} className="!h-2 !w-6 !rounded-none !bg-green-500" />
      <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
      <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" />
      </div>
    )
  
  
  }
  
  export default TableNode;