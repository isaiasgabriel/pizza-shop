import { Helmet } from 'react-helmet-async'

import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
        <form className="flex items-center gap-2">
          <span className="text-sm font-semibold">Filters:</span>
          <Input placeholder="Client's name" className="h-8 w-[320px]" />
        </form>

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
      </div>
    </>
  )
}
