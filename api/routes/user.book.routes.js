const express = require("express")
const user_book_routes = express.Router();

const UserBookController = require("../app/controller/user.book.controller");
const user_book_controller = new UserBookController();
const auth = require("../app/middleware/auth.middleware");
const role = require("../app/middleware/rbac.middleware");

user_book_routes.get("/borrow", auth);

module.exports = user_book_routes;