import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getOrdersAPICall } from '@/api/get-orders'
import { Pagination } from '@/components/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'

export function Orders() {
  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrdersAPICall,
  })

  return (
    <>
      {/* Title */}
      <Helmet title="Orders" /* Tab Title */ />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold -tracking-tight">Orders</h1>

        {/* Content */}
        <div
          className="space-y-4"
          /* space-y-2.5 > margin-top: 0.625rem > 10px */
        >
          {/* Search */}
          <OrderTableFilters />
          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[325px]">Identifier</TableHead>
                  <TableHead className="w-[180px]">Created</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="w-[140px]">Total</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* 
                  Result is the response of the API fetch made by the useQuery function above.
                  So it checks if there is a result. If a result exists, the orders will be mapped.
                  Note: The response from the orders route is divided into `meta` and `orders`.
                  This is why the code accesses `result.orders.map` instead of just `result.map`.
                  The `map` function iterates over each order and creates a corresponding 
                  <OrderTableRow /> component for it.
                */}
                {result &&
                  result.orders.map((order) => {
                    return <OrderTableRow key={order.orderId} order={order} />
                  })}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={105} perPage={10} />
        </div>
      </div>
    </>
  )
}
