import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

const chartConfig = {
  value: {
    label: "value",
    color: "var(--chart-3)",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function ExpensesByCategory() {
  const { inmutableTransactions } = useAppSelector((s) => s.transactions);

  const categories = inmutableTransactions
    .filter((t) => t.direction === "EXPENSE")
    .map((t) => t.category);

  const list: Record<string, number> = {};

  categories.forEach((category) => {
    list[category] = inmutableTransactions
      .filter((t) => t.category === category && t.direction === "EXPENSE")
      .reduce((a, b) => a + b.amount, 0);
  });

  const chartData = Object.keys(list).map((category) => ({
    category,
    value: list[category],
  }));
  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle>Gastos por categoría</CardTitle>
        <CardDescription>
          Gastos en el año {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 50,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="value" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="value"
              layout="vertical"
              fill="var(--color-value)"
              radius={4}
            >
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-[#fff]"
                fontSize={12}
              />
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
