/* eslint-disable no-console */

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { clerkId, restaurantData } = body;

        if (!clerkId) return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });

        const userExists = await prisma.user.findUnique({
            where: {
                clerkId,
            },
        });

        let userId;

        if (!userExists) {
            const newUser = await prisma.user.create({
                data: {
                    clerkId
                }
            });
            userId = newUser.id;
        } else {
            userId = userExists.id;
        }



        const newRestaurant = await prisma.restaurant.create({
            data: {
                name: restaurantData.name,
                description: restaurantData.description,
                logoUrl: restaurantData.logoUrl,
                ownerId: userId
            },
        });

        return NextResponse.json(newRestaurant, { status: 201 });

    } catch (error) {
        console.error("Error creating restaurant:", error);
        return NextResponse.json({ error: "Error creating restaurant" }, { status: 500 });
    }
};
