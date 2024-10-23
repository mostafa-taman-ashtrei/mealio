import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { devLog } from "@/lib/utils";

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
                        images: true,
                        discounts: {
                            where: { isDeleted: false }
                        }
                    }
                },
            },
        });

        return NextResponse.json(newMenu, { status: 201 });

    } catch (error) {
        devLog(`Error creating menu: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error creating menu" }, { status: 500 });
    }
};


export const DELETE = async (req: Request) => {
    try {
        const body = await req.json();
        const { menuId } = body;

        if (!menuId) return NextResponse.json({ error: "Missing menuId" }, { status: 400 });

        const deletedMenu = await prisma.menu.update({
            where: {
                id: menuId
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        });

        return NextResponse.json(deletedMenu, { status: 200 });
    } catch (error) {
        devLog(`Error deleting menu: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error deleting menu" }, { status: 500 });
    }
};