import axiosInstance from "../config/http-request";

class HttpService {
    postRequest = async (url, data, config = {}) => {
        try {
            let response = await axiosInstance.post(url, data, config);
            return response;

        } catch (e) {
            throw e;
        }
    }
}
export default HttpService;