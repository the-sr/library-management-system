import HttpService from "./http-service";

class UserBookService extends HttpService {

    borrowBook = async (id) => {
        try {
            let response = await this.getRequest(`/borrow/${id}`, {
                login: true
            })
            return response.result;
        } catch (e) {
            throw e;
        }
    }
    returnBook = async (id) => {
        try {
            let response = await this.getRequest(`/return/${id}`, {
                login:true
            })
            return response.result;
        } catch (e) {
            throw e;
        }
    }

    getUserBook = async () => {
        try {
            let response = await this.getRequest(`/user-books`, {
                login: true
            });
            return response.result;
        } catch (e) {
            throw e;
        }
    }
    getUserBookByUserId = async (id) => {
        try {
            console.log("the id is ",id)
            let response = await this.getRequest(`/user-books/${id}`, {
                login: true
            });
            return response.request;
        } catch (e) {
            throw e;
        }
    }

    getAllUserBook = async () => {
        try {
            let response = await this.getRequest(`/all-user-books-dashboard`, {
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