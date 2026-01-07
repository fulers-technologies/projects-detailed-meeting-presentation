"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

interface Phase {
  name: string;
  status: string;
  completion: number;
}

interface ProjectTimelineChartProps {
  phases: Phase[];
  projectName: string;
}

export function ProjectTimelineChart({
  phases,
  projectName,
}: ProjectTimelineChartProps) {
  const chartData = phases.map((phase) => ({
    phase: phase.name.split(" ")[0], // Shortened name for chart
    completion: phase.completion,
    fullName: phase.name,
  }));

  const chartConfig = {
    completion: {
      label: "Completion",
      color: "hsl(217, 100%, 50%)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phase Progress</CardTitle>
        <CardDescription>Completion status across all phases</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="phase"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="completion"
              fill="var(--color-completion)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
