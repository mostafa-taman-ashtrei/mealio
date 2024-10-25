import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";
import { devLog } from "@/lib/utils";
import generateQrCodeWithLogo from "@/lib/qrcode/generateQRCodeWithLogo";

const prisma = new PrismaClient();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadQrCode = (qrCodeDataUrl: string): Promise<UploadApiResponse | undefined> => {
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");

    const buffer = Buffer.from(base64Data, "base64");

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        const readableStream = new Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
};


export const POST = async (req: Request, { params }: { params: { menuId: string } }) => {
    try {
        const { menuId } = params;
        const { url, customLogoUrl } = await req.json();


        if (!menuId) return NextResponse.json({ error: "Missing menuId or themeId" }, { status: 400 });


        const qrCodeDataUrl = await generateQrCodeWithLogo(url, customLogoUrl);
        const uploadedImage = await uploadQrCode(qrCodeDataUrl);

        if (!uploadedImage || typeof uploadedImage !== "object") throw new Error("Upload failed, received unexpected response");


        const existingQrCode = await prisma.qrCode.findUnique({
            where: { menuId },
        });

        let newQrCode;

        if (existingQrCode) {
            // Update existing QR code
            newQrCode = await prisma.qrCode.update({
                where: { menuId },
                data: {
                    codeUrl: uploadedImage.secure_url,
                },
                include: {
                    menu: {
                        include: {
                            qrcode: true,
                            menuItems: {
                                include: {
                                    images: true,
                                },
                            },
                        },
                    },
                },
            });
        } else {
            // Create a new QR code
            newQrCode = await prisma.qrCode.create({
                data: {
                    menuId,
                    codeUrl: uploadedImage.secure_url,
                },
                include: {
                    menu: {
                        include: {
                            qrcode: true,
                            menuItems: {
                                include: {
                                    images: true,
                                },
                            },
                        },
                    },
                },
            });
        }

        return NextResponse.json(newQrCode, { status: 200 });

    } catch (error) {
        devLog(`Error creating QR code: ${error}`, "error", "api");
        return NextResponse.json({ error: "Error creating QR code" }, { status: 500 });
    }
};
