const UserServices = require("../services/user.services");
const user_services = new UserServices();
class AuthController {

    registerUser = (req, res, next) => {
        try {
            let data = req.body;
            if (req.file) {
                data.image = req.file.filename;
            }
            //For multiple files:
            // if (req.files) {data.image = req.files.map((file) => file.filename);}

            user_services.validateData(data);
            //user register in DB
            //Mail to confirm
            res.json({
                result: data,
                status: true,
                msg: "register route is working"
            });
        } catch (e) {
            next({ status: 400, msg: e });
        }
    }
    login = (req, res, next) => {

    }
    profile = (req, res, next) => {

    }
}

module.exports = AuthController;