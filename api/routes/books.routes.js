const express = require("express")
const books_routes = express.Router();

const BookController = require("../app/controller/book.controller");
const book_controller = new BookController();
const auth = require("../app/middleware/auth.middleware");
const role = require("../app/middleware/rbac.middleware");
const uploader = require("../app/middleware/uploader.middleware");

books_routes.post("/add-book", auth, role.isLibrarian, uploader.single('image'), book_controller.addBook);

books_routes.get("/books", auth, role.isLibrarianUser, book_controller.getAllBooks);

books_routes.get("/book/:id", auth, book_controller.getBook);

books_routes.put("/book/:id", auth, role.isLibrarian, uploader.single('none'), book_controller.updateBook);

books_routes.delete("/book/:id", auth, role.isLibrarian, book_controller.deleteBook);

books_routes.get("/search", auth, role.isLibrarianUser, book_controller.searchBook);

module.exports = books_routes;