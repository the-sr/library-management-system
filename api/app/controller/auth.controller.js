const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserServices = require("../services/user.services");
const UserBookService = require("../services/user-book.service");
const Config = require("../../config/config");
const user_services = new UserServices();
const user_book_service = new UserBookService();

class AuthController {
  registerUser = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      if (Array.isArray(data.preferredGenres)) {
        data.preferredGenres = data.preferredGenres.join(", ");
      }
      user_services.validateData(data);
      data.password = bcrypt.hashSync(data.password, 10);
      await user_services.createUser(data);
      console.log("User Registered Successfully");
      res.json({
        result: data,
        status: true,
        msg: "User registered successfully",
      });
    } catch (e) {
      console.log("User Registration Failed");
      next({ status: 400, msg: e });
    }
  };

  login = async (req, res, next) => {
    try {
      let data = req.body;
      let loggedInUser = await user_services.getUserByEmail(data);
      if (loggedInUser) {
        if (bcrypt.compareSync(data.password, loggedInUser.password)) {
          let token = jwt.sign(
            { user_id: loggedInUser._id },
            Config.JWT_SECRET
          );
          res.json({
            result: {
              user: loggedInUser,
              access_token: token,
            },
            status: true,
            msg: "Logged in successfully",
          });
        } else {
          next({ status: 400, msg: { password: "Password does not match" } });
        }
      } else {
        next({ status: 400, msg: { email: "Email doesn't match" } });
      }
    } catch (e) {
      throw next({ status: 422, msg: e });
    }
  };

  logout = (req, res, next) => {
    res.json({
      status: true,
      msg: "Logged out successfully",
    });
  };

  getLoggedInUser = async (req, res, next) => {
    try {
      let user_id = req.auth_user._id;
      let borrowed_books = await user_book_service.getUserBookByUserId(user_id);
      res.json({
        result: {
          user_details: req.auth_user,
          borrowed_books: borrowed_books,
        },
        status: true,
        msg: "User Profile",
      });
    } catch (e) {
      next({ status: 400, msg: e });
    }
  };

  changePassword = async (req, res, next) => {
    try {
      let user_id = req.auth_user._id;
      let data = req.body;
      let loggedInUser = await user_services.getUserById(user_id);
      if (loggedInUser) {
        if (bcrypt.compareSync(data.oldPassword, loggedInUser.password)) {
          data.password = bcrypt.hashSync(data.newPassword, 10);
          await user_services.updatePassword(user_id, data);
          res.json({
            result: null,
            status: true,
            msg: "Password Changed successfully",
          });
        } else {
          next({
            status: 400,
            msg: { password: "Old Password does not match" },
          });
        }
      } else {
        next({ status: 404, msg: "user Not found" });
      }
    } catch (e) {
      next({ status: 400, msg: e });
    }
  };

  updateUser = async (req, res, next) => {
    try {
      let user_id = req.auth_user._id;
      let data = req.body;
      let user_obj = await user_services.updateUser(user_id, data);
      res.json({
        result: user_obj,
        status: true,
        msg: "User Updated Successfully",
      });
    } catch (e) {
      next({ status: 400, msg: e });
    }
  };

  updateUserById = async (req, res, next) => {
    try {
      let user_id = req.params.id;
      let data = req.body;
      console.log(user_id);
      let user_obj = await user_services.updateUser(user_id, data);
      res.json({
        result: user_obj,
        status: true,
        msg: "User Updated Successfully",
      });
    } catch (e) {
      next({ status: 400, msg: e });
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      let user_id = req.auth_user._id;
      await user_services.deleteUser(user_id);
      res.json({
        result: user_id,
        status: true,
        msg: "User delete successfully",
      });
    } catch (e) {
      next({ status: 400, msg: e });
    }
  };

  deleteUserById = async (req, res, next) => {
    try {
      let user_id = req.params.id;
      console.log(user_id);
      await user_services.deleteUser(user_id);
      res.json({
        result: user_id,
        status: true,
        msg: "User deleted Successfully",
      });
    } catch (e) {
      next({ status: 400, msg: e });
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      let users = await user_services.getAllUsers();
      const usersWithBooks = await Promise.all(
        users.map(async (user) => {
          const borrowedBook = await user_book_service.getUserBookByUserId(
            user._id
          );
          return { ...user.toObject(), borrowed_book: borrowedBook };
        })
      );

      res.json({
        result: usersWithBooks,
        status: true,
        msg: "All Users with Borrowed Books",
      });
    } catch (e) {
      next({ status: 400, msg: e.message });
    }
  };

  getById = async (req, res, next) => {
    try {
      let user_id = req.params.id;
      let user = await user_services.getUserById(user_id);
      res.json({
        result: user,
        status: true,
        msg: "User Details",
      });
    } catch (e) {
      next({ status: 404, msg: "User Not Found" });
    }
  };
}

module.exports = AuthController;
