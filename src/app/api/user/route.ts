import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { devLog } from "@/lib/utils";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();


export const GET = async (req: NextRequest) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { clerkId: userId, isDeleted: false },
            include: {
                restaurants: {
                    where: { isDeleted: false },
                    include: {
                        menus: {
                            where: { isDeleted: false },
                            include: {
                                qrcode: true,
                                menuItems: {
                                    where: { isDeleted: false },
                                    include: {
                                        images: true,
                                        discounts: {
                                            where: { isDeleted: false }
                                        }
                                    }
                                },
                            }
                        },
                        discounts: {
                            where: { isDeleted: false }
                        }
                    }
                }
            },
        });

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        devLog(`Error fetching user data: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
    }
};
