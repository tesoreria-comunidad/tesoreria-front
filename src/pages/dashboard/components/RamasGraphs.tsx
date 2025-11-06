import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { useRamasQuery } from "@/queries/ramas.queries";

const chartConfig = {
  altas: {
    label: "Activos",
    color: "var(--income)",
  },
  bajas: {
    label: "Bajas",
    color: "var(--expense)",
  },
  becas: {
    label: "Becados",
    color: "var(--beca)",
  },
} satisfies ChartConfig;

export function RamasGraphs() {
  const { data: ramas } = useRamasQuery();

  if (!ramas) return null;
  const data = ramas.map((rama) => ({
    name: rama.name,
    altas: rama.users.filter((user) => user.is_active).length,
    becas: rama.users.filter((user) => user.is_granted).length,
    bajas: rama.users.filter((user) => !user.is_active).length,
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Beneficiarios por rama</CardTitle>
        <CardDescription>{new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className=" w-[90%] mx-auto">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="altas" fill="var(--color-altas)" radius={4} />
            <Bar dataKey="bajas" fill="var(--color-bajas)" radius={4} />
            <Bar dataKey="becas" fill="var(--color-becas)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
