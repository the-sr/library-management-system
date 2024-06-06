const joi = require("joi");
const BookModel = require("../model/book.model");

class BookServices {

    validateData = (data) => {
        try {
            const schema = joi.object({
                isbn: joi.string().required(),
                title: joi.string().required(),
                author: joi.string(), 
                edition: joi.string(),
                publisher: joi.string(),
                genre: joi.string().required(),
                image: joi.string(),
                bookCount: joi.number().required().min(1)
            });
            
            let result = schema.validate(data);
            console.log("Inside :",result);
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

    getAllBooks = async (data) => {
        try {
            return await BookModel.find();
        } catch (e) {
            throw e;
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

    deleteBookById = async (id) => {
        try {
            await BookModel.deleteOne({ _id: id });
        } catch (e) {
            throw e;
        }
    }

    updateBook = async (id, data) => {
        try {
            let status = await BookModel.findByIdAndUpdate(id, {
                $set: {
                    title: data.title,
                    author: data.author,
                    edition: data.edition,
                    publisher: data.publisher,
                    genre: data.genre,
                    image:data.image,
                    bookCount:data.bookCount
                }
            })
            return status;
        } catch (e) {
            throw e;
        }  
    }

    searchBooksByName = async (name) => {
        try {
            return await BookModel.find({ title: new RegExp(name, 'i') });
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = BookServices;