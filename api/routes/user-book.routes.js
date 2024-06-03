const express = require("express");
const user_book_routes = express.Router();

const UserBookController = require("../app/controller/user-book.controller");
const user_book_controller = new UserBookController();
const auth = require("../app/middleware/auth.middleware");
const role = require("../app/middleware/rbac.middleware");
const uploader = require("../app/middleware/uploader.middleware");

user_book_routes.post("/borrow", uploader.none(), auth, role.isUser, user_book_controller.borrowBook);
user_book_routes.post("/return", uploader.none(), auth, role.isUser, user_book_controller.returnBook);
user_book_routes.get("/user-books", auth, role.isUser, user_book_controller.getUserBookByUserId);
user_book_routes.get("/all-user-books", auth, role.isAdmin, user_book_controller.getAllUserBook);

module.exports = user_book_routes;