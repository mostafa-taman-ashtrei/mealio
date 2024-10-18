import { NewRestaurantDataType } from "@/types/newData";
import { RestaurantWithMenus } from "@/types/restaurant";
import axiosRequest from "@/services/axiosRequest";

const createNewRestaurant = async (clerkId: string, restaurantData: NewRestaurantDataType) => {
    const res = await axiosRequest("api/restaurant", "post", { clerkId, restaurantData });

    const resData = {
        data: res.data as RestaurantWithMenus,
        error: res.error,
        status: res.status,
    };

    return resData;
};

export default createNewRestaurant;