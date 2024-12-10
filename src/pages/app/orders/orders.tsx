import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

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
import { OrderTableSkeleton } from './order-table-skeleton'

export function Orders() {
  // Why not use states?
  // Because states reset to their initial value after a page reload.
  // Instead, we use search parameters, which persist even after a reload.
  // This also allows us to share a link, and it will open on the same pageIndex.

  const [searchParams, setSearchParams] = useSearchParams()

  // Instead of using the following approach directly:
  //
  // const pageIndex = searchParams.get('page') ?? 0;
  //
  // we avoid it because, for users, a page number of 0 doesn't make sense.
  // To ensure a user-friendly experience, we default to page 1 in the search parameters.
  // However, when fetching data from the API, we adjust the page number by subtracting 1
  // (to match the API's expected zero-based indexing).

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? 1)

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    // The queryKey includes dynamic parameters (pageIndex, orderId, customerName, and status) that uniquely identify the query.
    // React Query uses this key to manage caching and determine if a new API call is needed.
    // When React Query detects a new queryKey, it automatically triggers a fresh API fetch using the queryFn.
    // So whenever we update the searchParams in the order-table-filters.tsx file, it will automatically trigger this function
    // that'll fetch the data that matches de searchParams on the URL.
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrdersAPICall({
        pageIndex,
        orderId,
        customerName,
        status: status === 'all' ? null : status, // checks if the status is "all", if so returns null to the request
      }),
  })

  // When we set the pageIndex, we increment it by 1.
  // Our functions that retrieve the page index subtract 1,
  function handlePaginate(pageIndex: number) {
    // state is the existing search params in the URL
    setSearchParams((state) => {
      state.set('page', (pageIndex + 1).toString())

      return state
    })
  }

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
                {isLoadingOrders && <OrderTableSkeleton />}
                {result &&
                  result.orders.map((order) => {
                    return <OrderTableRow key={order.orderId} order={order} />
                  })}
              </TableBody>
            </Table>
          </div>
          {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
            />
          )}
        </div>
      </div>
    </>
  )
}
