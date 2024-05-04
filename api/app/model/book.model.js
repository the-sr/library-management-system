const mongoose = require("mongoose");
const BookSchemaDef = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    authors: [String]
});
const BookModel = mongoose.model("Book", BookSchemaDef);
module.exports = BookModel;