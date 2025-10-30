import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useUsersQuery } from "@/queries/user.queries";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  activos: {
    label: "activos",
    color: "var(--income)",
  },
  inactivos: {
    label: "inactivos",
    color: "var(--expense)",
  },
  becados: {
    label: "becados",
    color: "var(--beca)",
  },
} satisfies ChartConfig;

export function UsersGraphs() {
  const { data: users } = useUsersQuery();

  if (!users) return null;
  const beneficiarios = users.filter((user) => user.role === "BENEFICIARIO");
  const inactiveUsers = beneficiarios.filter((user) => !user.is_active);
  const activeUsers = beneficiarios.filter((user) => user.is_active);
  const grantedUsers = beneficiarios.filter((user) => user.is_granted);

  const chartData = [
    {
      browser: "activos",
      visitors: activeUsers.length,
      fill: "var(--color-activos)",
    },
    {
      browser: "becados",
      visitors: grantedUsers.length,
      fill: "var(--color-becados)",
    },
    {
      browser: "inactivos",
      visitors: inactiveUsers.length,
      fill: "var(--color-inactivos)",
    },
  ];

  return (
    <Card className="">
      <CardContent className="flex-1 pb-0 size-full  flex items-center justify-center  ">
        <ChartContainer config={chartConfig} className="mx-auto   h-[300px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={80}
              strokeWidth={100}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {activeUsers.length.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Activos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-center  items-center gap-2 text-xs ">
        <div className="flex  items-center gap-2 font-medium leading-none">
          <div className="bg-[#348862] size-4 rounded"></div>
          <span> {activeUsers.length} activos</span>
        </div>
        <div className="flex  items-center gap-2 font-medium leading-none">
          <div className="bg-[#fe9a00] size-4 rounded"></div>
          <span>{grantedUsers.length} becados</span>
        </div>
        <div className="flex  items-center gap-2 font-medium leading-none">
          <div className="bg-[#e7000b] size-4 rounded"></div>
          <span>{inactiveUsers.length} bajas</span>
        </div>
      </CardFooter>
    </Card>
  );
}
