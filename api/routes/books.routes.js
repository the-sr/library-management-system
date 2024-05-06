const express = require("express")
const books_routes = express.Router();

const BookController = require("../app/controller/book.controller");
const book_controller = new BookController();
const auth = require("../app/middleware/auth.middleware");
const role = require("../app/middleware/rbac.middleware");
const uploader = require("../app/middleware/uploader.middleware");

books_routes.post("/addbook", auth, role.isLibrarian, uploader.single('image'), book_controller.addBook);

module.exports = books_routes;