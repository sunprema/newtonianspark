
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
  
  
 
 interface Columns {
    name:string, 
    type:
  | 'integer'
  | 'bigint'
  | 'decimal'
  | 'numeric'
  | 'real'
  | 'double precision'
  | 'smallserial'
  | 'serial'
  | 'bigserial'
  | 'character'
  | 'varchar'
  | 'text'
  | 'bytea'
  | 'date'
  | 'time'
  | 'timestamp'
  | 'timestamp with time zone'
  | 'interval'
  | 'boolean'
  | 'enum'
  | 'point'
  | 'line'
  | 'lseg'
  | 'box'
  | 'path'
  | 'polygon'
  | 'circle'
  | 'inet'
  | 'cidr'
  | 'macaddr'
  | 'macaddr8'
  | 'bit'
  | 'bit varying'
  | 'tsvector'
  | 'tsquery'
  | 'uuid'
  | 'json'
  | 'jsonb'
  | 'array'
  | 'int4range'
  | 'int8range'
  | 'numrange'
  | 'tsrange'
  | 'tstzrange'
  | 'daterange'
  | 'any'
  | 'anyelement'
  | 'void';

    
    totalAmount:string, paymentMethod:string

 } 

 function TableDemo({invoices}:{invoices:Invoice[]}) {
    return (
      <Table>
        <TableCaption>Customers</TableCaption>
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
      <Handle id="3" type="target" position={Position.Left} className="!h-6 !w-2 !rounded-none !bg-red-500"  />
      <Handle id="4" type="target" position={Position.Top} className="!h-2 !w-6 !rounded-none !bg-red-500" />
      </div>
    )
  
  
  }
  
  export default TableNode;