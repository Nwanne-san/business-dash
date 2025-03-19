"use client"

import { Bar, BarChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const data = [
  { date: "2023-01", revenue: 4000, orders: 240, average: 167 },
  { date: "2023-02", revenue: 4500, orders: 270, average: 167 },
  { date: "2023-03", revenue: 5000, orders: 300, average: 167 },
  { date: "2023-04", revenue: 5500, orders: 330, average: 167 },
  { date: "2023-05", revenue: 6000, orders: 360, average: 167 },
  { date: "2023-06", revenue: 6500, orders: 390, average: 167 },
  { date: "2023-07", revenue: 7000, orders: 420, average: 167 },
  { date: "2023-08", revenue: 7500, orders: 450, average: 167 },
  { date: "2023-09", revenue: 8000, orders: 480, average: 167 },
  { date: "2023-10", revenue: 8500, orders: 510, average: 167 },
  { date: "2023-11", revenue: 9000, orders: 540, average: 167 },
  { date: "2023-12", revenue: 9500, orders: 570, average: 167 },
]

export function SalesMetrics() {
  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
        orders: {
          label: "Orders",
          color: "hsl(var(--chart-2))",
        },
        average: {
          label: "Average Order Value",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value, name) => {
              if (name === "revenue") return [`$${value}`, "Revenue"]
              if (name === "average") return [`$${value}`, "Average Order Value"]
              return [`${value}`, "Orders"]
            }}
          />
          <Bar yAxisId="left" dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
          <Line yAxisId="left" type="monotone" dataKey="average" stroke="var(--color-average)" strokeWidth={2} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

