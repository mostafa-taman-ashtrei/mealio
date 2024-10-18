/* eslint-disable no-console */

import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();


export const GET = async (req: NextApiRequest) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            include: {
                restaurants: {
                    include: {
                        menus: {
                            include: {
                                menuItems: true,
                            }
                        }
                    }
                }
            },
        });

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
    }
};
