const BookServices = require("../services/book.services");
const book_services = new BookServices();

class BookController {
  addBook = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      console.log(data);
      book_services.validateData(data);
      await book_services.addBook(data);
      res.json({
        result: data,
        status: true,
        msg: "Book Added Successfully",
      });
    } catch (e) {
      next({ status: 400, msg: e.message });
    }
  };

  getAllBooks = async (req, res, next) => {
    try {
      let books = await book_services.getAllBooks();
      res.json({
        result: books,
        status: true,
        msg: "All Books",
      });
    } catch (e) {
      throw next({ status: 400, msg: e });
    }
  };

  getBook = async (req, res, next) => {
    try {
      let data = req.body;
      let book = await book_services.getBookByTitle(data);
      if (book) {
        res.json({
          result: book,
          status: true,
          msg: "Book Data Fetched",
        });
      }
    } catch (e) {
      throw next({ status: 404, msg: e });
    }
  };

  updateBook = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      let response = await book_services.updateBook(req.params.id, data);
      res.json({
        result: response,
        status: true,
        msg: "Book data updated successfully",
      });
    } catch (e) {
      next({ status: 400, msg: e });
    }
  };

  deleteBook = async (req, res, next) => {
    try {
      let bookId = req.params.id;
      let data = await book_services.deleteBookById(bookId);
      if (data.deletedCount) {
        res.json({
          result: data,
          status: true,
          msg: "Book deleted successfully",
        });
      } else {
        next({ status: 404, msg: "Book does not exist" });
      }
    } catch (e) {
      next({ status: 400, msg: e });
    }
  };

  searchBook = async (req, res, next) => {
    try {
      let query = req.query["book-name"];
      let books = await book_services.searchBooksByName(query);
      if (books.length > 0) {
        res.json({
          result: books,
          status: true,
          msg: "Books Fetched Successfully",
        });
      } else {
        next({ status: 404, msg: "No books found matching the query" });
      }
    } catch (e) {
      next({ status: 400, msg: e.message });
    }
  };
}

module.exports = BookController;
