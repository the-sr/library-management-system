const express = require("express")
const books_routes = express.Router();

books_routes.get("/");
books_routes.post("/");
books_routes.put("/");
books_routes.delete("/");

module.exports = books_routes;