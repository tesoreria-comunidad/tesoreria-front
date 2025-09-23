import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactionsStatsQuery } from "@/queries/transactions.queries";
export const description = "A multiple bar chart";

const chartConfig = {
  income: {
    label: "Ingresos",
    color: "var(--chart-2)",
  },
  expense: {
    label: "Egresos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function TransactionGraph() {
  const transaccitionsStatsQuery = useTransactionsStatsQuery();

  if (transaccitionsStatsQuery.isLoading) return "Loading";

  if (!transaccitionsStatsQuery.data) return;
  return (
    <Card className="size-full relative">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Ingresos - Egresos</span>
        </CardTitle>
        <CardDescription>
          {transaccitionsStatsQuery.data[0]?.month} -{" "}
          {transaccitionsStatsQuery.data.length > 1
            ? transaccitionsStatsQuery.data[
                transaccitionsStatsQuery.data.length - 1
              ].month
            : ""}{" "}
          2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={transaccitionsStatsQuery.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => String(value).toUpperCase()}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" isMoney />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
