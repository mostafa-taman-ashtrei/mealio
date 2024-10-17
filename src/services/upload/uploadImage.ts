import { CloudinaryUploadResponse } from "@/types/api";
import axiosRequest from "@/services/axiosRequest";

const uploadImagesToCloudinary = async (formData: FormData) => {
    const res = await axiosRequest("api/upload", "post", formData);

    const imageData = {
        data: res.data as CloudinaryUploadResponse,
        error: res.error,
        status: res.status,
    };

    return imageData;
};

export default uploadImagesToCloudinary;