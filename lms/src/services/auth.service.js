import HttpService from "./http-service";

class AuthService extends HttpService {
    login = async (data) => {
        try {
            let response = await this.postRequest("login", data);
            let result = response.result;
            let local_user = {
                name: result.user.name,
                emial: result.user.email,
                role: result.user.role,
                user_id: result.user._id
            }
            localStorage.setItem("library_system_token", result.access_token);
            localStorage.setItem("library_system", JSON.stringify(local_user));
            return local_user;
        } catch (e) {
            throw e;
        }
    }
}

export const auth_service = new AuthService();
export default AuthService;