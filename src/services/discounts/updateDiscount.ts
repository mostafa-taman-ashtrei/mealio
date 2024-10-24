import { ApiUpdateDiscountSchemaType } from "@/schemas/UpdateDiscountSchema";
import { DiscountWithMenuItems } from "@/types/restaurant";
import axiosRequest from "@/services/axiosRequest";

const updateDiscount = async (discountId: string, discountData: ApiUpdateDiscountSchemaType) => {
    const res = await axiosRequest(`api/discount/${discountId}`, "put", { ...discountData });

    const resData = {
        data: res.data as DiscountWithMenuItems,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default updateDiscount;