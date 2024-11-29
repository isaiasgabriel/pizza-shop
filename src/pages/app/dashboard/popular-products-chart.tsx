import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { product: 'Chesse', amount: 40 },
  { product: 'Broccoli', amount: 30 },
  { product: 'Pepperoni', amount: 50 },
  { product: 'Margherita', amount: 20 },
  { product: 'Hawaiian', amount: 10 },
]

const COLORS = [
  colors.violet[500],
  colors.sky[500],
  colors.amber[500],
  colors.emerald[500],
  colors.rose[500],
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
            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              /* outerRadius and innerRadius needs each other to work */
              /* it basically create a ring-shaped chart with nothing inside */
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8} /* Border width */
            >
              {data.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80" // applies the background color to the border
                  />
                )
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
