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
                let data = jwt.verify(token, "secret123");
                //fetch user data from DB
                //re.auth_user= DATA FROM DB

            }
        }
    } catch (e) {
        next({ status: 401, msg: e });
    }
}

module.exports = auth;