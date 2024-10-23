import { devLog, getPublicIdFromUrl } from "@/lib/utils";

import { ApiUpdateItemSchema } from "@/schemas/UpdateItemFormSchama";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();


export const PUT = async (req: Request, { params }: { params: { itemId: string } }) => {
    try {
        const body = ApiUpdateItemSchema.parse(await req.json());
        const { itemId } = params;

        if (!itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

        const newImages = body.images.filter(img => img.isNew && !img.isDeleted);
        const deletedImages = body.images.filter(img => img.isDeleted && !img.isNew);

        for (const img of deletedImages) {
            const publicId = getPublicIdFromUrl(img.url);
            await cloudinary.uploader.destroy(publicId);
        }


        const updatedItem = await prisma.menuItem.update({
            where: { id: itemId },
            data: {
                name: body.name,
                description: body.description,
                price: body.price,
                images: {
                    deleteMany: {
                        id: {
                            in: deletedImages.map(img => img.id)
                        }
                    },
                    create: newImages.map(img => ({
                        url: img.url,
                    })),
                },
            },
            include: {
                images: true,
                discounts: true
            },
        });


        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        devLog(`Error updating menu item: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error updating menu item" }, { status: 500 });
    }
};