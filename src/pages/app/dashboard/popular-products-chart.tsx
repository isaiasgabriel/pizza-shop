import { BarChart } from 'lucide-react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { product: 'Chesse', amount: 900 },
  { product: 'Broccoli', amount: 1100 },
  { product: 'Pepperoni', amount: 1000 },
  { product: 'Margherita', amount: 800 },
  { product: 'Hawaiian', amount: 700 },
]

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Popular products
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie data={data} dataKey="amount" nameKey="product" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
