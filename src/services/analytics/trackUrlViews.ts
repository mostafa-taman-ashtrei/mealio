import { UrlViews } from "@prisma/client";
import axiosRequest from "@/services/axiosRequest";

const trackUrlViews = async (qrCodeId: string, isQrView: boolean) => {
    const res = await axiosRequest("api/analytics/views", "post", { qrCodeId, isQrView });

    const resData = {
        data: res.data as UrlViews,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default trackUrlViews;