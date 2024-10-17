import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { devLog } from "@/lib/utils";

const prisma = new PrismaClient();


export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { menuId, menuItemData } = body;

        if (!menuId) return NextResponse.json({ error: "Missing menuId" }, { status: 400 });


        const newMenuItem = await prisma.menuItem.create({
            data: {
                name: menuItemData.name,
                description: menuItemData.description,
                price: menuItemData.price,
                menuId,
                images: {
                    create: menuItemData.imageUrls.map((image: string) => ({
                        url: image,
                    })),
                }
            },
            include: {
                images: true,
            }
        });

        return NextResponse.json(newMenuItem, { status: 201 });

    } catch (error) {
        devLog(`Error creating menu: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error creating menu" }, { status: 500 });
    }
};
