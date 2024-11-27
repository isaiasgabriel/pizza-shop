import { DialogDescription } from '@radix-ui/react-dialog'

import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>Order: 749a1547-18b9-4dca-a3cc-21e40c8ffcad</DialogHeader>
      <DialogDescription>
        <span className="text-sm">Details:</span>
      </DialogDescription>

      <div className="space-y-6">
        {/* Order table */}
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                  <span className="font-medium">Pending</span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Client</TableCell>
              <TableCell className="flex justify-end">Bashar Jackson</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Number</TableCell>
              <TableCell className="flex justify-end">786-640-4551</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">bashar@woo.com</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">
                Time since order
              </TableCell>
              <TableCell className="flex justify-end">15 minutes ago</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Order ITEMS table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Qt.</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Large Pepperoni Pizza</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 69,90</TableCell>
              <TableCell className="text-right">R$ 129,80</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Medium Cheese Pizza</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">R$ 69,90</TableCell>
              <TableCell className="text-right">R$ 129,80</TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total:</TableCell>
              <TableCell className="text-right font-medium">
                {' '}
                R$ 259,60
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
