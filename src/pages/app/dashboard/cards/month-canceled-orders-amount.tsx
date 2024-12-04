import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { GetMonthCanceledOrdersAmountAPICall } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthCanceledOrdersAmount() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryFn: GetMonthCanceledOrdersAmountAPICall,
    queryKey: ['metrics', 'month-canceled-orders-amount'],
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Canceled (month)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrdersAmount.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthCanceledOrdersAmount.diffFromLastMonth > 0 && (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{monthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  in comparison to last month
                </>
              )}

              {monthCanceledOrdersAmount.diffFromLastMonth < 0 && (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrdersAmount.diffFromLastMonth}%
                  </span>{' '}
                  in comparison to last month
                </>
              )}

              {monthCanceledOrdersAmount.diffFromLastMonth === 0 && (
                <>Orders canceled this month</>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
