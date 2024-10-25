import { createCanvas, loadImage } from "canvas";

import QRCode from "qrcode";

const generateQrCodeWithLogo = async (url: string, logoUrl: string): Promise<string> => {

    const qrCodeBuffer = await QRCode.toBuffer(url, {
        errorCorrectionLevel: "H",
    });


    const qrCodeImage = await loadImage(qrCodeBuffer);
    const logoImage = await loadImage(logoUrl);


    const qrCodeSize = qrCodeImage.width;
    const logoSize = qrCodeSize / 5; // Resize logo to be 20% of QR code size


    const canvas = createCanvas(qrCodeSize, qrCodeSize);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(qrCodeImage, 0, 0, qrCodeSize, qrCodeSize);

    const xOffset = (qrCodeSize - logoSize) / 2; // Center the logo
    const yOffset = (qrCodeSize - logoSize) / 2; // Center the logo
    ctx.drawImage(logoImage, xOffset, yOffset, logoSize, logoSize);

    // Get the final image as a base64 string
    return canvas.toDataURL("image/png");
};

export default generateQrCodeWithLogo;
