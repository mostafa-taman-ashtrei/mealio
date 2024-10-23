import { MenuWithItems } from "@/types/restaurant";
import { UpdatedMenuDataType } from "@/types/newData";
import axiosRequest from "@/services/axiosRequest";

const updateMenu = async (menuId: string, menuData: UpdatedMenuDataType) => {
    const res = await axiosRequest(`api/menu/${menuId}`, "put", { ...menuData });

    const resData = {
        data: res.data as MenuWithItems,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default updateMenu;
