import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { GetMonthRevenueAPICall } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: GetMonthRevenueAPICall,
  })
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total revenue (month)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthRevenue.receipt.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              {monthRevenue.diffFromLastMonth > 0 && (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{monthRevenue.diffFromLastMonth}%
                  </span>{' '}
                  in comparison to last month
                </>
              )}

              {monthRevenue.diffFromLastMonth < 0 && (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {monthRevenue.diffFromLastMonth}%
                  </span>{' '}
                  in comparison to last month
                </>
              )}

              {monthRevenue.diffFromLastMonth === 0 && <>Revenue this month</>}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
