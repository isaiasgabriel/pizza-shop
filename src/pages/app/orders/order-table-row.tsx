import { Check, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'outline'} size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Order details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="text-sx font-mono font-medium">
        749a1547-18b9-4dca-a3cc-21e40c8ffcad
      </TableCell>
      <TableCell className="text-muted-foreground">15 minutes ago</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">Waiting</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Bashar Jacskon</TableCell>
      <TableCell className="font-medium">R$ 89,90</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <Check className="h-3 w-3" />
          Approve
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="h-3 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}
