import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import UpdateMenuFormSchema from "@/schemas/UpdateMenuFromSchema";
import { devLog } from "@/lib/utils";

const prisma = new PrismaClient();


export const PUT = async (req: Request, { params }: { params: { menuId: string } }) => {
    try {
        const body = UpdateMenuFormSchema.parse(await req.json());

        const { name, description } = body;
        const { menuId } = params;


        if (!menuId) return NextResponse.json({ error: "Missing menuId" }, { status: 400 });


        const newMenu = await prisma.menu.update({
            where: { id: menuId },
            data: {
                name,
                description,

            },
            include: {
                menuItems: {
                    include: {
                        images: true,
                        discounts: true
                    }
                },
            },
        });

        return NextResponse.json(newMenu, { status: 200 });

    } catch (error) {
        devLog(`Error creating menu: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error creating menu" }, { status: 500 });
    }
};