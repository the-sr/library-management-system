const UserBookModel = require("../model/user-book.model");

class UserBookService {

    addUserBook = async (data) => {
        try {
            let user_book_obj = new UserBookModel(data);
            return await user_book_obj.save();
        } catch (e) {
            throw e;
        }
    }

    removeUserBook = async (data) => {
        try {
            return await UserBookModel.deleteOne(data);
        } catch (e) {
            throw e;
        }
    }

    getUserBookByUserId = async (id) => {
        try {
            let userBooks = await UserBookModel.find({
                user: id
            }).populate('book').exec();
            return userBooks;
        } catch (e) {
            throw e;
        }
    }

    getAllUserBooks = async () => {
        try {
            let userBooks = await UserBookModel.find().populate('book').exec();
            return userBooks;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserBookService;
