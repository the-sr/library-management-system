const express = require("express")
const auth_routes = express.Router();
const uploader = require("../app/middleware/uploader.middleware");
const AuthController = require("../app/controller/auth.controller");
const auth = require("../app/middleware/auth.middleware");
const auth_controller = new AuthController();

auth_routes.post("/register", uploader.single('image'), auth_controller.registerUser);
auth_routes.post("/login", auth_controller.login);
auth_routes.get("/logout", auth, auth_controller.logout);
auth_routes.get("/me", auth, auth_controller.getLoggedInUser);

module.exports = auth_routes;