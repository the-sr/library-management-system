const joi = require("joi");

class BookServices {
    registerBook = (data) => {
        try {
            const schema = joi.object({
                name: joi.string().required(),
                aurthur: joi.array(),
                edition: joi.string().required(),
                publisher: joi.string().required()
            });
            let result = schema.validate();
            if (result.error) {
                throw result.error.details[0].message;
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = BookServices;