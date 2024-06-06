// import axiosInstance from "../config/http-request";

// class HttpService {
//     headers;
//     getHeaders = (config) => {
//         if (config.login) {
//             let token = localStorage.getItem("library_system_token");
//             this.headers = {
//                 "authorization": "Bearer " + token,
//                 "content-type": "application/json"
//             }
//         }
//         if (config.files) {
//             this.headers = {
//                 ...this.headers,
//                 "content-type": "multipart/form-data"
//             }
//         }
//     }
//     postRequest = async (url, data, config = {}) => {
//         try {
//             let response = await axiosInstance.post(url, data, config);
//             return response;
//         } catch (e) {
//             throw e;
//         }
//     }
//     getRequest = async (url, config = {}) => {
//         try {
//             this.getHeaders(config);
//             let response = await axiosInstance.get(url, {
//                 headers: this.headers
//             });
//             return response;
//         } catch (e) {
//             throw e;
//         }
//     }
//     deleteRequest = async (url,config = {}) => {
//         try {
//             this.getHeaders(config);
//             let response = await axiosInstance.delete(url, {
//                 headers: this.headers
//             });
//             return response;
//         } catch (e) {
//             throw e;
//         }
//     }
//     putRequest = async (url, data, config = {}) => {
//         try {
//             let response = await axiosInstance.put(url, data, config);
//             return response;
//         } catch (e) {
//             throw e;
//         }
//     }
// }
// export default HttpService;

import axiosInstance from "../config/http-request";

class HttpService {
    headers;

    getHeaders = (config) => {
        if (config.login) {
            let token = localStorage.getItem("library_system_token");
            this.headers = {
                "authorization": "Bearer " + token,
                "content-type": "application/json"
            };
        }
        if (config.files) {
            this.headers = {
                ...this.headers,
                "content-type": "multipart/form-data"
            };
        }
    }

    postRequest = async (url, data, config = {}) => {
        try {
            this.getHeaders(config);
            let response = await axiosInstance.post(url, data, { headers: this.headers });
            return response;
        } catch (e) {
            throw e;
        }
    }

    getRequest = async (url, config = {}) => {
        try {
            this.getHeaders(config);
            let response = await axiosInstance.get(url, { headers: this.headers });
            return response;
        } catch (e) {
            throw e;
        }
    }

    deleteRequest = async (url, config = {}) => {
        try {
            this.getHeaders(config);
            let response = await axiosInstance.delete(url, { headers: this.headers });
            return response;
        } catch (e) {
            throw e;
        }
    }

    putRequest = async (url, data, config = {}) => {
        try {
            this.getHeaders(config);
            let response = await axiosInstance.put(url, data, { headers: this.headers });
            return response;
        } catch (e) {
            throw e;
        }
    }
}

export default HttpService;
