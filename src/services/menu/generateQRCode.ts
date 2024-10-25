import { QrCodeWithMenu } from "@/types/restaurant";
import axiosRequest from "@/services/axiosRequest";

const generateQRCode = async (menuId: string, url: string, customLogoUrl: string) => {
    const res = await axiosRequest(`/api/menu/${menuId}/qrcode`, "post", { url, customLogoUrl });

    const resData = {
        data: res.data as QrCodeWithMenu,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default generateQRCode;