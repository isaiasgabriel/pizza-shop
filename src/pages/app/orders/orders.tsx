import { Helmet } from 'react-helmet-async'

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
  return (
    <>
      {/* Title */}
      <Helmet title="Orders" /* Tab Title */ />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold -tracking-tight">Orders</h1>
      </div>

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
                <TableHead className="w-[180px]">Time passed</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="w-[140px]">Total</TableHead>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => {
                return <OrderTableRow key={i} />
              })}
            </TableBody>
          </Table>
        </div>
        <Pagination pageIndex={0} totalCount={105} perPage={10} />
      </div>
    </>
  )
}
