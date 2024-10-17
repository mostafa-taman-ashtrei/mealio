import { NewRestaurantDataType } from "@/types/newData";
import { Restaurant } from "@prisma/client";
import axiosRequest from "@/services/axiosRequest";

const createNewRestaurant = async (clerkId: string, restaurantData: NewRestaurantDataType) => {
    const res = await axiosRequest("api/restaurant", "post", { clerkId, restaurantData });

    const resData = {
        data: res.data as Restaurant,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default createNewRestaurant;