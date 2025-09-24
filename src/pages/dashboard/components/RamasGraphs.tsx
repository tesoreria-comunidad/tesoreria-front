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
import { useRamasQuery } from "@/queries/ramas.queries";

const chartConfig = {
  altas: {
    label: "Activos",
    color: "#348862",
  },
  bajas: {
    label: "Bajas",
    color: "#e7000b",
  },
  becas: {
    label: "Becados",
    color: "#fe9a00",
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
    <Card className="size-full ">
      <CardHeader>
        <CardTitle>Beneficiarios por rama</CardTitle>
        <CardDescription>{new Date().getFullYear()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
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
      <CardFooter>
        <div className="flex justify-between w-full">
          {data.map((rama) => (
            <div key={rama.name} className="flex flex-col items-center gap-2">
              <span className="font-medium">{rama.name}</span>
              <div className="flex flex-col items-start gap-1 text-xs">
                <div className="flex  items-center gap-2  leading-none">
                  <div className="bg-[#348862] size-2 rounded"></div>
                  <span> {rama.altas} activos</span>
                </div>
                <div className="flex  items-center gap-2  leading-none">
                  <div className="bg-[#fe9a00] size-2 rounded"></div>
                  <span>{rama.becas} becados</span>
                </div>
                <div className="flex  items-center gap-2  leading-none">
                  <div className="bg-[#e7000b] size-2 rounded"></div>
                  <span>{rama.bajas} bajas</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
