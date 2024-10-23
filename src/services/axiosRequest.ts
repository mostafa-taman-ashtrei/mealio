import axios from "axios";
import { devLog } from "@/lib/utils";
import { requestMethodType } from "@/types/api";

const axiosRequest = async (
    url: string,
    requestMethod: requestMethodType,
    data?: unknown
) => {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
    axios.defaults.withCredentials = true;

    try {
        if (requestMethod === "get" || requestMethod === "delete") {
            const res = await axios({ url, method: requestMethod === "delete" ? "DELETE" : "GET", data });
            if (res.data.error) return { data: null, error: res.data.error, status: 400 };
            return { data: res.data, status: res.status, error: null };
        }

        else if (requestMethod === "post" || requestMethod === "put" || requestMethod === "patch") {
            const res = await axios({ url, method: requestMethod === "post" ? "POST" : requestMethod === "patch" ? "PATCH" : "PUT", data });
            if (res.data.error) return { data: null, error: res.data.error, status: 400 };
            return { data: res.data, status: res.status, error: null };
        }

        return { data: null, status: 400, error: "Bad Request" };
    } catch (error) {
        devLog(`Error in axiosRequest: ${error}`, "error");
        return { data: null, status: 500, error: "Server Error" };
    }
};


export default axiosRequest;