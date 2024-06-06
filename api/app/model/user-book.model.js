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
        default: Date.now
    },

    returnDate: {
        type: Date
    }

}, commonSchema.trigger);

UserBookSchemaDef.pre('save', function (next) {
    if (!this.returnDate) {
        this.returnDate = new Date(this.borrowedDate);
        this.returnDate.setMonth(this.returnDate.getMonth() + 6);
    }
    next();
});

const UserBookModel = mongoose.model("UserBook", UserBookSchemaDef);
module.exports = UserBookModel;
