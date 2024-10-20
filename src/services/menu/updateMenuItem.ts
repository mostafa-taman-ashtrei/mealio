import { MenuItemWithImages } from "@/types/restaurant";
import { UpdateMenuItemData } from "@/types/newData";
import axiosRequest from "@/services/axiosRequest";

const updateMenuItem = async (itemId: string, menuItemData: UpdateMenuItemData) => {
    const res = await axiosRequest(`api/menu-item/${itemId}`, "put", menuItemData);

    const resData = {
        data: res.data as MenuItemWithImages,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default updateMenuItem;