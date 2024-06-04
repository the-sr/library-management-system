import HttpService from "./http-service";

class UserBookService extends HttpService {
    getUserBook = async () => {
        try {
            let response = await this.getRequest("/user-books", {
                login: true
            });
            return response.result;
        } catch (e) {
            throw e;
        }
    }
}

export const user_book_service = new UserBookService();
export default UserBookService; 