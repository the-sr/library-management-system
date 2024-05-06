const express = require("express")
const books_routes = express.Router();

const BookController = require("../app/controller/book.controller");
const book_controller = new BookController();
const auth = require("../app/middleware/auth.middleware");
const role = require("../app/middleware/rbac.middleware");
const uploader = require("../app/middleware/uploader.middleware");

books_routes.post("/addbook", auth, role.isLibrarian, uploader.single('image'), book_controller.addBook);

books_routes.get("/book", auth, book_controller.getBook);

books_routes.put("/book", auth, role.isLibrarian, book_controller.updateBook);

books_routes.delete("/book", auth, role.isLibrarian, book_controller.deleteBook);

module.exports = books_routes;