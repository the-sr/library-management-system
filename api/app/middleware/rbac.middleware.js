const isAdmin = (req, res, next) => {
    if (req.auth_user.role === 'admin') {
        next()
    } else {
        next({ status: 403, msg: "Access Denied" })
    }
}

const isLibrarian = (req, res, next) => {
    if (req.auth_user.role === 'librarian') {
        next()
    } else {
        next({ status: 403, msg: "Access Denied" })
    }
}

const isUser = (req, res, next) => {
    if (req.auth_user.role === 'user') {
        next()
    } else {
        next({ status: 403, msg: "Access Denied" })
    }
}

const isAdminLibrarian = (req, res, next) => {
    if (req.auth_user.role === 'admin' || req.auth_user.role == 'librarian') {
        next()
    } else {
        next({ status: 403, msg: "Access Denied" })
    }
}

module.exports = {
    isAdmin, isLibrarian, isUser, isAdminLibrarian
}