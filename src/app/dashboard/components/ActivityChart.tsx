"use client";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";
const chartData = [
    { month: "January", hits: 186 },
    { month: "February", hits: 305 },
    { month: "March", hits: 237 },
    { month: "April", hits: 73 },
    { month: "May", hits: 209 },
    { month: "June", hits: 214 },
    { month: "July", hits: 250 },
    { month: "August", hits: 280 },
    { month: "September", hits: 195 },
    { month: "October", hits: 220 },
    { month: "November", hits: 170 },
    { month: "December", hits: 310 },
];

const chartConfig = {
    hits: {
        label: "Hits",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;


const ActivityChart: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Qr Code Hits</CardTitle>
                <CardDescription>
                    {new Date().getFullYear()} Overview


                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="hits" fill="var(--color-hits)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ActivityChart;