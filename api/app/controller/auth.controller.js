const bcrypt = require("bcrypt");
const UserServices = require("../services/user.services");
const user_services = new UserServices();
class AuthController {

    registerUser = (req, res, next) => {
        try {
            let data = req.body;
            if (req.file) {
                data.image = req.file.filename;
            }
            //For multiple files => if (req.files) {data.image = req.files.map((file) => file.filename);}
            user_services.validateData(data);
            data.password = bcrypt.hashSync(data.password, 10);
            user_services.createUser(data);
            //Mail to confirm
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
                    let token = jwt.sign({ user_id: loggedInUser._id }, "secret123");
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
    profile = (req, res, next) => {

    }
}

module.exports = AuthController;