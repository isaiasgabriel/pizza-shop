import { formatDistanceToNow } from 'date-fns'
import { Check, Search, X } from 'lucide-react'

import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
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
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {order.total.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
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
