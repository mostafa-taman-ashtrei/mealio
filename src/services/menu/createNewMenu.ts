import { MenuWithItems } from "@/types/restaurant";
import { NewMenuDataType } from "@/types/newData";
import axiosRequest from "@/services/axiosRequest";

const createNewMenu = async (restaurantId: string, menuData: NewMenuDataType
) => {
    const res = await axiosRequest("/api/menu", "post", { restaurantId, menuData });

    const resData = {
        data: res.data as MenuWithItems,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default createNewMenu;