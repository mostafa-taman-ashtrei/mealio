import { Discount } from "@prisma/client";
import axiosRequest from "@/services/axiosRequest";

const toggleDiscountActivity = async (discountId: string, isActive: boolean) => {
    const res = await axiosRequest(`api/discount/${discountId}`, "patch", { isActive });

    const resData = {
        data: res.data as Discount,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default toggleDiscountActivity;