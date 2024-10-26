import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { devLog } from "@/lib/utils";

const prisma = new PrismaClient();



export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { qrCodeId, isQrView } = body;

        if (!qrCodeId) return NextResponse.json({ error: "Missing qrCodeId" }, { status: 400 });


        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const newView = await prisma.urlViews.upsert({
            where: {
                qrCodeId_date: {
                    qrCodeId,
                    date: today
                }
            },
            update: {
                [isQrView ? "qrCount" : "viewCount"]: { increment: 1 }
            },
            create: {
                qrCodeId,
                date: today,
                qrCount: isQrView ? 1 : 0,
                viewCount: isQrView ? 0 : 1
            }
        });

        return NextResponse.json(newView, { status: 201 });

    } catch (error) {
        devLog(`Error creating url view: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error creating url view" }, { status: 500 });
    }
};

export const GET = async () => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const thirtyDaysViews = await prisma.urlViews.findMany({
            where: {
                date: { gte: thirtyDaysAgo }
            },
            include: {
                qrCode: {
                    include: {
                        menu: true
                    }
                }
            },
            orderBy: {
                date: "asc"
            }

        });

        return NextResponse.json(thirtyDaysViews, { status: 200 });
    } catch (error) {
        devLog(`Error fetching last month views: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error fetching last month views" }, { status: 500 });
    }
};