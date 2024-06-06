const express = require("express")
const auth_routes = express.Router();

const uploader = require("../app/middleware/uploader.middleware");
const AuthController = require("../app/controller/auth.controller");
const auth = require("../app/middleware/auth.middleware");
const auth_controller = new AuthController();
const role = require("../app/middleware/rbac.middleware");

auth_routes.post("/register", uploader.single('image'), auth_controller.registerUser);

auth_routes.post("/login", uploader.none(), auth_controller.login);

auth_routes.get("/profile", auth, auth_controller.getLoggedInUser);

auth_routes.put("/profile/edit", auth, auth_controller.updateUser);

auth_routes.put("/change-password",uploader.none(), auth, auth_controller.changePassword);

auth_routes.delete("/profile", auth, auth_controller.deleteUser);

auth_routes.delete("/user/:id", auth, role.isAdmin, auth_controller.deleteUserById);

auth_routes.get("/logout", auth, auth_controller.logout);

auth_routes.get("/users", auth, role.isAdminLibrarian, auth_controller.getAllUsers);

auth_routes.get("/user/:id", auth, role.isLibrarian,auth_controller.getById);

module.exports = auth_routes;