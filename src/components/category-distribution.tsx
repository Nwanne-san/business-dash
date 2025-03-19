"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

const data = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home & Garden", value: 20 },
  { name: "Sports", value: 15 },
  { name: "Other", value: 5 },
];

export function CategoryDistribution() {
  return (
    <ChartContainer
      config={{
        electronics: {
          label: "Electronics",
          color: "hsl(var(--chart-1))",
        },
        clothing: {
          label: "Clothing",
          color: "hsl(var(--chart-2))",
        },
        home: {
          label: "Home & Garden",
          color: "hsl(var(--chart-3))",
        },
        sports: {
          label: "Sports",
          color: "hsl(var(--chart-4))",
        },
        other: {
          label: "Other",
          color: "hsl(var(--chart-5))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => {
              const colors = [
                "var(--color-electronics)",
                "var(--color-clothing)",
                "var(--color-home)",
                "var(--color-sports)",
                "var(--color-other)",
              ];
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              );
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
