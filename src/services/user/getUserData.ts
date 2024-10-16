import { UserWithRestaurants } from "@/types/user";
import axiosRequest from "@/services/axiosRequest";

const getUserData = async () => {
    const res = await axiosRequest("api/user", "get");

    const userData = {
        user: res.data.user as UserWithRestaurants,
        error: res.error,
        status: res.status,
    };

    return userData;
};

export default getUserData;