import { ViewWithQrCode } from "@/types/analytics";
import axiosRequest from "@/services/axiosRequest";

const getAllUrlViews = async () => {
    const res = await axiosRequest("api/analytics/views", "get");

    const resData = {
        data: res.data as ViewWithQrCode[],
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default getAllUrlViews;