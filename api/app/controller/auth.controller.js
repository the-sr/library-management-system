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
            console.log(data);
            if (req.file) {
                data.image = req.file.filename;
            }
            //For multiple files => if (req.files) {data.image = req.files.map((file) => file.filename);}
            user_services.validateData(data);
            data.password = bcrypt.hashSync(data.password, 10);
            await user_services.createUser(data);
            res.json({
                result: data,
                status: true,
                msg: "User registered successfully"
            });
        } catch (e) {
            next({ status: 400, msg: e });
        }
    }
    login = async (req, res, next) => {
        try {
            let data = req.body;
            let loggedInUser = await user_services.getUserByEmail(data);
            if (loggedInUser) {
                if (bcrypt.compareSync(data.password, loggedInUser.password)) {
                    let token = jwt.sign({ user_id: loggedInUser._id }, Config.JWT_SECRET);
                    res.json({
                        result: {
                            user: loggedInUser,
                            access_token: token
                        },
                        status: true,
                        msg: "Logged in successfully"
                    })
                }
            }
        } catch (e) {
            throw next({ status: 401, msg: e });
        }
    }
    logout = (req, res, next) => {
        //
        //
    }
    getLoggedInUser = async (req, res, next) => {
        try {
            let user_id = req.auth_user._id;
            let borrowed_books = await user_book_service.getUserBookByUserId(user_id);
            res.json({
                result: {
                    user_details: req.auth_user,
                    borrowed_books: borrowed_books
                },
                status: true,
                msg: "Your Profile"
            });
        } catch (e) {
            next({ status: 400, msg: e })
        }

    }
    updateUser = async (req, res, next) => {
        try {
            let user_id = req.auth_user._id;
            let data = req.body;
            let user_obj = await user_services.updateUser(user_id, data);
            res.json({
                result: user_obj,
                status: true,
                msg: "User Updated Successfully"
            })
        } catch (e) {
            next({ status: 400, msg: e });
        }
    }
}

module.exports = AuthController;