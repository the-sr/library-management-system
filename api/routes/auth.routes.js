const express = require("express")
const auth_routes = express.Router();
const uploader = require("../app/middleware/uploader.middleware");
const AuthController = require("../app/controller/auth.controller");
const auth_controller = new AuthController();

auth_routes.post("/register", uploader.single('image'), auth_controller.registerUser);
auth_routes.post("/login", auth_controller.login);
auth_routes.get("/profile", auth_controller.profile);

module.exports = auth_routes;