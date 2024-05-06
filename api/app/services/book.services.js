const joi = require("joi");
const BookModel = require("../model/book.model");

class BookServices {

    validateData = (data) => {
        try {
            const schema = joi.object({
                isbn: joi.string().required(),
                title: joi.string().required(),
                author: joi.alternatives().try(
                    joi.string(),
                    joi.array().items(joi.string())
                ),
                edition: joi.string(),
                publisher: joi.string(),
                genre: joi.alternatives().try(
                    joi.string(),
                    joi.array().items(joi.string())
                ),
                image: joi.string(),
                bookCount: joi.number().required()
            });
            let result = schema.validate(data);
            if (result.error) {
                throw result.error.details[0].message;
            }
        } catch (e) {
            throw e;
        }
    }

    addBook = async (data) => {
        try {
            let book_obj = new BookModel(data);
            return await book_obj.save();
        } catch (e) {
            if (e.code === 11000) {
                let key = Object.keys(e.keyPattern);
                throw keys.join(", ") + "should be unique";
            } else {
                throw e;
            }
        }
    }

    getBookByTitle = async (data) => {
        try {
            let book = await BookModel.findOne({
                title: data.title
            });
            return book;
        } catch (e) {
            throw e;
        }
    }

    getBookById = async (id) => {
        try {
            let book = await BookModel.findById(id);
            return book;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = BookServices;