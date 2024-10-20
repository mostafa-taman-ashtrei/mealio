import { MenuItemWithImages } from "@/types/restaurant";
import axiosRequest from "@/services/axiosRequest";

const deleteMenuItem = async (itemId: string) => {
    const res = await axiosRequest("api/menu-item", "delete", { itemId });

    const resData = {
        data: res.data as MenuItemWithImages,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default deleteMenuItem;