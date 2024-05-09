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
                next({ status: 400, msg: "No copies of the book available" })
            }
            if (book) {
                let user_book = {
                    user: user_id,
                    book: book._id,
                };

                let response = await user_book_service.addUserBook(user_book);
                console.log(response);
                book.bookCount = book.bookCount - 1;
                console.log(book);
                await book_service.updateBook(book._id, book)
                res.json({
                    result: response,
                    status: true,
                    msg: "Book Borrowed Successfully"
                })
            } else {
                next({ status: 404, msg: "Book Not Found" });
            }
        } catch (e) {
            next({ status: 400, msg: e });
        }

    }

    returnBook = (req, res, next) => {

    }

    getUserBookByUserId = (req, res, next) => {

    }

    getAllUserBook = (req, res, next) => {

    }
}

module.exports = UserBookController;