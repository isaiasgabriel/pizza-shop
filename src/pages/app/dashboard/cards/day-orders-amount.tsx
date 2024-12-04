import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import { GetDayOrdersAmountAPICall } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DayOrdersAmount() {
  const { data: dayOrdersAmount } = useQuery({
    queryFn: GetDayOrdersAmountAPICall,
    queryKey: ['metrics', 'day-orders-amount'],
  })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Orders (day)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount?.amount.toLocaleString()}
            </span>
            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday > 0 && (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{dayOrdersAmount.diffFromYesterday}%
                  </span>{' '}
                  in comparison to yesterday
                </>
              )}

              {dayOrdersAmount.diffFromYesterday < 0 && (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {dayOrdersAmount.diffFromYesterday}%
                  </span>{' '}
                  in comparison to yesterday
                </>
              )}

              {dayOrdersAmount.diffFromYesterday === 0 && (
                <>Orders made today</>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
