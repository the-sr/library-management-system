const mongoose = require("mongoose");
const commonSchema = require("./common.schema");
const UserBookSchemaDef = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },

    borrowedDate: {
        type: Date,
        required: true
    },

}, commonSchema.trigger);
const UserBookModel = mongoose.model("UserBook", UserBookSchemaDef);
module.exports = UserBookModel;