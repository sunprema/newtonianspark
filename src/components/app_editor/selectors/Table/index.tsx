import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {TableSettings} from "./TableSettings"

import { useNode } from "@craftjs/core"

const NSTable = ({caption}:{caption:string}) => {

    const {connectors:{connect, drag}, selected} = useNode((node) => ({
        selected: node.events.selected
    }))

return (
<div ref={(ref) => connect(drag(ref as HTMLElement))} className="border p-5 m-20">        
<Table >
  <TableCaption>{caption}</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>User</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell>Sundar</TableCell>      
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
</div>

    )
  }

NSTable.craft = {
    displayName:'Table',
    related:{
        settings: TableSettings,
    }
}  

export default NSTable