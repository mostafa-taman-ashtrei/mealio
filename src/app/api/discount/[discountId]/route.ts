import { ApiUpdateDiscountSchema } from "@/schemas/UpdateDiscountSchema";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { devLog } from "@/lib/utils";

const prisma = new PrismaClient();



export const DELETE = async (_: Request, { params }: { params: { discountId: string } }) => {
    try {
        const { discountId } = params;

        if (!discountId) return NextResponse.json({ error: "Missing discountId " }, { status: 400 });

        const newMenu = await prisma.discount.update({
            where: { id: discountId },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            },
        });

        return NextResponse.json(newMenu, { status: 200 });

    } catch (error) {
        devLog(`Error deleting discount: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error deleting discount" }, { status: 500 });
    }
};


export const PATCH = async (req: Request, { params }: { params: { discountId: string } }) => {
    try {
        const { discountId } = params;
        const body = await req.json();
        const { isActive } = body;

        if (!discountId) return NextResponse.json({ error: "Missing discountId " }, { status: 400 });

        const toggledDiscount = await prisma.discount.update({
            where: { id: discountId },
            data: {
                isActive
            },
        });

        return NextResponse.json(toggledDiscount, { status: 200 });

    } catch (error) {
        devLog(`Error toggling discount activity: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error toggling discount activity" }, { status: 500 });
    }
};


export const PUT = async (req: Request, { params }: { params: { discountId: string } }) => {
    try {
        const { discountId } = params;
        const body = ApiUpdateDiscountSchema.parse(await req.json());

        const { name, description, startDate, endDate, type, value, restaurant, menuItems, removedItems } = body;

        if (!discountId) return NextResponse.json({ error: "Missing discountId " }, { status: 400 });

        const updatedDiscount = await prisma.discount.update({
            where: { id: discountId },
            data: {
                name,
                description,
                startDate,
                endDate,
                type,
                value,
                restaurantId: restaurant,
                menuItems: {
                    connect: menuItems.map((id: string) => ({ id })) || [],
                    disconnect: removedItems.map((id: string) => ({ id })) || []
                }
            },
            include: {
                menuItems: {
                    include: {
                        images: true,
                    }
                },
            }
        });

        return NextResponse.json(updatedDiscount, { status: 200 });

    } catch (error) {
        devLog(`Error updating discount: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error updating discount" }, { status: 500 });
    }
};