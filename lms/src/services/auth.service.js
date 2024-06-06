// import HttpService from "./http-service";

// class AuthService extends HttpService {

//     login = async (data) => {
//         try {
//             let response = await this.postRequest("login", data);
//             let result = response.result;
//             console.log("Login successful, result:", result);
//             let local_user = {
//                 name: result.user.name,
//                 emial: result.user.email,
//                 role: result.user.role,
//                 user_id: result.user._id
//             }
//             localStorage.setItem("library_system_token", result.access_token);
//             localStorage.setItem("library_system", JSON.stringify(local_user));
//             return local_user;
//         } catch (e) {
//             console.error("Login error:", e.response || e.message || e);
//             throw e;
//         }
//     }
//     getLoggedInUser = async () => {
//         try {
//             let response = await this.getRequest("/profile", {
//                 login: true
//             })
//             return response.result;
//         } catch (e) {
//             throw e;
//         }
//     }
//     getAllUsers = async () => {
//         try {
//             let response = await this.getRequest('/users', {
//                 login: true
//             })
//             console.log(response);
//             return response.result;
//         } catch (e) {
//             throw e;
//         }
//     }
//     addLibrarian = async (data) => {
//         try {
//             let response = await this.postRequest("/register", data, {
//                 login: true
//             });
//             return response;
//         } catch (e) {
//             throw e;
//         }
//     }
//     updateUser = async (data) => {
//         try {
//             let response = await this.putRequest("/profile/edit", data, {
//                 login: true
//             });
//             return response;
//         } catch (e) {
//             throw e;
//         }
//     }
//     changePassword = async (data) => {
//         try {
//             let response = await this.postRequest("/change-password", data, {
//                 login: true
//             });
//             return response;
//         } catch (e) {
//             throw e;
//         }
//     }
//     deleteUser = async () => {
//         try {
//             let response = await this.deleteRequest(`/profile`, {
//                 login: true
//             });
//             console.log(response);
//             return response.result;
//         } catch (e) {
//             throw e;
//         }
//     }
//     deleteUserById = async (id) => {
//         try {
//             let response = await this.deleteRequest(`/user/${id}`, {
//                 login: true
//             });
//             return response.result;
//         } catch (e) {
//             throw e;
//         }
//     }
// }

// export const auth_service = new AuthService();
// export default AuthService;

import HttpService from "./http-service";

class AuthService extends HttpService {

    register = async (data) => {
        try {
            let response = await this.postRequest(`/register`, data,{
                login: true,
                files:true
            });
            return response;
        } catch (e) {
            throw e;
        }
    }

    login = async (data) => {
        try {
            let response = await this.postRequest("login", data);
            let result = response.result;
            console.log("Login successful, result:", result);
            let local_user = {
                name: result.user.name,
                email: result.user.email,
                role: result.user.role,
                user_id: result.user._id
            }
            localStorage.setItem("library_system_token", result.access_token);
            localStorage.setItem("library_system", JSON.stringify(local_user));
            return local_user;
        } catch (e) {
            console.error("Login error:", e.response || e.message || e);
            throw e;
        }
    }

    getLoggedInUser = async () => {
        try {
            let response = await this.getRequest("/profile", {
                login: true
            });
            return response.result;
        } catch (e) {
            throw e;
        }
    }

    getAllUsers = async () => {
        try {
            let response = await this.getRequest('/users', {
                login: true
            });
            console.log(response);
            return response.result;
        } catch (e) {
            throw e;
        }
    }

    addLibrarian = async (data) => {
        try {
            let response = await this.postRequest(`/register`, data, {
                login: true
            });
            return response;
        } catch (e) {
            throw e;
        }
    }

    updateUser = async (data) => {
        try {
            let response = await this.putRequest(`/profile/edit`, data, {
                login: true
            });
            return response;
        } catch (e) {
            throw e;
        }
    }

    changePassword = async (data) => {
        try {
            let response = await this.putRequest(`/change-password`, data, {
                login: true
            });
            return response;
        } catch (e) {
            throw e;
        }
    }

    deleteUser = async () => {
        try {
            let response = await this.deleteRequest(`/profile`, {
                login: true
            });
            console.log(response);
            return response.result;
        } catch (e) {
            throw e;
        }
    }

    deleteUserById = async (id) => {
        try {
            let response = await this.deleteRequest(`/user/${id}`, {
                login: true
            });
            return response.result;
        } catch (e) {
            throw e;
        }
    }
}

export const auth_service = new AuthService();
export default AuthService;
