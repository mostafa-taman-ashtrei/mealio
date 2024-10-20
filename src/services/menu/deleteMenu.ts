import { MenuWithItems } from "@/types/restaurant";
import axiosRequest from "@/services/axiosRequest";

const deleteMenu = async (menuId: string) => {
    const res = await axiosRequest("api/menu", "delete", { menuId });

    const resData = {
        data: res.data as MenuWithItems,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default deleteMenu;