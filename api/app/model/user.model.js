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

    preferredGenres: [{
        type: String
    }],

    image: String,

}, commonSchema.trigger);
const UserModel = mongoose.model("User", UserSchemaDef);
module.exports = UserModel;