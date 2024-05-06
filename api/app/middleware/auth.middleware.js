const jwt = require("jsonwebtoken");
const Config = require("../../config/config");
const UserServices = require("../services/user.services");
const user_services = new UserServices();

const auth = (req, res, next) => {
    try {
        let token = null;
        if (req.headers['authorization']) {
            token = req.headers['authorization'];
        } else if (req.headers['x-xsrf-token']) {
            token = req.headers['x-xsrf-token'];
        } else if (req.query['token']) {
            token = req.query['token'];
        }
        if (token === null) {
            next({ status: 401, msg: "token not provided" });
        } else {
            token = token.split(' ').pop();
            if (token === null) {
                next({ status: 401, msg: "Token not provided" });
            } else {
                let data = jwt.verify(token, Config.JWT_SECRET);

                let auth_user = user_services.getUserById(data.user_id);
                if (auth_user) {
                    req.auth_user = auth_user;
                    next();
                } else {
                    next({ status: 401, msg: "Token Invalid" });
                }
            }
        }
    } catch (e) {
        next({ status: 401, msg: e });
    }
}

module.exports = auth;