import { MenuItemWithImages } from "@/types/restaurant";
import { NewMenuItemType } from "@/types/newData";
import axiosRequest from "@/services/axiosRequest";

const createNewMenuItem = async (menuId: string, menuItemData: NewMenuItemType) => {
    const res = await axiosRequest("api/menu-item", "post", { menuId, menuItemData });

    const resData = {
        data: res.data as MenuItemWithImages,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default createNewMenuItem;