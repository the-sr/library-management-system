const BookService = require("../services/book.services");
const book_service = new BookService();

const UserBookService = require("../services/user-book.service");
const user_book_service = new UserBookService();

class UserBookController {

    borrowBook = async (req, res, next) => {
        let data = req.body;
        let user_id = req.auth_user._id;
        try {
            let book = await book_service.getBookByTitle(data);

            if (book.bookCount < 1) {
                return next({ status: 400, msg: "No copies of the book available" });
            }
            if (book) {
                let user_book = {
                    user: user_id,
                    book: book._id,
                };

                let response = await user_book_service.addUserBook(user_book);
                book.bookCount = book.bookCount - 1;
                await book_service.updateBook(book._id, book);
                res.json({
                    result: response,
                    status: true,
                    msg: "Book Borrowed Successfully"
                });
            } else {
                next({ status: 404, msg: "Book Not Found" });
            }
        } catch (e) {
            next({ status: 400, msg: e.message });
        }
    }

    returnBook = async (req, res, next) => {
        let user_id = req.auth_user._id;
        let book_id = req.body.book_id;
        try {
            let user_book = await user_book_service.removeUserBook({ user: user_id, book: book_id });
            if (user_book.deletedCount > 0) {
                let book = await book_service.getBookById(book_id);
                book.bookCount = book.bookCount + 1;
                await book_service.updateBook(book_id, book);
                res.json({
                    result: user_book,
                    status: true,
                    msg: "Book Returned Successfully"
                });
            } else {
                next({ status: 404, msg: "User Book Not Found" });
            }
        } catch (e) {
            next({ status: 400, msg: e.message });
        }
    }

    getUserBookByUserId = async (req, res, next) => {
        try {
            let user_id = req.auth_user._id;
            let user_books = await user_book_service.getUserBookByUserId(user_id);
            res.json({
                result: user_books,
                status: true,
                msg: "User Books Fetched Successfully"
            });
        } catch (e) {
            next({ status: 400, msg: e.message });
        }
    }

    getAllUserBook = async (req, res, next) => {
        try {
            let user_books = await user_book_service.getAllUserBooks();
            res.json({
                result: user_books,
                status: true,
                msg: "All User Books Fetched Successfully"
            });
        } catch (e) {
            next({ status: 400, msg: e.message });
        }
    }
}

module.exports = UserBookController;
