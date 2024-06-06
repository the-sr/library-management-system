const mongoose = require("mongoose");
const commonSchema = require("./common.schema");
const BookSchemaDef = mongoose.Schema({
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String 
    },
    edition: {
        type: String
    },
    publisher: {
        type: String
    },
    genre: {
        type: String, 
    },
    image: {
        type: String,
    },
    bookCount: {
        type: Number,
        required: true,
        min: 1
    },
}, commonSchema.trigger);

const BookModel = mongoose.model("Book", BookSchemaDef);
module.exports = BookModel;
