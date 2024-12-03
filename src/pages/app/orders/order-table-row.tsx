import { useMutation } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { Check, Search, X } from 'lucide-react'
import { useState } from 'react'

import { CancelOrderAPICall } from '@/api/cancel-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { queryClient } from '@/lib/react-query'

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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const { mutateAsync: cancelOrderFn } = useMutation({
    // 1. Cancel the order through the API
    mutationFn: CancelOrderAPICall,

    // 2. Retrieve all cached queries related to the orders list.
    // `getQueriesData` returns an array of [queryKey, cachedData] pairs for the matching query keys.
    async onSuccess(_, { orderId }) {
      // 2.1. Gather the orders list cache
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      // 2.2. Iterate over each cached query to update its data.
      ordersListCache.forEach(([cacheKey, cacheData]) => {
        if (!cacheData) {
          return // Skip if no cached data exists for the query key.
        }

        // 2.3. Update the specific cached query data.
        queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return { ...order, status: 'canceled' }
            }

            return order
          }),
        })
      })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant={'outline'} size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Order details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
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
        <Button
          variant="ghost"
          size="xs"
          // You can only cancel the order if it's 'pending' or 'processing'
          // any other status you can't cancel it
          disabled={!['pending', 'processing'].includes(order.status)}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="h-3 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}
