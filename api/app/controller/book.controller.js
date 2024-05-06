const BookServices = require("../services/book.services");
const book_services = new BookServices();

class BookController {

    addBook = async (req, res, next) => {
        try {
            let data = req.body;
            if (req.file) {
                data.image = req.file.filename;
            }
            book_services.validateData(data);
            await book_services.addBook(data);
            res.json({
                result: data,
                status: true,
                msg: "Book Added Successfully"
            });
        } catch (e) {
            next({ status: 400, msg: e });
        }
    }

    getBook = async (req, res, next) => {
        try {
            let data = req.body;
            let book = await book_services.getBookByTitle(data);
            if (book) {
                res.json({
                    result: book,
                    status: true,
                    msg: "Book Data Fetched"
                });
            }
        } catch (e) {
            throw next({ status: 404, msg: e })
        }
    }

}

module.exports = BookController;