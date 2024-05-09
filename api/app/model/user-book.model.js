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
        default: Date.now()
    },

    returnDate: {
        type: Date,
        default: () => {
            const returnDate = new date(this.borrowedDate);
            returnDate.setMonth(returnDate.getMonth() + 6);
            return returnDate;
        }
    }

}, commonSchema.trigger);
const UserBookModel = mongoose.model("UserBook", UserBookSchemaDef);
module.exports = UserBookModel;