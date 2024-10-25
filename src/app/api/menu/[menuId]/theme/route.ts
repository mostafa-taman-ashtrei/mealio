import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { devLog } from "@/lib/utils";

const prisma = new PrismaClient();

export const PATCH = async (req: Request, { params }: { params: { menuId: string } }) => {
    try {
        const { menuId } = params;
        const { themeId } = await req.json();


        if (!menuId || !themeId) return NextResponse.json({ error: "Missing menuId or themeId" }, { status: 400 });

        const updatedMenu = await prisma.menu.update({
            where: { id: menuId },
            data: { themeId },
            include: {
                qrcode: true,
                menuItems: {
                    include: {
                        images: true,
                        discounts: true
                    }
                }
            }
        });

        return NextResponse.json(updatedMenu, { status: 200 });

    } catch (error) {
        devLog(`Error setting theme to menu: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error setting theme to menu" }, { status: 500 });
    }
};
