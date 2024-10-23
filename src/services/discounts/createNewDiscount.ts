import { Discount } from "@prisma/client";
import { NewDiscountSchemaType } from "@/schemas/NewDiscountFormSchema";
import axiosRequest from "@/services/axiosRequest";

const createNewDiscount = async (discountData: NewDiscountSchemaType) => {
    const res = await axiosRequest("api/discount", "post", { ...discountData });

    const resData = {
        data: res.data as Discount,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default createNewDiscount;