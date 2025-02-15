/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function PerformanceChart({ data, text, total }: { data: any[], text: string, total: number }) {


  return (
    <div className="w-full p-6 bg-background rounded-lg border">
      <div className="flex items-center justify-between mb-6">
        <div className="w-full">
          <h2 className="text-xl font-semibold text-center">
            {text}
          </h2>
          <div className="mt-2 w-full">
            <span className="text-lg text-gray-400 font-semibold text-center">Total: {total}</span>
          </div>
        </div>
      </div>

      <ChartContainer
        className="h-[300px] w-full"
        config={{
          income: {
            label: "Income",
            color: "hsl(var(--primary))",
          },
          expense: {
            label: "Expense",
            color: "hsl(var(--primary) / 0.2)",
          },
        }}
      >
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth={2}
            dot={false}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload) {
                return (
                  <ChartTooltipContent
                    className="border bg-background"
                    items={[
                      {
                        label: "Income",
                        value: `$${payload[0]?.value / 1000}k`,
                        color: "hsl(var(--primary))",
                      },
                      {
                        label: "Expense",
                        value: `$${payload[1]?.value / 1000}k`,
                        color: "hsl(var(--primary) / 0.2)",
                      },
                    ]}
                  />
                );
              }
              return null;
            }}
          />
        </LineChart>
      </ChartContainer>

      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "hsl(var(--primary) / 0.2)" }}
          />
          <span className="text-sm text-muted-foreground">Expense</span>
        </div>
      </div>
    </div>
  );
}
