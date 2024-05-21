import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 30000,
    timeoutErrorMessage: "Server Timed out...",
    headers: { "content-type": "application/json" }
})

axiosInstance.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem("library_system_token");
        localStorage.removeItem("library_system");
        window.location.href = "/login";
    } else if (error.response.status === 404 || error.response.status === 404) {
        toast.error(error.response.data);
    } else {
        throw error;
    }
})

export default axiosInstance;