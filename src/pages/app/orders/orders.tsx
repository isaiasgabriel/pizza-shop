import { Check, Search, X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
              <TableRow>
                <TableCell>
                  <Button variant={'outline'} size="xs">
                    <Search className="h-3 w-3" />
                    <span
                      className="sr-only"
                      /* sr-only: screen reader only
                      it'll not be displayed on the screen
                    */
                    >
                      Order details
                    </span>
                  </Button>
                </TableCell>
                <TableCell className="text-sx font-mono font-medium">
                  749a1547-18b9-4dca-a3cc-21e40c8ffcad
                </TableCell>
                <TableCell className="text-muted-foreground">
                  15 minutes ago
                </TableCell>
                <TableCell>
                  <div
                    className="flex items-center gap-2"
                    /**
                     * Apparently you can't apply flex and items-center
                     * directly to the table cell component
                     * so we have to create this div that wraps our
                     * status table cell
                     **/
                  >
                    <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                    <span className="font-medium text-muted-foreground">
                      Waiting
                    </span>
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
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
