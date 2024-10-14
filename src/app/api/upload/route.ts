import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const images = formData.getAll("images") as File[];

        if (!images || images.length === 0) return NextResponse.json(
            { error: "No images provided" },
            { status: 400 }
        );

        const uploadPromises = images.map(async (image) => {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { resource_type: "auto" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });
        });

        const results = await Promise.all(uploadPromises);

        return NextResponse.json({
            message: "Images uploaded successfully",
            results
        }, { status: 200 });

    } catch (error) {
        console.error("Error uploading images:", error);
        return NextResponse.json({ error: "Failed to upload images" }, { status: 500 });
    }
}
