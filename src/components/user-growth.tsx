"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

const data = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 150 },
  { month: "Mar", users: 180 },
  { month: "Apr", users: 220 },
  { month: "May", users: 270 },
  { month: "Jun", users: 310 },
  { month: "Jul", users: 350 },
  { month: "Aug", users: 400 },
  { month: "Sep", users: 450 },
  { month: "Oct", users: 500 },
  { month: "Nov", users: 550 },
  { month: "Dec", users: 600 },
]

export function UserGrowth() {
  return (
    <ChartContainer
      config={{
        users: {
          label: "New Users",
          color: "hsl(var(--chart-2))",
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
          <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => [`${value} users`, "New Users"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Bar dataKey="users" fill="var(--color-users)" radius={[4, 4, 0, 0]} className="fill-primary" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

