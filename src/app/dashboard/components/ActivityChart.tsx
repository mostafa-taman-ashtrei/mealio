"use client";
import { useEffect, useState } from "react";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import ActivityChartSkeleton from "@/components/skeletons/ActivityChartSkeleton";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import getAllUrlViews from "@/services/analytics/getAllUrlViews";
import { FomattedChartData } from "@/types/ui";
import { format } from "date-fns";
import Empty from "@/components/general/Empty";
import { Ghost } from "lucide-react";

export const description = "The total url visits in the last 30 days";

const chartConfig = {
    qrScans: {
        label: "Qr Scans",
        color: "hsl(var(--primary))",
    },

    directViews: {
        label: "Dirct Views",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;


const ActivityChart: React.FC = () => {
    const [viewData, setViewData] = useState<FomattedChartData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchViews = async () => {
            const { data, status } = await getAllUrlViews();

            if (status === 200) {
                const formattedData = data.map(view => ({
                    date: format(new Date(view.date), "dd"),
                    qrScans: view.qrCount,
                    directViews: view.viewCount,
                    total: view.qrCount + view.viewCount,
                    menuName: view.qrCode.menu.name,
                }));

                setViewData(formattedData);
            }

            setLoading(false);
        };

        fetchViews();
    }, []);

    if (loading) return <ActivityChartSkeleton />;

    if (viewData.length === 0) return <Empty
        title="No hits"
        description="There were no hits at all in the past month"
        icon={Ghost}
    />;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Url Hits</CardTitle>
                <CardDescription> {format(new Date(), "MMMM")} Overview</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={viewData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="menuName"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="directViews" fill="var(--color-directViews)" radius={4} />
                        <Bar dataKey="qrScans" fill="var(--color-qrScans)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default ActivityChart;