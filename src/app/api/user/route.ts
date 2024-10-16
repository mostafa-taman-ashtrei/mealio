import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();


export const GET = async (req: NextApiRequest) => {
    const { userId } = getAuth(req);

    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: { restaurants: true },
    });


    return NextResponse.json({ user }, { status: 200 });
};
