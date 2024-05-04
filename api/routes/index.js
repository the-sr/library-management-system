const express = require("express")
const routes = express.Router();
const auth_routes = require("./auth.routes");
const books_routes = require("./books.routes");

routes.use(auth_routes);
routes.use(books_routes);

module.exports = routes;