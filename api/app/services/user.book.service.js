const UserBookModel = require("../model/user.book.model");

class UserBookService {

    addUserBook = async (data) => {
        try {
            let user_book_obj = new UserBookModel(data);
            return await user_book_obj.save();
        } catch (e) {
            throw e;
        }
    }

    removeUserBook = (data) => {

    }
}

module.exports = UserBookService;