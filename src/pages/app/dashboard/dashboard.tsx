import { Helmet } from 'react-helmet-async'

import { DayOrdersAmount } from './cards/day-orders-amount'
import { MonthCanceledOrdersAmount } from './cards/month-canceled-orders-amount'
import { MonthOrdersAmount } from './cards/month-orders-amount-card'
import { MonthRevenueCard } from './cards/month-revenue-card'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmount />
          <DayOrdersAmount />
          <MonthCanceledOrdersAmount />
        </div>
      </div>
    </>
  )
}
