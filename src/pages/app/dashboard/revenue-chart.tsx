import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data = [
  { date: '10/12', revenue: 900 },
  { date: '11/12', revenue: 1100 },
  { date: '12/12', revenue: 1000 },
  { date: '13/12', revenue: 800 },
  { date: '14/12', revenue: 700 },
  { date: '15/12', revenue: 1500 },
  { date: '16/12', revenue: 2000 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Revenue in the period
          </CardTitle>
          <CardDescription>Daily revenue in the period</CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <Line type="linear" strokeWidth={2} dataKey="revenue"></Line>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
