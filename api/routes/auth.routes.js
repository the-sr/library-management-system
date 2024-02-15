const express = require("express")
const auth_routes = express.Router();

auth_routes.get("/");
auth_routes.post("/");
auth_routes.put("/");
auth_routes.delete("/");

module.exports = auth_routes;