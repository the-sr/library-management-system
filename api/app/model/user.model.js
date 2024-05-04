const mongoose = require("mongoose");
const commonSchema = require("./common.schema");
const UserSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: String,
    role: {
        type: String,
        enum: ['admin', 'librarian', 'user'],
        default: "user"
    },
    status: commonSchema.status,
    image: String,
    created_by: commonSchema.created_by
}, commonSchema.trigger);
const UserModel = mongoose.model("User", UserSchemaDef);
module.exports = UserModel;