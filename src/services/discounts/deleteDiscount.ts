import { Discount } from "@prisma/client";
import axiosRequest from "@/services/axiosRequest";

const deleteDiscount = async (discountId: string) => {
    const res = await axiosRequest(`api/discount/${discountId}`, "delete");

    const resData = {
        data: res.data as Discount,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default deleteDiscount;