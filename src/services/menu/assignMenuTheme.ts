import { MenuWithItems } from "@/types/restaurant";
import axiosRequest from "../axiosRequest";

const assignMenuTheme = async (menuId: string, themeId: string) => {
    const res = await axiosRequest(
        `/api/menu/${menuId}/theme`,
        "patch",
        { themeId }
    );

    const resData = {
        data: res.data as MenuWithItems,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default assignMenuTheme;