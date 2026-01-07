"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Project {
  id: string;
  name: string;
  progress: number;
  status: string;
}

interface PortfolioOverviewChartProps {
  projects: Project[];
}

export function PortfolioOverviewChart({
  projects,
}: PortfolioOverviewChartProps) {
  const chartData = projects.map((project, index) => ({
    project: project.name,
    progress: project.progress,
    fill: `hsl(${217 + index * 30}, 100%, ${50 + index * 10}%)`,
  }));

  const totalProgress = projects.reduce((acc, p) => acc + p.progress, 0);
  const avgProgress = Math.round(totalProgress / projects.length);

  const chartConfig = projects.reduce((acc, project) => {
    acc[project.name] = {
      label: project.name,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Portfolio Progress</CardTitle>
        <CardDescription>
          Average completion across all projects
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="progress"
              nameKey="project"
              innerRadius={60}
              strokeWidth={5}
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
                          {avgProgress}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Average
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
    </Card>
  );
}
