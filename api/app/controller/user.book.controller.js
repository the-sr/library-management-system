const BookService = require("../services/book.services");
const book_service = new BookService();

const UserBookService = require("../services/user.book.service");
const user_book_service = new UserBookService();


class UserBookController {

    borrowBook = async (req, res, next) => {
        let data = req.body;
        let book = await book_service.getBookByTitle(data);
        if (book) {
            //user detais : fetch from req and forward to UserBookModel
            //book details: fetch and forward to UserBookModel
            res.json({
                result: book,
                status: true,
                msg: "Book Borrowed Successfully"
            })
        } else {
            next({ status: 404, msg: "Book Not Found" });
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