"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const data = [
  { date: "2023-01", active: 400, new: 240, returning: 160 },
  { date: "2023-02", active: 450, new: 270, returning: 180 },
  { date: "2023-03", active: 500, new: 300, returning: 200 },
  { date: "2023-04", active: 550, new: 330, returning: 220 },
  { date: "2023-05", active: 600, new: 360, returning: 240 },
  { date: "2023-06", active: 650, new: 390, returning: 260 },
  { date: "2023-07", active: 700, new: 420, returning: 280 },
  { date: "2023-08", active: 750, new: 450, returning: 300 },
  { date: "2023-09", active: 800, new: 480, returning: 320 },
  { date: "2023-10", active: 850, new: 510, returning: 340 },
  { date: "2023-11", active: 900, new: 540, returning: 360 },
  { date: "2023-12", active: 950, new: 570, returning: 380 },
];

export function UserMetrics() {
  return (
    <ChartContainer
      config={{
        active: {
          label: "Active Users",
          color: "hsl(var(--chart-1))",
        },
        new: {
          label: "New Users",
          color: "hsl(var(--chart-2))",
        },
        returning: {
          label: "Returning Users",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="active"
            stroke="var(--color-active)"
            fill="var(--color-active)"
            fillOpacity={0.2}
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="new"
            stroke="var(--color-new)"
            fill="var(--color-new)"
            fillOpacity={0.2}
            stackId="1"
          />
          <Area
            type="monotone"
            dataKey="returning"
            stroke="var(--color-returning)"
            fill="var(--color-returning)"
            fillOpacity={0.2}
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
