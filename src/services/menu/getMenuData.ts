import { MenuWithItems } from "@/types/restaurant";
import axiosRequest from "@/services/axiosRequest";

const getMenuData = async (menuId: string) => {
    const res = await axiosRequest(`/api/menu/${menuId}`, "get");

    const resData = {
        data: res.data as MenuWithItems,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default getMenuData;