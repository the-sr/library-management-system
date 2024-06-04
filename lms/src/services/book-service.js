import HttpService from "./http-service";

class BookService extends HttpService {
    addBook = async (data) => {
        try {
            let response = await this.postRequest("addbook", data, {
                login: true
            });
            return response;
        } catch (e) {
            throw e;
        }
    }
    getAllBooks = async () => {
        try {
            let response = await this.getRequest('/books', {
                login: true
            })
            return response.result;
        } catch (e) {
            throw e;
        }
    }


}

export const book_service = new BookService();
export default BookService; 