const joi = require("joi");

class UserServices {

    validateData = (data) => {
        try {
            const schema = joi.object({
                name: joi.string().required(),
                email: joi.string().email().required(),
                password: joi.string().min(8).max(15).required(),
                address: joi.string(),
                status: joi.string().default('inactive'),
                image: joi.string().empty()
            });
            let result = schema.validate(data);
            if (result.error) {
                throw result.error.details[0].message;
            }
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserServices;