import { Repeat2, TrendingUp } from "lucide-react";
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
import { useAppSelector } from "@/store/hooks";
import { useTransactionsQueries } from "@/queries/transactions.queries";
import { Button } from "@/components/ui/button";
import { TooltipComponent } from "@/components/common/TooltipComponent";
import { useState } from "react";
import { useAlert } from "@/context/AlertContext";

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
  const { transactionsStats } = useAppSelector((s) => s.transactions);
  const { fetchTransactionsStats } = useTransactionsQueries();
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const handleReloadStats = async () => {
    setLoading(true);
    await fetchTransactionsStats();
    showAlert({
      title: "Estadisticas  actualizadas",
      type: "info",
    });
    setLoading(false);
  };
  return (
    <Card className="size-full relative">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Ingresos - Egresos</span>
          <TooltipComponent text="Refrescar">
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={handleReloadStats}
              isLoading={loading}
            >
              <Repeat2 />
            </Button>
          </TooltipComponent>
        </CardTitle>
        <CardDescription>
          {transactionsStats[0]?.month} -{" "}
          {transactionsStats.length > 1
            ? transactionsStats[transactionsStats.length - 1].month
            : ""}{" "}
          2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={transactionsStats}>
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
