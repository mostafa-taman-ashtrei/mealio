import NewDiscountSchema from "@/schemas/NewDiscountFormSchema";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { devLog } from "@/lib/utils";

const prisma = new PrismaClient();


export const POST = async (req: Request) => {
    try {
        const body = NewDiscountSchema.parse(await req.json());
        const { name, description, startDate, endDate, menuItems, restaurant, type, value } = body;

        const newDiscount = await prisma.discount.create({
            data: {
                name,
                description,
                startDate,
                endDate,
                type,
                value,
                restaurantId: restaurant,
                menuItems: {
                    connect: menuItems.map((id: string) => ({ id }))
                }
            },
        });

        return NextResponse.json(newDiscount, { status: 201 });

    } catch (error) {
        devLog(`Error creating discount: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error creating discount" }, { status: 500 });
    }
};