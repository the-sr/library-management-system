const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserServices = require("../services/user.services");
const Config = require("../../config/config");
const user_services = new UserServices();
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
            console.log(data);
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
    getLoggedInUser = (req, res, next) => {
        //user user book service to retrive information about bowwowed book
        //and add it to the req.books
        res.json({
            result: req.auth_user,
            status: true,
            msg: "Your Profile"
        });
    }
}

module.exports = AuthController;