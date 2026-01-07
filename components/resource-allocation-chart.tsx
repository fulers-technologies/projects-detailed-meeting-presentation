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

interface TeamMember {
  role: string;
  allocation: string;
  count?: number;
}

interface ResourceAllocationChartProps {
  team: TeamMember[];
}

export function ResourceAllocationChart({
  team,
}: ResourceAllocationChartProps) {
  const chartData = team.map((member) => ({
    role: member.role.split(" ")[0], // Shortened for display
    fullRole: member.role,
    count: member.count || 1,
    allocation:
      member.allocation === "full-time"
        ? 100
        : member.allocation === "part-time"
          ? 50
          : 25,
  }));

  const chartConfig = {
    count: {
      label: "Team Members",
      color: "hsl(217, 100%, 50%)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Allocation</CardTitle>
        <CardDescription>Resource distribution by role</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} layout="vertical">
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="role"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={80}
            />
            <XAxis type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
