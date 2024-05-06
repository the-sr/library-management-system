const express = require("express")
const routes = express.Router();
const auth_routes = require("./auth.routes");
const books_routes = require("./books.routes");
const user_book_routes = require("./user.book.routes");

routes.use(auth_routes);
routes.use(books_routes);
routes.use(user_book_routes);

module.exports = routes;