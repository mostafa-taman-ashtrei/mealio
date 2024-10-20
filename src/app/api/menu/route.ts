/* eslint-disable no-console */

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { restaurantId, menuData } = body;

        if (!restaurantId) return NextResponse.json({ error: "Missing restaurantId" }, { status: 400 });


        const newMenu = await prisma.menu.create({
            data: {
                name: menuData.name,
                description: menuData.description,
                restaurantId
            },
            include: {
                menuItems: {
                    include: {
                        images: true
                    }
                },
            }
        });

        return NextResponse.json(newMenu, { status: 201 });

    } catch (error) {
        console.error("Error creating menu:", error);
        return NextResponse.json({ error: "Error creating menu" }, { status: 500 });
    }
};
